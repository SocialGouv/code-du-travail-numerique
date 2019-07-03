const fetch = require("node-fetch");
const pLimit = require("p-limit");

const { getReference } = require("./elastic");

/*
fix datafiller urls based on ES results
*/

const DATAFILLER_URL =
  "https://datafiller.num.social.gouv.fr/kinto/v1/buckets/datasets/collections/requetes/records";

const serial = pLimit(1);

const replaceReference = async (title, ref) => {
  const hit = await getReference(title, ref);
  if (hit) {
    return {
      ...ref,
      // replace slug only
      url: ref.url.replace(/^(\/[^/]+\/)(.*)/, `$1${hit._source.slug}`)
    };
  }
  return ref;
};

// check refs against ES
const getReferences = row =>
  Promise.all(
    row.refs.filter(ref => ref.url).map(ref => replaceReference(row.title, ref))
  ).then(arr => arr.filter(Boolean));

const fixAll = async () =>
  fetch(DATAFILLER_URL)
    .then(res => res.json())
    .then(json => json.data)
    // DEBUG
    // .then(rows =>
    //   rows.filter(row => row.title === "rupture-assistance-maternelle")
    // )
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
// DEBUG
//.then(rows => console.log(JSON.stringify(rows, null, 2)) || rows);

if (require.main === module) {
  fixAll()
    .then(data =>
      Promise.all(
        data.map(row =>
          serial(() =>
            // patch each record with fixed urls
            fetch(DATAFILLER_URL + `/${row.id}`, {
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
    .then(console.log)
    .catch(console.log);
}
