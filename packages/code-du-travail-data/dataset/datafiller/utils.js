const { SOURCES } = require("@cdt/sources");

const numCompare = (a, b) => {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
};

const sortByKey = key => (a, b) =>
  typeof a[key] === "number"
    ? numCompare(a[key], b[key])
    : `${a[key]}`.localeCompare(`${b[key]}`);

const getVariants = row => {
  const others =
    (row.variants && row.variants.split("\n").map(variant => variant.trim())) ||
    [];
  const variants = [row.title && row.title.replace("-", " ").trim()]
    .concat(others)
    .filter(Boolean);
  return [...new Set(variants)];
};

const entities = {
  amp: "&",
  apos: "'",
  "#x27": "'",
  "#x2F": "/",
  "#39": "'",
  "#47": "/",
  lt: "<",
  gt: ">",
  nbsp: " ",
  quot: '"'
};

const decodeHTML = text =>
  text.replace(/&([^;]+);/gm, (match, entity) => entities[entity] || match);

const sourcesPriority = [
  SOURCES.FAQ,
  SOURCES.SHEET_SP,
  SOURCES.SHEET_MT,
  SOURCES.EXTERNAL,
  SOURCES.CDT
];

const getSource = url => {
  const source = url.match(/^\/([^/]+)\//);
  return (source && source[1]) || "external";
};

// sort datafiller references by key and source
const sortRefs = cb => (a, b) => {
  if (cb(a) === cb(b)) {
    return (
      sourcesPriority.indexOf(getSource(a.url)) -
      sourcesPriority.indexOf(getSource(b.url))
    );
  }
  return cb(a) - cb(b);
};

const hasUrl = row => !!row.url;

// filter and sort row refs
const sortRowRefs = cb => row => ({
  ...row,
  refs: (row.refs && row.refs.filter(hasUrl).sort(sortRefs(cb))) || []
});

const sortRowRefsByPosition = sortRowRefs(node => node.position);
const sortRowRefsByRelevance = sortRowRefs(node => -node.relevance);

const slimify = (obj, keys) =>
  keys.reduce((a, k) => ({ ...a, [k]: obj[k] }), {});

module.exports = {
  sortByKey,
  getVariants,
  sortRefs,
  sortRowRefs,
  sortRowRefsByPosition,
  sortRowRefsByRelevance,
  slimify,
  decodeHTML
};
