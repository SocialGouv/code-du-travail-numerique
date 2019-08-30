const fetch = require("node-fetch");
const pLimit = require("p-limit");

const { getReference } = require("./elastic");

/*
fix datafiller urls based on ES results
*/

const DATAFILLER_URL =
  process.env.DATAFILLER_URL || "https://datafiller.num.social.gouv.fr";

const RECORDS_URL = `${DATAFILLER_URL}/kinto/v1/buckets/datasets/collections/requetes/records`;

const serial = pLimit(1);

const replaceReference = async (title, ref) => {
  const hit = await getReference(title, ref);
  if (hit) {
    const oldUrl = ref.url;
    const newUrl = ref.url.replace(/^(\/[^/]+\/)(.*)/, `$1${hit._source.slug}`);
    if (newUrl !== oldUrl) {
      console.log("FIX URL", oldUrl, newUrl);
      return {
        ...ref,
        // replace slug only
        url: newUrl
      };
    }
  }
  return ref;
};

const sortByKey = key => (a, b) => {
  if (a[key] < b[key]) {
    return 1;
  } else if (a[key] > b[key]) {
    return -1;
  }
  return 0;
};

// check refs against ES
const getReferences = row =>
  Promise.all(
    row.refs.filter(ref => ref.url).map(ref => replaceReference(row.title, ref))
  ).then(arr => arr.filter(Boolean).sort(sortByKey("relevance")));

const fixAll = async () =>
  fetch(RECORDS_URL)
    .then(res => res.json())
    .then(json => json.data)
    .then(rows =>
      Promise.all(
        rows.map(row =>
          serial(async () => ({
            ...row,
            refs: await getReferences(row)
          }))
        )
      )
    );

if (require.main === module) {
  fixAll()
    .then(data =>
      Promise.all(
        data.map(row =>
          serial(() =>
            // patch each record with fixed urls
            fetch(RECORDS_URL + `/${row.id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                data: {
                  refs: row.refs
                }
              })
            })
          )
        )
      )
    )
    .then(() => console.log("OK, finished"))
    .catch(console.log);
}
