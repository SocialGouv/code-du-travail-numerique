import fs from "fs";
import { promisify } from "util";
import { buildSitemaps } from "express-sitemap-xml";

const writeFile = promisify(fs.writeFile);

const DOCUMENT_PATH = process.env.DUMP_PATH || "../data/dump.data.json";
const PROD_HOSTNAME = process.env.PROD_HOSTNAME || "code.travail.gouv.fr";

const documents = require(DOCUMENT_PATH);

async function main(baseUrl) {
  const sitemaps = await buildSitemaps(
    documents.map(({ source, slug }) => `${source}/${slug}`),
    baseUrl
  );
  console.log(`sitemap: ${documents.length} documents`);
  for (const [filename, content] of Object.entries(sitemaps)) {
    await writeFile(`./public${filename}`, content);
  }
  console.log(`Generated ${Object.keys(sitemaps).length} sitemap file`);
}

if (require.main === module) {
  main(`https://${PROD_HOSTNAME}`);
}
