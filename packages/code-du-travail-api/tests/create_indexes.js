import {
  createIndex,
  documentMapping,
  DOCUMENTS,
  indexDocumentsBatched,
  suggestionMapping,
  SUGGESTIONS,
  version,
} from "@socialgouv/cdtn...infra...elasticsearch";
import { logger as cdtnLoggger } from "@socialgouv/cdtn...infra...logger";

import client from "../src/server/conf/elasticsearch";
import documents from "./cdtn_document.data.json";
import suggestions from "./suggestions_data.json";

const logger = cdtnLoggger.child({
  package: __filename,
});

const ES_INDEX_PREFIX = process.env.ES_INDEX_PREFIX || "cdtn_test";

const documentsIndexName = `${ES_INDEX_PREFIX}_${DOCUMENTS}`;
const suggestionsIndexName = `${ES_INDEX_PREFIX}_${SUGGESTIONS}`;

async function main() {
  logger.verbose("Get version");
  await version({ client });
  logger.verbose("Create index : " + documentsIndexName);
  await createIndex({
    client,
    indexName: documentsIndexName,
    mappings: documentMapping,
  });
  logger.verbose("Index documents batched " + documents.length);
  await indexDocumentsBatched({
    client,
    documents: documents,
    indexName: documentsIndexName,
  });
  logger.verbose("Create index : " + suggestionsIndexName);
  await createIndex({
    client,
    indexName: suggestionsIndexName,
    mappings: suggestionMapping,
  });
  logger.verbose("Index suggestions batched " + suggestions.length);
  await indexDocumentsBatched({
    client,
    documents: suggestions,
    indexName: suggestionsIndexName,
  });
}

main().then(console.log, (e) => {
  console.error(e);
  process.exit(1);
});
