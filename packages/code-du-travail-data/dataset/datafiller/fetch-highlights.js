const fetch = require("node-fetch");

const { sortRowRefsByPosition } = require("./utils");

/*
 fetch raw datafiller highlight data and sort properly
*/

const DATAFILLER_URL =
  process.env.DATAFILLER_URL || "https://datafiller.num.social.gouv.fr";

const HIGHLIGHTS_URL = `${DATAFILLER_URL}/kinto/v1/buckets/datasets/collections/highlights/records`;

// import only valid data from datafiller
// == has more than one ref
const fetchAll = async () => {
  const highlights = await fetch(HIGHLIGHTS_URL)
    .then(res => res.json())
    .then(json => json.data);

  const sortedHighlights = await highlights.map(sortRowRefsByPosition);

  return sortedHighlights;
};

module.exports = fetchAll;

if (require.main === module) {
  fetchAll()
    .then(data => console.log(JSON.stringify(data, null, 2)))
    .catch(console.log);
}
