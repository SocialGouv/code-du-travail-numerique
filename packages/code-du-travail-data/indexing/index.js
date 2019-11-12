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
import { populateSuggestions } from "./suggestion";

import conventionList from "@socialgouv/kali-data/data/index.json";
import themes from "../dataset/datafiller/themes.data.json";

const CDTN_INDEX_NAME =
  process.env.ELASTICSEARCH_DOCUMENT_INDEX || "code_du_travail_numerique";

const SUGGEST_INDEX_NAME = process.env.SUGGEST_INDEX_NAME || "cdtn_suggestions";

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

  // Indexing Suggestions
  await populateSuggestions(client, `${SUGGEST_INDEX_NAME}-${ts}`);

  // Creating aliases
  await client.indices.updateAliases({
    body: {
      actions: [
        {
          remove: {
            index: `${THEME_INDEX_NAME}-*`,
            alias: `${THEME_INDEX_NAME}`
          }
        },
        {
          remove: {
            index: `${CDTN_CCN_NAME}-*`,
            alias: `${CDTN_CCN_NAME}`
          }
        },
        {
          remove: {
            index: `${CDTN_INDEX_NAME}-*`,
            alias: `${CDTN_INDEX_NAME}`
          }
        },
        {
          remove: {
            index: `${SUGGEST_INDEX_NAME}-*`,
            alias: `${SUGGEST_INDEX_NAME}`
          }
        },
        {
          add: {
            index: `${THEME_INDEX_NAME}-${ts}`,
            alias: `${THEME_INDEX_NAME}`
          }
        },
        {
          add: {
            index: `${CDTN_CCN_NAME}-${ts}`,
            alias: `${CDTN_CCN_NAME}`
          }
        },
        {
          add: {
            index: `${CDTN_INDEX_NAME}-${ts}`,
            alias: `${CDTN_INDEX_NAME}`
          }
        },
        {
          add: {
            index: `${SUGGEST_INDEX_NAME}-${ts}`,
            alias: `${SUGGEST_INDEX_NAME}`
          }
        }
      ]
    }
  });

  const patterns = [
    CDTN_INDEX_NAME,
    THEME_INDEX_NAME,
    CDTN_CCN_NAME,
    SUGGEST_INDEX_NAME
  ];

  await deleteOldIndex({ client, patterns, timestamp: ts });
}

main().catch(response => {
  if (response.body) {
    logger.error(response.body.error.reason);
  } else {
    logger.error(response);
  }
  process.exit(-1);
});
