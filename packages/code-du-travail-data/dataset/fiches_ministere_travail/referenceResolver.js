const { codesFullNames } = require("./referenceExtractor");

const codesArticles = {};
Object.values(codesFullNames).forEach(({ id }) => {
  const articles = require(`./articles/${id}.json`);
  codesArticles[id] = articles;
});

// duplicated in reference Extractor / ln.71
const rangeMarkers = ["à", "à"];

function unravelRange(range) {
  const mark = rangeMarkers.filter(a => range.article.includes(a))[0];
  return range.article.split(mark).map(a => {
    return { article: a.trim(), code: range.code };
  });
}

function formatArticle(article) {
  return article.replace(".", "").replace(" ", "");
}

function resolveReference(ref) {
  let toResolve = [ref];
  if (rangeMarkers.map(a => ref.article.includes(a))) {
    toResolve = unravelRange(ref);
  }

  return toResolve.map(a => {
    if (a.code) {
      const articles = codesArticles[a.code.id];
      if (articles) {
        const formattedArticle = formatArticle(a.article);
        const articleId = articles[formattedArticle];
        if (articleId) {
          a.id = articleId;
          a.fmt = formattedArticle;
          a.url = `https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=${articleId}&cidTexte=${a.code.id}`;
        }
      }
    }
    return a;
  });
}

function resolveReferences(refs) {
  return refs.map(ref => resolveReference(ref)).flat();
}

module.exports = { resolveReferences };
