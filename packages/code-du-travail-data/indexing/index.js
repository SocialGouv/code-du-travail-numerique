import { Client } from "@elastic/elasticsearch";

import { logger } from "./logger";
import { documentMapping } from "./document.mapping";
import { annuaireMapping } from "./annuaire.mapping";
import { conventionCollectiveMapping } from "./convention_collective.mapping";
import { themesMapping } from "./themes.mapping";
import { version, createIndex, indexDocumentsBatched } from "./es_client.utils";
import { cdtnDocumentsGen, cdtnCcnGen } from "./populate";

import conventionList from "@socialgouv/kali-data/data/index.json";
import annuaire from "../dataset/annuaire/annuaire.data.json";
import themes from "../dataset/datafiller/themes.data.json";

const CDTN_INDEX_NAME =
  process.env.ELASTICSEARCH_DOCUMENT_INDEX || "code_du_travail_numerique";

const ANNUAIRE_INDEX_NAME =
  process.env.ELASTICSEARCH_ANNUAIRE_INDEX || "cdtn_annuaire";

const CDTN_CCN_NAME =
  process.env.ELASTICSEARCH_CONVENTION_INDEX || "conventions_collectives";

const THEMES_INDEX_NAME =
  process.env.ELASTICSEARCH_ANNUAIRE_INDEX || "cdtn_themes";

const ELASTICSEARCH_URL =
  process.env.ELASTICSEARCH_URL || "http://localhost:9200";

logger.info(`ElasticSearch at ${ELASTICSEARCH_URL}`);

const client = new Client({
  node: `${ELASTICSEARCH_URL}`
});

async function main() {
  const ts = Date.now();

  await version({ client });

  // Indexing CCN data
  await createIndex({
    client,
    indexName: `${CDTN_CCN_NAME}-${ts}`,
    mappings: conventionCollectiveMapping
  });
  for (const documents of cdtnCcnGen(conventionList, 10000000)) {
    await indexDocumentsBatched({
      indexName: `${CDTN_CCN_NAME}-${ts}`,
      client,
      documents
    });
  }

  // Indexing document data
  await createIndex({
    client,
    indexName: `${CDTN_INDEX_NAME}-${ts}`,
    mappings: documentMapping
  });
  for (const documents of cdtnDocumentsGen()) {
    await indexDocumentsBatched({
      indexName: `${CDTN_INDEX_NAME}-${ts}`,
      client,
      documents,
      size: 1000
    });
  }

  // Indexing Annuaire data
  await createIndex({
    client,
    indexName: `${ANNUAIRE_INDEX_NAME}-${ts}`,
    mappings: annuaireMapping
  });
  await indexDocumentsBatched({
    client,
    indexName: `${ANNUAIRE_INDEX_NAME}-${ts}`,
    documents: annuaire,
    size: 500
  });

  // Indexing Themes data
  await createIndex({
    client,
    indexName: `${THEMES_INDEX_NAME}-${ts}`,
    mappings: themesMapping
  });
  await indexDocumentsBatched({
    client,
    indexName: `${THEMES_INDEX_NAME}-${ts}`,
    documents: themes,
    size: 500
  });
  // Creating alias
  await client.indices.putAlias({
    index: `${ANNUAIRE_INDEX_NAME}-${ts}`,
    name: ANNUAIRE_INDEX_NAME
  });
  await client.indices.putAlias({
    index: `${THEMES_INDEX_NAME}-${ts}`,
    name: THEMES_INDEX_NAME
  });
  await client.indices.putAlias({
    index: `${CDTN_CCN_NAME}-${ts}`,
    name: CDTN_CCN_NAME
  });
  await client.indices.putAlias({
    index: `${CDTN_INDEX_NAME}-${ts}`,
    name: CDTN_INDEX_NAME
  });
}

main();
