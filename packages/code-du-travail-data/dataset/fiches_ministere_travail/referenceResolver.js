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

const CODE_UNKNOWN = { id: "UNDEFINED" };
// shall we use "code du travail" by default ?
const DEFAULT_CODE = CODE_TRAVAIL;

// dumb convert article.data.num as integer for comparison
// each part up to MAX_DEPTH is padded with PAD_LENGTH
const PAD_LENGTH = 5; // left pad numbers to X chars
const MAX_DEPTH = 5; // max number of L432-1-1-1
// padding numbers : 2 -> "0002"
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
    a
      .replace(/\u2011/g, "-")
      .replace()
      .split("-")
      .map((p) => p.trim())
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
  const mark = rangeMarkers.filter((a) => range.text.includes(a))[0];
  const rawParts = range.text.split(mark);

  const chosenCode = range.code ? range.code : DEFAULT_CODE;

  if (rawParts.length == 2 && chosenCode != CODE_UNKNOWN) {
    // objective is to identify starting and ending articles (with the legi data correct format)
    // then we can do a legi-data lookup
    const [startFMT, endFMT] = formatStartEnd(rawParts[0], rawParts[1]);

    const unraveled = getLegiDataRange(
      codes[chosenCode.id],
      startFMT,
      endFMT
    ).map((a) => {
      return { fmt: a.data.num, code: chosenCode };
    });

    if (unraveled.length > 0) {
      return unraveled;
    }
  }

  // default in case of error, note that we explicitly set code to unknown
  // in order to identify range errors
  return range.text.split(mark).map((a) => {
    return { text: a.trim(), code: CODE_UNKNOWN };
  });
}

function formatArticle(article) {
  // remove dot and spaces + remove non digit trailing chars + replace unicode dash ‑ to standard -
  return article
    .replace(".", "")
    .replace(" ", "")
    .replace(/\D*$/, "")
    .replace(/\u2011/g, "-");
}

function resolveReference(ref) {
  let toResolve = [ref];
  if (rangeMarkers.filter((a) => ref.text.includes(a)).length != 0) {
    toResolve = unravelRange(ref);
  }

  return toResolve.map((a) => {
    // use default code if no defined
    const code =
      (a.code == CODE_UNKNOWN) | (a.code == undefined) ? DEFAULT_CODE : a.code;

    if (!a.fmt) a.fmt = formatArticle(a.text);

    if (code && code != CODE_UNKNOWN) {
      const article = find(
        codes[code.id],
        (node) => node.type === "article" && node.data.num === a.fmt
      );
      if (article) {
        a.id = article.data.id;
        a.code = code;
      } else {
        // not found in code
        a.code = CODE_UNKNOWN;
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
      .map((a) => [a.text, a.fmt])
      .flat()
      .filter((v) => v);

    if (!(existing.includes(art.fmt) || existing.includes(art.text))) {
      acc.push(art);
    }
    return acc;
  }, []);

  // group by code
  const grouped = deduplicated.reduce((acc, art) => {
    const { code, ...rawArticle } = art;
    const parsedCode = code ? code : CODE_UNKNOWN;

    if (!Object.keys(acc).includes(parsedCode.id)) {
      acc[parsedCode.id] = { name: parsedCode.name, articles: [] };
    }

    acc[parsedCode.id].articles.push(rawArticle);

    return acc;
  }, {});
  return grouped;
}

module.exports = { resolveReferences };
