import { cdtnDocumentsGen } from "./indexing/populate";
import { logger } from "./indexing/logger";

logger.silent = true;

const json = JSON.stringify([...cdtnDocumentsGen()], 0, 2);

//eslint-disable-next-line no-console
console.log(json);
