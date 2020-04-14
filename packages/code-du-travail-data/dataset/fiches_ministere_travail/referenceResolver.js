/*
Here we resolve the references : 
Given an article (or a range) and its code (code du travail ou securite sociale), we search for its
actual id in the legi data corpus. 
*/

const { codesFullNames, CODE_TRAVAIL } = require("./referenceExtractor");
const find = require("unist-util-find");
const visit = require("unist-util-visit");

const codes = {};
Object.values(codesFullNames).forEach(({ id }) => {
  const code = require(`@socialgouv/legi-data/data/${id}.json`);
  codes[id] = code;
});

// duplicated in reference Extractor
const rangeMarkers = ["à", "à"];

// dumb convert article.data.num as integer for comparison
// each part up to MAX_DEPTH is padded with PAD_LENGTH
const PAD_LENGTH = 5; // left pad numbers to X chars
const MAX_DEPTH = 5; // max number of L432-1-1-1

const leftPad = (num) => {
  let padded = "" + num;
  while (padded.length < PAD_LENGTH) {
    padded = "0" + padded;
  }
  return padded;
};

// transform articles into comparable integers
const asInt = (num) => {
  const parts = num
    .replace(/[^\d-]/g, "")
    .split("-")
    .map(leftPad);
  while (parts.length < MAX_DEPTH) {
    parts.push(leftPad(0));
  }
  const int = parseInt(parts.join(""));
  return int;
};

function getLegiDataRange(code, start, end) {
  // check if num is numerically after start. also check LRD prefix
  const isAfterStart = (node) =>
    asInt(node.data.num) >= asInt(start) &&
    node.data.num.charAt(0) === start.charAt(0);

  // check if num is numerically before end. also check LRD prefix
  const isBeforeEnd = (node) =>
    asInt(node.data.num) <= asInt(end) &&
    node.data.num.charAt(0) === end.charAt(0);

  const articles = [];
  visit(code, "article", (node) => {
    if (isAfterStart(node) && isBeforeEnd(node)) {
      articles.push(node);
    }
  });
  return articles;
}

function formatStartEnd(startRaw, endRaw) {
  // we need to identify special case where end ref is relative to start ref (e.g. L. 4733-9 à 11)
  // if there's nothing in common between end and start, we consider being in this special case

  const [startParts, endParts] = [startRaw, endRaw].map((a) =>
    a.split("-").map((p) => p.trim())
  );

  const letter = startParts[0].slice(0, 1);

  const startNums = Array.from(startParts);
  startNums[0] = startNums[0].replace(/\D/g, "");

  let endNums = Array.from(endParts);
  endNums[0] = endNums[0].replace(/\D/g, "");

  if (endNums.length == 1 && /^\d+$/.test(endParts[0])) {
    const endRange = endNums[0];
    endNums = Array.from(startNums.slice(0, -1));
    endNums.push(endRange);
  }

  return [letter + startNums.join("-"), letter + endNums.join("-")];
}

// in case of a range (like "L. 4733-9 à 4733-11"), we try to identify
// the articles implicitly included within the range
function unravelRange(range) {
  const mark = rangeMarkers.filter((a) => range.article.includes(a))[0];
  const rawParts = range.article.split(mark);
  const code = range.code != undefined ? codes[range.code.id] : undefined;

  if (rawParts.length == 2 && code) {
    // objective is to identify starting and ending articles (with the legi data correct format)
    // then we can do a legi-data lookup
    const [startFMT, endFMT] = formatStartEnd(rawParts[0], rawParts[1]);

    const unraveled = getLegiDataRange(code, startFMT, endFMT).map((a) => {
      return { article: a.data.num, code: range.code };
    });

    if (unraveled.length > 0) {
      return unraveled;
    }
  }

  console.log("Range error for range : " + JSON.stringify(range, null, 2));

  // default in case of error
  return range.article.split(mark).map((a) => {
    return { article: a.trim(), code: range.code };
  });
}

function deprecUnravelRange(range) {
  // TODO : deal with actual ranges (N to M)
  const mark = rangeMarkers.filter((a) => range.article.includes(a))[0];

  // if (mark) {
  const parts = range.article
    .split(mark)
    .map((a) => a.split("-").map((p) => p.trim()));

  // ok cases only if two elements
  if (parts.length == 2) {
    const originalStart = Array.from(parts[0]);
    const originalEnd = Array.from(parts[1]);

    // replace first parts to only keep digit
    const start = parts[0];
    start[0] = start[0].replace(/\D/g, "");
    const startLast = parseInt(start.slice(-1));

    const end = parts[1];
    end[0] = end[0].replace(/\D/g, "");
    const endLast = parseInt(end.slice(-1));

    // case 1 : "articles R. 2313-3-2 à R. 2313-3-10"
    const case1 =
      start.length == end.length &&
      // test same first parts ?
      // next line would be great
      // start.slice(0, -1) == end.slice(0, -1) &&
      // but instead, we got this for now
      JSON.stringify(start.slice(0, -1)) == JSON.stringify(end.slice(0, -1));

    // case 2 : "articles R. 2313-3-2 à 10" but not "articles R. 2313-3-2 à R. 2314"
    const case2 =
      start.length > 1 &&
      end.length == 1 &&
      startLast < endLast &&
      /^\d+$/.test(originalEnd);

    // case 3 : "articles R. 2313-3 à 2313-3-19"
    const case3 =
      start.length + 1 == end.length &&
      JSON.stringify(start) == JSON.stringify(end.slice(0, -1));

    // case 4 : "L. 732-10 à L. 732-12-1"
    const case4 =
      start.length + 1 == end.length &&
      JSON.stringify(start) != JSON.stringify(end.slice(0, -1));
    JSON.stringify(start).slice(0, -1) == JSON.stringify(end.slice(0, -2));

    let partedRanges = [];

    const createRange = (originalParts, size, n) =>
      [...Array(size).keys()]
        .map((i) => i + n)
        .map((n) => {
          const parts = Array.from(originalParts);
          parts.push(n);
          return parts;
        });

    if (case1 || case2) {
      const length = endLast - startLast + 1;
      partedRanges = createRange(originalStart.slice(0, -1), length, startLast);
    } else if (case3) {
      partedRanges = createRange(originalStart, endLast, 1);
      partedRanges.push(originalStart);
    } else if (case4) {
      // first order range FO
      const startFO = startLast;
      const endFO = parseInt(end.slice(-2));
      const lengthFO = endFO - startFO + 1;
      const rangesFO = createRange(
        originalStart.slice(0, -1),
        lengthFO,
        startLast
      );

      if (endFO < startFO)
        console.log(
          `ERROR, non standard case :\n ${JSON.stringify(
            range.article,
            null,
            2
          )} \n`
        );

      // second order range SO
      const startSO = originalEnd.slice(0, -1);
      const lengthSO = endLast;
      const rangesSO = createRange(startSO, lengthSO, 1);
      partedRanges = rangesFO.concat(rangesSO);
    } else {
      console.log(
        `ERROR, cannot parse case :\n ${JSON.stringify(
          range.article,
          null,
          2
        )} \n`
      );
      partedRanges = [originalStart, originalEnd];
    }

    return partedRanges.map((parts) => {
      const article = parts.join("-");
      return { article, code: range.code };
    });
  } else {
    return range.article.split(mark).map((a) => {
      return { article: a.trim(), code: range.code };
    });
  }
}

function formatArticle(article) {
  return article.replace(".", "").replace(" ", "");
}

function resolveReference(ref) {
  let toResolve = [ref];
  if (rangeMarkers.filter((a) => ref.article.includes(a)).length != 0) {
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
  const resolvedRefs = refs.map((ref) => resolveReference(ref)).flat();

  const deduplicated = resolvedRefs.reduce((acc, art) => {
    // drop duplicated references
    const existing = acc
      .map((a) => [a.article, a.fmt])
      .flat()
      .filter((v) => v);

    if (!(existing.includes(art.fmt) || existing.includes(art.article))) {
      acc.push(art);
    }
    return acc;
  }, []);

  // group by code
  const grouped = deduplicated.reduce((acc, art) => {
    const { code, ...rawArticle } = art;
    const parsedCode = code ? code : { id: "CODE_UNKNOWN" };

    if (!Object.keys(acc).includes(parsedCode.id)) {
      acc[parsedCode.id] = { name: parsedCode.name, articles: [] };
    }

    acc[parsedCode.id].articles.push(rawArticle);

    return acc;
  }, {});
  return grouped;
}

module.exports = { resolveReferences };
