import { Client } from "@elastic/elasticsearch";
import {
  DOCUMENTS,
  THEMES,
  AGREEMENTS,
  SUGGESTIONS,
  MT_SHEETS
} from "./esIndexName";

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
import { cdtnCcnGen, cdtnMTGen } from "./populate";
import { populateSuggestions } from "./suggestion";

import conventionList from "@socialgouv/kali-data/data/index.json";
import themes from "../dataset/datafiller/themes.data.json";

const ES_INDEX_PREFIX = process.env.ES_INDEX_PREFIX || "cdtn";

const DOCUMENT_INDEX_NAME = `${ES_INDEX_PREFIX}_${DOCUMENTS}`;
const THEME_INDEX_NAME = `${ES_INDEX_PREFIX}_${THEMES}`;
const AGREEMENT_INDEX_NAME = `${ES_INDEX_PREFIX}_${AGREEMENTS}`;
const SHEET_MT_INDEX_NAME = `${ES_INDEX_PREFIX}_${MT_SHEETS}`;
const SUGGEST_INDEX_NAME = `${ES_INDEX_PREFIX}_${SUGGESTIONS}`;

const ELASTICSEARCH_URL =
  process.env.ELASTICSEARCH_URL || "http://localhost:9200";

const DUMP_PATH =
  process.env.DUMP_PATH || "../../code-du-travail-nlp/data/dump.tf.json";

logger.info(`ElasticSearch at ${ELASTICSEARCH_URL}`);

const esClientConfig = {
  node: `${ELASTICSEARCH_URL}`
};

switch (process.env.NODE_ENV) {
  case "production":
    esClientConfig.auth = {
      username: process.env.ELASTICSEARCH_USER || "elastic",
      password: process.env.ELASTICSEARCH_PWD
    };
    break;
}

const client = new Client(esClientConfig);

async function main() {
  const ts = Date.now();

  await version({ client });

  // Indexing CCN data
  await createIndex({
    client,
    indexName: `${AGREEMENT_INDEX_NAME}-${ts}`,
    mappings: conventionCollectiveMapping
  });
  for (const documents of cdtnCcnGen(conventionList, 10000000)) {
    await indexDocumentsBatched({
      indexName: `${AGREEMENT_INDEX_NAME}-${ts}`,
      client,
      documents
    });
  }

  // Indexing documents/search data
  await createIndex({
    client,
    indexName: `${DOCUMENT_INDEX_NAME}-${ts}`,
    mappings: documentMapping
  });

  const documents = require(DUMP_PATH);
  await indexDocumentsBatched({
    indexName: `${DOCUMENT_INDEX_NAME}-${ts}`,
    client,
    documents
  });

  // Indexing entire fiches MT data
  await createIndex({
    client,
    indexName: `${SHEET_MT_INDEX_NAME}-${ts}`,
    mappings: documentMapping
  });
  for (const documents of cdtnMTGen()) {
    await indexDocumentsBatched({
      indexName: `${SHEET_MT_INDEX_NAME}-${ts}`,
      client,
      documents: documents
    });
  }

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
            index: `${AGREEMENT_INDEX_NAME}-*`,
            alias: `${AGREEMENT_INDEX_NAME}`
          }
        },
        {
          remove: {
            index: `${SHEET_MT_INDEX_NAME}-*`,
            alias: `${SHEET_MT_INDEX_NAME}`
          }
        },
        {
          remove: {
            index: `${DOCUMENT_INDEX_NAME}-*`,
            alias: `${DOCUMENT_INDEX_NAME}`
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
            index: `${AGREEMENT_INDEX_NAME}-${ts}`,
            alias: `${AGREEMENT_INDEX_NAME}`
          }
        },
        {
          add: {
            index: `${SHEET_MT_INDEX_NAME}-${ts}`,
            alias: `${SHEET_MT_INDEX_NAME}`
          }
        },
        {
          add: {
            index: `${DOCUMENT_INDEX_NAME}-${ts}`,
            alias: `${DOCUMENT_INDEX_NAME}`
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
    DOCUMENT_INDEX_NAME,
    THEME_INDEX_NAME,
    AGREEMENT_INDEX_NAME,
    SUGGEST_INDEX_NAME,
    SHEET_MT_INDEX_NAME
  ];

  await deleteOldIndex({ client, patterns, timestamp: ts });
}

main().catch(response => {
  if (response.body) {
    logger.error(
      (response.body.error && response.body.error.reason) || response.body
    );
  } else {
    logger.error(`${response}`);
  }
  process.exit(-1);
});
