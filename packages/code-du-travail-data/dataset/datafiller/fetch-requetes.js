const fetch = require("node-fetch");
const pLimit = require("p-limit");

const elastic = require("./elastic");

const { sortByKey, getVariants } = require("./utils");

const limit = pLimit(5);

/*
 fetch raw datafiller requetes data, filter and sort properly
*/

const DATAFILLER_URL =
  process.env.DATAFILLER_URL || "https://datafiller.num.social.gouv.fr";

const RECORDS_URL = `${DATAFILLER_URL}/kinto/v1/buckets/datasets/collections/requetes/records`;

// convert datafiller references to valid ES references
const toEsResults = results =>
  Promise.all(
    results.map(result =>
      limit(async () => ({
        ...result,
        refs: await elastic.getReferences(result)
      }))
    )
  );

// for 2nd sort order after relevance
// higher is better
const sourcesPriority = [
  "faq",
  "fiche-service-public",
  "fiche-ministere-travail",
  "external",
  "code-du-travail"
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

// import only valid data from datafiller
// == has more than one ref
const fetchAll = () =>
  fetch(RECORDS_URL)
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
    .then(toEsResults)
    .then(data => console.log(JSON.stringify(data, null, 2)))
    .catch(console.log);
}
