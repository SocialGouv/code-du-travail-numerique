const fetch = require("node-fetch");

/*
 fetch raw datafiller data, filter and sort properly
*/

const DATAFILLER_URL =
  "https://datafiller.num.social.gouv.fr/kinto/v1/buckets/datasets/collections/requetes/records";

// for 2nd sort order after relevance
// higher is better
const sourcesPriority = [
  "faq",
  "fiche-service-public",
  "fiche-ministere-travail",
  "code-du-travail",
  "external"
];

const getSource = url => {
  const source = url.match(/^\/([^/]+)\//);
  return (source && source[1]) || "external";
};

// sort datafiller references by relevance and source
const sortRefs = (a, b) => {
  // 1st sort by relevance
  if (a.relevance < b.relevance) {
    return 1;
  } else if (a.relevance > b.relevance) {
    return -1;
  }
  // 2nd sort by sourcesPriority
  if (
    sourcesPriority.indexOf(getSource(a.url)) <
    sourcesPriority.indexOf(getSource(b.url))
  ) {
    return -1;
  } else if (
    sourcesPriority.indexOf(getSource(a.url)) >
    sourcesPriority.indexOf(getSource(b.url))
  ) {
    return 1;
  }
  return 0;
};

const hasUrl = row => !!row.url;

const getVariants = row => {
  const others =
    (row.variants && row.variants.split("\n").map(variant => variant.trim())) ||
    [];
  const variants = [row.title.replace("-", " ")].concat(others);
  return [...new Set(variants)];
};

const sortByKey = key => (a, b) => {
  if (a[key] < b[key]) {
    return -1;
  } else if (a[key] > b[key]) {
    return 1;
  }
  return 0;
};

// import only valid data from datafiller
// == has more than one ref
const fetchAll = () =>
  fetch(DATAFILLER_URL + "?_sort=title")
    .then(res => res.json())
    .then(json => json.data)
    .then(data => data.filter(item => item.refs && item.refs.length > 1))
    .then(rows =>
      rows
        .map(row => ({
          ...row,
          refs: row.refs.filter(hasUrl).sort(sortRefs),
          variants: getVariants(row)
        }))
        .sort(sortByKey("title"))
    );

module.exports = fetchAll;

if (require.main === module) {
  fetchAll()
    .then(data => console.log(JSON.stringify(data, null, 2)))
    .catch(console.log);
}
