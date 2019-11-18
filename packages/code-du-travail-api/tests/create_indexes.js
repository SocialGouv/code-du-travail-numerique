import client from "../src/server/conf/elasticsearch";
import {
  version,
  createIndex,
  indexDocumentsBatched
} from "@cdt/data/indexing/es_client.utils";

import { documentMapping } from "@cdt/data/indexing/document.mapping";
import documents from "./cdtn_document.data.json";
import themes from "./cdtn_theme.data.json";
import sheetsMT from "./fiches_ministere_travail.data.json";
import { conventionCollectiveMapping } from "@cdt/data/indexing/convention_collective.mapping";
import conventions from "./convention.data.json";
import { themesMapping } from "@cdt/data/indexing/themes.mapping";
import { suggestionMapping } from "@cdt/data/indexing/suggestion.mapping";
import suggestions from "./suggestions_data.json";

const documentIndexName = "cdtn_document_test";
const themeIndexName = "cdtn_theme_test";
const conventionsIndexName = "cdtn_convention_test";
const suggestionsIndexName = "cdtn_suggestion_test";
const sheetMTIndexName = "cdtn_fiches_ministere_du_travail_test";

async function main() {
  await version({ client });
  await createIndex({
    client,
    indexName: documentIndexName,
    mappings: documentMapping
  });
  await indexDocumentsBatched({
    client,
    indexName: documentIndexName,
    documents: documents
  });

  await createIndex({
    client,
    indexName: themeIndexName,
    mappings: themesMapping
  });
  await indexDocumentsBatched({
    client,
    indexName: themeIndexName,
    documents: themes
  });

  await createIndex({
    client,
    indexName: conventionsIndexName,
    mappings: conventionCollectiveMapping
  });
  await indexDocumentsBatched({
    client,
    indexName: conventionsIndexName,
    documents: conventions
  });

  await createIndex({
    client,
    indexName: suggestionsIndexName,
    mappings: suggestionMapping
  });
  await indexDocumentsBatched({
    client,
    indexName: suggestionsIndexName,
    documents: suggestions
  });

  await createIndex({
    client,
    indexName: sheetMTIndexName,
    mappings: documentMapping
  });
  await indexDocumentsBatched({
    client,
    indexName: sheetMTIndexName,
    documents: sheetsMT
  });
}

main();
