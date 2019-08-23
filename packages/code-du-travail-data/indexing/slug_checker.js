import { cdtnDocumentsGen, getDuplicateSlugs } from "./populate";
import { logger } from "./logger";

const documents = cdtnDocumentsGen();
const duplicateSlugs = getDuplicateSlugs(documents);

if (duplicateSlugs.length > 0) {
  logger.error("Document with same slugs detected !");
  logger.error("slug | count");
  logger.error("-----|----");
  Object.entries(duplicateSlugs).forEach(([slug, count]) =>
    logger.error(`${slug} | ${count}`)
  );
  process.exit(1);
}
