/*
Here we resolve the references : 
Given an article and its code (code du travail ou securite sociale), we search for its
actual id in the legi data corpus. 
*/

const { codesFullNames, CODE_TRAVAIL } = require("./referenceExtractor");
const find = require("unist-util-find");

const codes = {};
Object.values(codesFullNames).forEach(({ id }) => {
  const code = require(`@socialgouv/legi-data/data/${id}.json`);
  codes[id] = code;
});

// duplicated in reference Extractor
const rangeMarkers = ["à", "à"];

function unravelRange(range) {
  // TODO : deal with actual ranges (N to M)
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
    // by default we try to resolve code du travail
    const codeId = a.code ? a.code.id : CODE_TRAVAIL.id;
    const code = codes[codeId];
    if (code) {
      const formattedArticle = formatArticle(a.article);
      const article = find(
        code,
        node => node.type === "article" && node.data.num === formattedArticle
      );
      if (article) {
        a.id = article.data.id;
        a.fmt = formattedArticle;
        // case we guessed code du travail and found article
        if (!a.code) {
          a.code = CODE_TRAVAIL;
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
