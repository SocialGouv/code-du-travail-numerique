import { cdtnDocumentsGen } from "./indexing/populate";
import { logger } from "./indexing/logger";

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
console.log(JSON.stringify(slugs, 0, 2));
