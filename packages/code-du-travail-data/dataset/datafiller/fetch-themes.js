const fetch = require("node-fetch");
const slugify = require("../../slugify");

const { sortByKey, getVariants } = require("./utils");

/*
 fetch raw datafiller themes data, filter and sort properly
*/

const DATAFILLER_URL =
  process.env.DATAFILLER_URL || "https://datafiller.num.social.gouv.fr";

const RECORDS_URL = `${DATAFILLER_URL}/kinto/v1/buckets/datasets/collections/themes/records?_limit=1000`;

const hasUrl = row => !!row.url;

const getSlug = row => `${row.position || 1}-${slugify(row.title)}`;

// for breadcrumbs
const getParents = (rows, row) => {
  let parent = row.parent;
  const parts = [];
  while (parent) {
    const node = rows.find(r => r.id === parent);
    if (node) {
      parts.unshift({ ...node, slug: getSlug(node) });
    }
    parent = node.parent;
  }
  return parts;
};

const getChildren = (rows, row) =>
  rows
    .filter(node => node.parent === row.id)
    .map(node => ({ title: node.title, slug: getSlug(node) }));

// import only valid data from datafiller
// == has more than one ref
const fetchAll = () =>
  fetch(RECORDS_URL, { params: { _limit: 1000 } })
    .then(res => res.json())
    .then(json => json.data)
    .then(rows =>
      rows
        .map(row => ({
          ...row,
          refs: (row.refs && row.refs.filter(hasUrl)) || [],
          variants: getVariants(row)
        }))
        .map(row => {
          const parents = row.parent && getParents(rows, row);
          const children = getChildren(rows, row).sort(sortByKey("position"));
          return {
            slug: getSlug(row),
            parents,
            children,
            refs: row.refs,
            position: row.position,
            title: row.title,
            subTitle: row.subTitle,
            intro: row.intro
          };
        })
    );

module.exports = fetchAll;

if (require.main === module) {
  fetchAll()
    .then(data => console.log(JSON.stringify(data, null, 2)))
    .catch(console.log);
}
