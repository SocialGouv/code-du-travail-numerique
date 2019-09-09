import { cdtnDocumentsGen } from "./indexing/populate";
import { logger } from "./indexing/logger";

const fs = require("fs");
//
logger.silent = true;

let slugs = [];

for (const documents of cdtnDocumentsGen()) {
  slugs = slugs.concat(
    documents.map(({ source, slug, title, text }) => ({
      title,
      text,
      slug: `${source}/${slug}`
    }))
  );
}
//eslint-disable-next-line no-console
const json = JSON.stringify(slugs, 0, 2);

fs.writeFile("dump.json", json, "utf8", function(err) {
  if (err) throw err;
  console.log("Dump created..");
});
