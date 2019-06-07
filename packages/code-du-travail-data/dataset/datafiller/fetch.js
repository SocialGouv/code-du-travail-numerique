const fetch = require("node-fetch");

/*
 fetch raw datafiller data, filter and sort properly
*/

const DATAFILLER_URL =
  "https://datafiller.num.social.gouv.fr/kinto/v1/buckets/datasets/collections/requetes/records";

// for 2nd sort order after relevance
const sourcesPriority = [
  "faq",
  "fiche-service-public",
  "fiche-ministere-travail",
  "code-du-travail"
];

const getSource = url => {
  const source = url.match(/^\/([^/]+)\//);
  return (source && source[1]) || "external";
};

// sort datafiller references by relevance and source
const sortRefs = (a, b) => {
  if (a.relevance < b.relevance) {
    return -1;
  } else if (a.relevance > b.relevance) {
    return 1;
  } else {
    if (
      sourcesPriority.indexOf(getSource(a.url)) <
      sourcesPriority.indexOf(getSource(b.url))
    ) {
      return 1;
    } else if (
      sourcesPriority.indexOf(getSource(a.url)) >
      sourcesPriority.indexOf(getSource(b.url))
    ) {
      return -1;
    }
  }
  return 0;
};

// import only valid data from datafiller
// == has more than one ref
const fetchAll = () =>
  fetch(DATAFILLER_URL)
    .then(res => res.json())
    .then(res => res.data)
    .then(res => res.filter(item => item.refs && item.refs.length > 1))
    .then(res =>
      res
        // .filter(r => r.refs && r.refs.filter(a => !!a.url).length)
        .map(r => ({
          ...r,
          refs: r.refs
            .filter(ref => !!ref.url)
            .sort(sortRefs)
            .reverse(),
          variants: [r.title].concat(
            (r.variants && r.variants.split("\n")) || []
          )
        }))
    );
//  .then(sortRowsRefs);

module.exports = fetchAll;

if (require.main === module) {
  fetchAll()
    .then(data => console.log(JSON.stringify(data, null, 2)))
    .catch(console.log);
}
