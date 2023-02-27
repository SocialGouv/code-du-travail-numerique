import {
  createIndex,
  documentMapping,
  indexDocumentsBatched,
  suggestionMapping,
  version,
} from "@socialgouv/cdtn-elasticsearch";
import {
  elasticDocumentsIndex,
  elasticsearchClient,
  elasticSuggestionsIndex,
} from "../src/api/utils";

import documents from "./data/documents_data.json";
import suggestions from "./data/suggestions_data.json";

async function main() {
  await version({ client: elasticsearchClient });
  await createIndex({
    client: elasticsearchClient,
    indexName: elasticDocumentsIndex,
    mappings: documentMapping,
  });
  await indexDocumentsBatched({
    client: elasticsearchClient,
    documents: documents,
    indexName: elasticDocumentsIndex,
  });

  await createIndex({
    client: elasticsearchClient,
    indexName: elasticSuggestionsIndex,
    mappings: suggestionMapping,
  });
  await indexDocumentsBatched({
    client: elasticsearchClient,
    documents: suggestions,
    indexName: elasticSuggestionsIndex,
  });
}

main();
