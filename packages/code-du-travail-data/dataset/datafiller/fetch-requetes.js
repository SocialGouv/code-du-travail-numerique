const fetch = require("node-fetch");
const pLimit = require("p-limit");

const elastic = require("./elastic");

const { sortByKey, getVariants, sortRowRefs } = require("./utils");

const limit = pLimit(5);

/*
 fetch raw datafiller requetes data, filter and sort properly
*/

const DATAFILLER_URL =
  process.env.DATAFILLER_URL || "https://datafiller.num.social.gouv.fr";

const RECORDS_URL = `${DATAFILLER_URL}/kinto/v1/buckets/datasets/collections/requetes/records`;
/*

 {
  id: "fzef-zefzef-zefzef-zefzef",
  title: "some title",
  variants: "variant 1\nvariant 2\nvariant 3",
  refs:[{
    url: "/fiche-service-public/titre-de-la-fiche,
    relevance: 5
  },{
    url: "/fiche-service-public/titre-de-la-fiche-2,
    relevance: 2
  }]
 }

*/

// import only valid data from datafiller
// == has more than one ref
const fetchAll = async () => {
  const requetes = await fetch(RECORDS_URL)
    .then(res => res.json())
    .then(json => json.data);

  const rowsWithRefs = requetes.filter(
    item => item.refs && item.refs.length > 1
  );
  const sortedRows = rowsWithRefs.map(sortRowRefs).sort(sortByKey("title"));

  const rowsWithEsResults = await Promise.all(
    sortedRows.map(result =>
      limit(async () => ({
        ...result,
        refs: await elastic.getReferences(result),
        variants: getVariants(result)
      }))
    )
  );

  return rowsWithEsResults;
};

module.exports = fetchAll;

if (require.main === module) {
  fetchAll()
    .then(data => console.log(JSON.stringify(data, null, 2)))
    .catch(console.log);
}
