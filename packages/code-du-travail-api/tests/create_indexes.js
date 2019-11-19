import client from "../src/server/conf/elasticsearch";
import {
  version,
  createIndex,
  indexDocumentsBatched
} from "@cdt/data/indexing/es_client.utils";

import {
  DOCUMENTS,
  THEMES,
  AGREEMENTS,
  SUGGESTIONS,
  MT_SHEETS
} from "@cdt/data/indexing/esIndexName";

import { documentMapping } from "@cdt/data/indexing/document.mapping";
import documents from "./cdtn_document.data.json";
import themes from "./cdtn_theme.data.json";
import sheetsMT from "./fiches_ministere_travail.data.json";
import { conventionCollectiveMapping } from "@cdt/data/indexing/convention_collective.mapping";
import conventions from "./convention.data.json";
import { themesMapping } from "@cdt/data/indexing/themes.mapping";
import { suggestionMapping } from "@cdt/data/indexing/suggestion.mapping";
import suggestions from "./suggestions_data.json";

const ES_INDEX_PREFIX = process.env.ES_INDEX_PREFIX || "cdtn_test";

const documentsIndexName = `${ES_INDEX_PREFIX}_${DOCUMENTS}`;
const themesIndexName = `${ES_INDEX_PREFIX}_${THEMES}`;
const agreementsIndexName = `${ES_INDEX_PREFIX}_${AGREEMENTS}`;
const mtSheetsIndexName = `${ES_INDEX_PREFIX}_${MT_SHEETS}`;
const suggestionsIndexName = `${ES_INDEX_PREFIX}_${SUGGESTIONS}`;

async function main() {
  await version({ client });
  await createIndex({
    client,
    indexName: documentsIndexName,
    mappings: documentMapping
  });
  await indexDocumentsBatched({
    client,
    indexName: documentsIndexName,
    documents: documents
  });

  await createIndex({
    client,
    indexName: themesIndexName,
    mappings: themesMapping
  });
  await indexDocumentsBatched({
    client,
    indexName: themesIndexName,
    documents: themes
  });

  await createIndex({
    client,
    indexName: agreementsIndexName,
    mappings: conventionCollectiveMapping
  });
  await indexDocumentsBatched({
    client,
    indexName: agreementsIndexName,
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
    indexName: mtSheetsIndexName,
    mappings: documentMapping
  });
  await indexDocumentsBatched({
    client,
    indexName: mtSheetsIndexName,
    documents: sheetsMT
  });
}

main();
