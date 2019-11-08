const fetch = require("node-fetch");
const slugify = require("../../slugify");
const { SOURCES } = require("@cdt/sources");
const {
  sortByKey,
  getVariants,
  sortRowRefsByPosition,
  slimify
} = require("./utils");

/*
 fetch raw datafiller themes data, filter and sort properly
*/

const DATAFILLER_URL =
  process.env.DATAFILLER_URL || "https://datafiller.num.social.gouv.fr";

const RECORDS_URL = `${DATAFILLER_URL}/kinto/v1/buckets/datasets/collections/themes/records?_sort=title`;

/*

 {
  id: "fzef-zefzef-zefzef-zefzef",
  title: "some title",
  variants: "variant 1\nvariant 2\nvariant 3",
  parent: "nbz-zefzef-yukyuk-qcqc",
  refs:[{
    url: "/fiche-service-public/titre-de-la-fiche,
    position: 1
  },{
    url: "/fiche-service-public/titre-de-la-fiche-2,
    position: 2
  }]
 }

*/

const getSlug = row => `${row.position || 1}-${slugify(row.title)}`;

const slimifyTheme = obj => slimify(obj, ["title", "slug"]);

// for breadcrumbs
const getParents = (rows, row) => {
  let parent = row.parent;
  const parts = [];
  while (parent) {
    const node = rows.find(r => r.id === parent);
    if (node) {
      parts.unshift({ ...node, slug: getSlug(node) });
    }
    parent = node && node.parent;
  }
  return parts.map(slimifyTheme);
};

const getChildren = (rows, row) =>
  rows
    .filter(node => node.parent === row.id)
    .sort(sortByKey("position"))
    .map(node => ({ title: node.title, slug: getSlug(node) }));

// import only valid data from datafiller
// == has more than one ref
const fetchAll = async () => {
  const records = await fetch(RECORDS_URL, { params: { _limit: 1000 } })
    .then(res => res.json())
    .then(json => json.data);

  const sortedRows = records.map(sortRowRefsByPosition);

  const treeRows = sortedRows.map(row => {
    const breadcrumbs = row.parent && getParents(sortedRows, row);
    const children = getChildren(sortedRows, row);
    return {
      ...row,
      source: SOURCES.THEMES,
      slug: getSlug(row),
      breadcrumbs,
      children,
      variants: getVariants(row)
    };
  });

  return treeRows;
};

module.exports = fetchAll;

if (require.main === module) {
  fetchAll()
    .then(data => console.log(JSON.stringify(data, null, 2)))
    .catch(console.log);
}
