import { Client } from "@elastic/elasticsearch";

import { logger } from "./logger";
import { documentMapping } from "./document.mapping";
import { conventionCollectiveMapping } from "./convention_collective.mapping";
import { themesMapping } from "./themes.mapping";
import {
  version,
  createIndex,
  indexDocumentsBatched,
  deleteOldIndex
} from "./es_client.utils";
import { cdtnCcnGen } from "./populate";

import conventionList from "@socialgouv/kali-data/data/index.json";
import themes from "../dataset/datafiller/themes.data.json";

const CDTN_INDEX_NAME =
  process.env.ELASTICSEARCH_DOCUMENT_INDEX || "code_du_travail_numerique";

const CDTN_CCN_NAME =
  process.env.ELASTICSEARCH_CONVENTION_INDEX || "conventions_collectives";

const THEME_INDEX_NAME = process.env.ELASTICSEARCH_THEME_INDEX || "cdtn_themes";

const ELASTICSEARCH_URL =
  process.env.ELASTICSEARCH_URL || "http://localhost:9200";

const DUMP_PATH =
  process.env.DUMP_PATH || "../../code-du-travail-nlp/data/dump.tf.json";

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

  const documents = require(DUMP_PATH);
  await indexDocumentsBatched({
    indexName: `${CDTN_INDEX_NAME}-${ts}`,
    client,
    documents
  });

  // Indexing Themes data
  await createIndex({
    client,
    indexName: `${THEME_INDEX_NAME}-${ts}`,
    mappings: themesMapping
  });
  await indexDocumentsBatched({
    client,
    indexName: `${THEME_INDEX_NAME}-${ts}`,
    documents: themes
  });

  // Creating alias
  await client.indices.putAlias({
    index: `${THEME_INDEX_NAME}-${ts}`,
    name: THEME_INDEX_NAME
  });
  await client.indices.putAlias({
    index: `${CDTN_CCN_NAME}-${ts}`,
    name: CDTN_CCN_NAME
  });
  await client.indices.putAlias({
    index: `${CDTN_INDEX_NAME}-${ts}`,
    name: CDTN_INDEX_NAME
  });

  const patterns = [CDTN_INDEX_NAME, THEME_INDEX_NAME, CDTN_CCN_NAME];
  await deleteOldIndex({ client, patterns, timestamp: ts });
}

main().catch(response => {
  if (response.body) {
    logger.error(response.body.error);
  } else {
    logger.error(response);
  }
  process.exit(-1);
});
