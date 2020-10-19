import slugify from "@socialgouv/cdtn-slugify";
import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-sources";
import glossary from "@socialgouv/datafiller-data/data/glossary.json";
import { buildSitemaps } from "express-sitemap-xml";
import fs from "fs";
import { promisify } from "util";

const DOCUMENT_PATH =
  process.env.DUMP_PATH || "../../code-du-travail-data/dist/dump.data.json";
const PROD_HOSTNAME = process.env.PROD_HOSTNAME || "code.travail.gouv.fr";

const writeFile = promisify(fs.writeFile);

const glossaryPages = [getRouteBySource(SOURCES.GLOSSARY)].concat(
  glossary.map(
    ({ title }) => `${getRouteBySource(SOURCES.GLOSSARY)}/${slugify(title)}`
  )
);
const staticPages = [
  "a-propos",
  "droit-du-travail",
  "mentions-legales",
  "politique-confidentialite",
  "integration",
];
const documentPages = require(DOCUMENT_PATH)
  .filter(
    ({ slug, source }) =>
      Boolean(slug) &&
      ![SOURCES.EXTERNALS, SOURCES.CDT, SOURCES.SHEET_MT].includes(source)
  )
  .map(({ source, slug }) =>
    source === SOURCES.SHEET_MT_PAGE
      ? `${getRouteBySource(SOURCES.SHEET_MT)}/${slug}`
      : `${getRouteBySource(source)}/${slug}`
  );

const documents = staticPages.concat(glossaryPages, documentPages);

async function main(baseUrl) {
  const sitemaps = await buildSitemaps(documents, baseUrl);
  console.log(`sitemap: ${documents.length} documents`);
  for (const [filename, content] of Object.entries(sitemaps)) {
    await writeFile(`./public${filename}`, content);
  }
  console.log(`Generated ${Object.keys(sitemaps).length} sitemap file`);
}

if (require.main === module) {
  main(`https://${PROD_HOSTNAME}`);
}
