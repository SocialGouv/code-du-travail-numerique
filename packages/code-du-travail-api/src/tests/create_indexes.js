import {
  createIndex,
  documentMapping,
  DOCUMENTS,
  indexDocumentsBatched,
  suggestionMapping,
  SUGGESTIONS,
  version,
} from "@socialgouv/cdtn-elasticsearch";

import client from "../conf/elasticsearch";
import { CDTN_ADMIN_VERSION } from "../routes/v1.prefix";
import documents from "./cdtn_document.data.json";
import suggestions from "./suggestions_data.json";

const ES_INDEX_PREFIX = process.env.ES_INDEX_PREFIX || "cdtn_test";
const documentsIndexName = `${ES_INDEX_PREFIX}-${CDTN_ADMIN_VERSION}_${DOCUMENTS}`;
const suggestionsIndexName = `${ES_INDEX_PREFIX}-${CDTN_ADMIN_VERSION}_${SUGGESTIONS}`;

async function main() {
  await version({ client });
  await createIndex({
    client,
    indexName: documentsIndexName,
    mappings: documentMapping,
  });
  await indexDocumentsBatched({
    client,
    documents: documents,
    indexName: documentsIndexName,
  });

  await createIndex({
    client,
    indexName: suggestionsIndexName,
    mappings: suggestionMapping,
  });
  await indexDocumentsBatched({
    client,
    documents: suggestions,
    indexName: suggestionsIndexName,
  });
}

main();
