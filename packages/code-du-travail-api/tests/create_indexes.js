import client from "../src/server/conf/elasticsearch";
import {
  version,
  createIndex,
  indexDocumentsBatched,
} from "@cdt/data/indexing/es_client.utils";

import { DOCUMENTS, SUGGESTIONS } from "@cdt/data/indexing/esIndexName";

import { documentMapping } from "@cdt/data/indexing/document.mapping";
import documents from "./cdtn_document.data.json";
import { suggestionMapping } from "@cdt/data/indexing/suggestion.mapping";
import suggestions from "./suggestions_data.json";

const ES_INDEX_PREFIX = process.env.ES_INDEX_PREFIX || "cdtn_test";

const documentsIndexName = `${ES_INDEX_PREFIX}_${DOCUMENTS}`;
const suggestionsIndexName = `${ES_INDEX_PREFIX}_${SUGGESTIONS}`;

async function main() {
  await version({ client });
  await createIndex({
    client,
    indexName: documentsIndexName,
    mappings: documentMapping,
  });
  await indexDocumentsBatched({
    client,
    indexName: documentsIndexName,
    documents: documents,
  });

  await createIndex({
    client,
    indexName: suggestionsIndexName,
    mappings: suggestionMapping,
  });
  await indexDocumentsBatched({
    client,
    indexName: suggestionsIndexName,
    documents: suggestions,
  });
}

main();
