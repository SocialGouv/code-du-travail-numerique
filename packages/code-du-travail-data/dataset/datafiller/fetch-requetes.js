const fetch = require("node-fetch");

const { sortRowRefsByRelevance, getVariants, decodeHTML } = require("./utils");

/*
 fetch raw datafiller requetes data, filter and sort properly
*/

const DATAFILLER_URL =
  process.env.DATAFILLER_URL || "https://datafiller.num.social.gouv.fr";

const RECORDS_URL = `${DATAFILLER_URL}/kinto/v1/buckets/datasets/collections/requetes/records?_sort=title`;
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

// fetch title from remote url
const getPageTitle = async url => {
  try {
    const text = await fetch(url).then(r => r.text());
    const matches = text.match(/<title>([^<]+)<\/title>/i);
    if (matches) {
      return decodeHTML(matches[1]);
    }
  } catch (e) {
    //console.log(e);
  }
  return url;
};

const getTitle = item => {
  if (item.title) {
    return item.title;
  }
  if (item.url && item.url.match(/^https?:\/\//)) {
    return getPageTitle(item.url);
  }
  return item.url;
};

const fixRefsTitles = refs =>
  Promise.all(refs.map(async ref => ({ ...ref, title: await getTitle(ref) })));

// import only valid data from datafiller
// == has more than one ref
const fetchAll = async () => {
  const requetes = await fetch(RECORDS_URL)
    .then(res => res.json())
    .then(json => json.data);

  const rows = await Promise.all(
    requetes
      .filter(item => item.refs && item.refs.length > 1)
      // add title for external links
      .map(async item => ({
        ...item,
        refs: await fixRefsTitles(item.refs),
        variants: getVariants(item)
      }))
  );

  const sortedRows = await rows.map(sortRowRefsByRelevance);

  return sortedRows;
};

module.exports = fetchAll;

if (require.main === module) {
  fetchAll()
    .then(data => console.log(JSON.stringify(data, null, 2)))
    .catch(console.log);
}
