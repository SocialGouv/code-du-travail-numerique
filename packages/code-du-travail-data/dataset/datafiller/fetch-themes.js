const fetch = require("node-fetch");
const slugify = require("../../slugify");
const { SOURCES, getRouteBySource } = require("@cdt/sources");
const { sortByKey, getVariants, sortRowRefsByPosition } = require("./utils");

/*
 fetch raw datafiller themes data, filter and sort properly
*/

const DATAFILLER_URL =
  process.env.DATAFILLER_URL || "https://datafiller.num.social.gouv.fr";

const RECORDS_URL = `${DATAFILLER_URL}/kinto/v1/buckets/datasets/collections/themes/records?_sort=title`;

/*

 {
  "icon": "Depart",
  "refs": [{
      "url":"/fiche-service-public/demission-licenciement-peut-on-travailler-ailleurs-avant-la-fin-du-preavis",
      "title":"D\u00e9mission, licenciement : peut-on travailler ailleurs avant la fin du pr\u00e9avis ?"
    },
    {
      "url":"/contributions/arret-maladie-pendant-le-preavis-quelles-consequences",
      "title":"Arr\u00eat maladie pendant le pr\u00e9avis\u00a0:\u00a0quelles cons\u00e9quences\u00a0?"
    }
  ],
  "title": "D\u00e9part de l'entreprise",
  "parent": null,
  "position": 8,
  "id": "a91437fb-e493-4e18-8f7d-7ffe8d16ff1f",
  "last_modified": 1576665139553
 }

*/

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
    parent = node && node.parent;
  }
  return parts.map(({ title, slug }) => ({
    label: title,
    slug: `/${getRouteBySource(SOURCES.THEMES)}/${slug}`
  }));
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

  const sortedRows = records
    .map(sortRowRefsByPosition)
    .filter(({ title }) => title.length > 0);

  const treeRows = sortedRows.map(row => {
    const breadcrumbs = row.parent && getParents(sortedRows, row);
    const children = getChildren(sortedRows, row);
    return {
      breadcrumbs,
      children,
      icon: row.icon,
      position: row.position,
      refs: row.refs.map(({ url, title }) => ({ url, title })),
      slug: getSlug(row),
      source: SOURCES.THEMES,
      title: row.title,
      variants: getVariants(row)
    };
  });

  return treeRows;
};

module.exports = fetchAll;

if (require.main === module) {
  fetchAll()
    .then(data => console.log(JSON.stringify(data, null, 2)))
    .catch(console.error);
}
