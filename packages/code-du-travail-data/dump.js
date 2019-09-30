import { cdtnDocumentsGen } from "./indexing/populate";
import { logger } from "./indexing/logger";

logger.silent = true;

let documents = [];
for (const docs of cdtnDocumentsGen()) {
  documents = documents.concat(docs);
}
//eslint-disable-next-line no-console
console.log(JSON.stringify(documents, 0, 2));
