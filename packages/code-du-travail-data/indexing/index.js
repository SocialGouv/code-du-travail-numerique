import { Client } from "@elastic/elasticsearch";

import { logger } from "./logger";
import { documentMapping } from "./document.mapping";
import { annuaireMapping } from "./annuaire.mapping";
import { conventionCollectiveMapping } from "./convention_collective.mapping";
import { version, createIndex, indexDocumentsBatched } from "./es_client.utils";
import { cdtnDocumentsGen, cdtnCcnGen } from "./populate";

import annuaire from "../dataset/annuaire/annuaire.data.json";
import conventionList from "../dataset/conventions_collectives/ccn-list.json";

const CDTN_INDEX_NAME =
  process.env.ELASTICSEARCH_DOCUMENT_INDEX || "code_du_travail_numerique";

const CDTN_ANNUAIRE_NAME =
  process.env.ELASTICSEARCH_ANNUAIRE_INDEX || "cdtn_annuaire";

const CDTN_CCN_NAME =
  process.env.ELASTICSEARCH_CONVENTION_INDEX || "conventions_collectives";

const ELASTICSEARCH_URL =
  process.env.ELASTICSEARCH_URL || "http://localhost:9200";

logger.info(`ElasticSearch at ${ELASTICSEARCH_URL}`);

const client = new Client({
  node: `${ELASTICSEARCH_URL}`
});

async function main() {
  await version({ client });
  // Indexing document data
  // Indexing CCN data

  await createIndex({
    client,
    indexName: CDTN_CCN_NAME,
    mappings: conventionCollectiveMapping
  });
  for (const documents of cdtnCcnGen(conventionList, 100)) {
    await indexDocumentsBatched({
      indexName: CDTN_CCN_NAME,
      client,
      documents
    });
  }

  await createIndex({
    client,
    indexName: CDTN_INDEX_NAME,
    mappings: documentMapping
  });
  for (const documents of cdtnDocumentsGen()) {
    await indexDocumentsBatched({
      indexName: CDTN_INDEX_NAME,
      client,
      documents,
      size: 1000
    });
  }

  // Indexing Annuaire data
  await createIndex({
    client,
    indexName: CDTN_ANNUAIRE_NAME,
    mappings: annuaireMapping
  });
  await indexDocumentsBatched({
    client,
    indexName: CDTN_ANNUAIRE_NAME,
    documents: annuaire
  });
}

main();
