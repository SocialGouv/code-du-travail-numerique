import fs from "fs";
import { promisify } from "util";

const writeFile = promisify(fs.writeFile);

const IS_PRODUCTION_DEPLOYMENT =
  process.env.IS_PRODUCTION_DEPLOYMENT === "true";
const PROD_HOSTNAME = process.env.PROD_HOSTNAME || "code.travail.gouv.fr";

const robotsDev = [
  "User-agent: *",
  "Disallow: /",
  "Disallow: /code-du-travail/",
].join("\n");
const robotsProd = [
  "User-agent: *",
  "Disallow: /assets/",
  "Disallow: /images/",
  "Disallow: /code-du-travail/",
  "",
  `Sitemap: https://${PROD_HOSTNAME}/sitemap.xml`,
].join("\n");

async function main() {
  const content = IS_PRODUCTION_DEPLOYMENT ? robotsProd : robotsDev;
  await writeFile(`./public/robots.txt`, content);
  console.log(`Generated robots.txt file`);
}

if (require.main === module) {
  main();
}
