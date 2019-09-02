import client from "../src/server/conf/elasticsearch";
import {
  version,
  createIndex,
  indexDocumentsBatched
} from "@cdt/data/indexing/es_client.utils";
import { SOURCES } from "@cdt/sources";

import { documentMapping } from "@cdt/data/indexing/document.mapping";
import documents from "./cdtn_document_data.json";
import { annuaireMapping } from "@cdt/data/indexing/annuaire.mapping";
import annuaires from "./cdtn_annuaire_data.json";
import { conventionCollectiveMapping } from "@cdt/data/indexing/convention_collective.mapping";
import conventions from "./convention_data.json";
import { themesMapping } from "@cdt/data/indexing/themes.mapping";

const themes = documents.filter(document => document.source === SOURCES.THEMES);

const documentIndexName = "cdtn_document_test";
const themeIndexName = "cdtn_theme_test";
const annuaireIndexName = "cdtn_annuaire_test";
const conventionsIndexName = "cdtn_convention_test";

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
    indexName: annuaireIndexName,
    mappings: annuaireMapping
  });
  await indexDocumentsBatched({
    client,
    indexName: annuaireIndexName,
    documents: annuaires
  });
}

main();
