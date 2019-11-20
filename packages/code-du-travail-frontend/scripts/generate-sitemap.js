import fs from "fs";
import { promisify } from "util";
import { buildSitemaps } from "express-sitemap-xml";
import glossary from "@cdt/data...datafiller/glossary.data.json";
import { getRouteBySource } from "@cdt/sources";

const DOCUMENT_PATH = process.env.DUMP_PATH || "../data/dump.data.json";
const PROD_HOSTNAME = process.env.PROD_HOSTNAME || "code.travail.gouv.fr";

const writeFile = promisify(fs.writeFile);

const glossaryPages = glossary.map(({ slug }) => `glossaire/${slug}`);
const staticPages = ["a-propos", "droit-du-travail", "mentions-legales"];
const documentPages = require(DOCUMENT_PATH).map(
  ({ source, slug }) => `${getRouteBySource(source)}/${slug}`
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
