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
  const mark = rangeMarkers.filter((a) => range.article.includes(a))[0];

  if (mark) {
    const parts = range.article.split(mark).map((a) => a.split("-"));

    // ok cases only if two elements
    if (parts.length == 2) {
      const originalStart = Array.from(parts[0]);

      // replace first parts to only keep digit
      const start = parts[0];
      start[0] = start[0].replace(/\D/g, "");
      const startLast = parseInt(start.slice(-1));

      const end = parts[1];
      end[0] = end[0].replace(/\D/g, "");
      const endLast = parseInt(end.slice(-1));

      // standard case "articles R. 2313-3-2 à R. 2313-3-10" :
      // same size
      if (
        start.length == end.length &&
        // test same first parts ?
        // next line would be great but well yunno
        // start.slice(0, -1) == end.slice(0, -1) &&
        // in JS we like it dirty
        JSON.stringify(start.slice(0, -1)) ==
        JSON.stringify(end.slice(0, -1)) &&
        // start smaller than end
        startLast < endLast
      ) {
        // console.log("HERE");
        // console.log(endLast - startLast + 1);
        const length = endLast - startLast + 1;
        range = [...Array(length).keys()].map((i) => i + startLast);

        return range.map((n) => {
          const parts = Array.from(originalStart).slice(0, -1);
          parts.push(n);
          const article = parts.join("-");
          return { article, code: range.code };
        });

        // console.log([...Array(length).keys()].map((i) => i + startLast));
      } else {
        console.log(start);
        console.log(startLast);
        console.log(end);
        console.log(endLast);
        console.log(start.slice(0, -1));
        console.log(end.slice(0, -1));
        console.log(start.slice(0, -1) == end.slice(0, -1));
        console.log("ERROR " + "\n" + JSON.stringify(range, null, 2));
      }

      // if (!lengths.every((val, i, arr) => val === arr[0])) {
    } else {
      console.log("ERROR " + "\n" + JSON.stringify(range, null, 2));
    }
  }

  return range.article.split(mark).map((a) => {
    return { article: a.trim(), code: range.code };
  });
}

function formatArticle(article) {
  return article.replace(".", "").replace(" ", "");
}

function resolveReference(ref) {
  let toResolve = [ref];
  if (rangeMarkers.map((a) => ref.article.includes(a))) {
    toResolve = unravelRange(ref);
  }

  return toResolve.map((a) => {
    // by default we try to resolve code du travail
    const codeId = a.code ? a.code.id : CODE_TRAVAIL.id;
    const code = codes[codeId];
    if (code) {
      const formattedArticle = formatArticle(a.article);
      const article = find(
        code,
        (node) => node.type === "article" && node.data.num === formattedArticle
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
  return refs.map((ref) => resolveReference(ref)).flat();
}

module.exports = { resolveReferences };
