const fetch = require("node-fetch");
const slugify = require("@cdt/data/slugify");
const remark = require("remark");
const html = require("remark-html");

const DATAFILLER_URL =
  process.env.DATAFILLER_URL || "https://datafiller.num.social.gouv.fr";

const RECORDS_URL = `${DATAFILLER_URL}/kinto/v1/buckets/datasets/collections/glossaire/records`;
const compiler = remark().use(html, { sanitize: true });
async function getGlossaire() {
  const response = await fetch(RECORDS_URL);
  const items = await response.json();
  return items.data
    .map(({ title, abbrs, variants, definition, refs }) => ({
      title,
      slug: slugify(title),
      abbrs: [...new Set(abbrs.split("\n").filter(Boolean))],
      variants: [...new Set(variants.split("\n").filter(Boolean))],
      definition: compiler.processSync(definition).contents.replace(/\n/g, ""),
      refs
    }))
    .sort(({ title: titleA }, { title: titleB }) =>
      titleA.localeCompare(titleB)
    );
}

module.exports = getGlossaire;

async function main() {
  try {
    const glossaire = await getGlossaire();
    console.log(JSON.stringify(glossaire, 0, 2));
    console.error(`${glossaire.length} termes extraits`);
  } catch (err) {
    console.error(err);
  }
}

if (module === require.main) {
  main();
}
