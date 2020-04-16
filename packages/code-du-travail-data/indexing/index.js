import { Client } from "@elastic/elasticsearch";
import mtSheets from "@socialgouv/fiches-travail-data/data/fiches-travail.json";
import agreements from "../dataset/datafiller/agreements.data.json";
import { conventionCollectiveMapping } from "./convention_collective.mapping";
import { documentMapping } from "./document.mapping";
import { AGREEMENTS, DOCUMENTS, MT_SHEETS, SUGGESTIONS } from "./esIndexName";
import {
  createIndex,
  deleteOldIndex,
  indexDocumentsBatched,
  version,
} from "./es_client.utils";
import { logger } from "./logger";
import { populateSuggestions } from "./suggestion";

const ES_INDEX_PREFIX = process.env.ES_INDEX_PREFIX || "cdtn";

const DOCUMENT_INDEX_NAME = `${ES_INDEX_PREFIX}_${DOCUMENTS}`;
const AGREEMENT_INDEX_NAME = `${ES_INDEX_PREFIX}_${AGREEMENTS}`;
const SHEET_MT_INDEX_NAME = `${ES_INDEX_PREFIX}_${MT_SHEETS}`;
const SUGGEST_INDEX_NAME = `${ES_INDEX_PREFIX}_${SUGGESTIONS}`;

const ELASTICSEARCH_URL =
  process.env.ELASTICSEARCH_URL || "http://localhost:9200";

const DUMP_PATH = process.env.DUMP_PATH || "../dist/dump.data.json";

logger.info(`ElasticSearch at ${ELASTICSEARCH_URL}`);

const esClientConfig = {
  node: `${ELASTICSEARCH_URL}`,
};

switch (process.env.NODE_ENV) {
  case "production":
    esClientConfig.auth = {
      username: process.env.ELASTICSEARCH_USER || "elastic",
      password: process.env.ELASTICSEARCH_PWD,
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
    mappings: conventionCollectiveMapping,
  });
  await indexDocumentsBatched({
    indexName: `${AGREEMENT_INDEX_NAME}-${ts}`,
    client,
    documents: agreements,
  });

  // Indexing documents/search data
  await createIndex({
    client,
    indexName: `${DOCUMENT_INDEX_NAME}-${ts}`,
    mappings: documentMapping,
  });
  const documents = require(DUMP_PATH);
  await indexDocumentsBatched({
    indexName: `${DOCUMENT_INDEX_NAME}-${ts}`,
    client,
    documents,
  });

  // Indexing entire fiches MT data
  await createIndex({
    client,
    indexName: `${SHEET_MT_INDEX_NAME}-${ts}`,
    mappings: documentMapping,
  });
  await indexDocumentsBatched({
    indexName: `${SHEET_MT_INDEX_NAME}-${ts}`,
    client,
    documents: mtSheets,
  });

  // Indexing Suggestions
  await populateSuggestions(client, `${SUGGEST_INDEX_NAME}-${ts}`);

  // Creating aliases
  await client.indices.updateAliases({
    body: {
      actions: [
        {
          remove: {
            index: `${AGREEMENT_INDEX_NAME}-*`,
            alias: `${AGREEMENT_INDEX_NAME}`,
          },
        },
        {
          remove: {
            index: `${SHEET_MT_INDEX_NAME}-*`,
            alias: `${SHEET_MT_INDEX_NAME}`,
          },
        },
        {
          remove: {
            index: `${DOCUMENT_INDEX_NAME}-*`,
            alias: `${DOCUMENT_INDEX_NAME}`,
          },
        },
        {
          remove: {
            index: `${SUGGEST_INDEX_NAME}-*`,
            alias: `${SUGGEST_INDEX_NAME}`,
          },
        },
        {
          add: {
            index: `${AGREEMENT_INDEX_NAME}-${ts}`,
            alias: `${AGREEMENT_INDEX_NAME}`,
          },
        },
        {
          add: {
            index: `${SHEET_MT_INDEX_NAME}-${ts}`,
            alias: `${SHEET_MT_INDEX_NAME}`,
          },
        },
        {
          add: {
            index: `${DOCUMENT_INDEX_NAME}-${ts}`,
            alias: `${DOCUMENT_INDEX_NAME}`,
          },
        },
        {
          add: {
            index: `${SUGGEST_INDEX_NAME}-${ts}`,
            alias: `${SUGGEST_INDEX_NAME}`,
          },
        },
      ],
    },
  });

  const patterns = [
    DOCUMENT_INDEX_NAME,
    AGREEMENT_INDEX_NAME,
    SUGGEST_INDEX_NAME,
    SHEET_MT_INDEX_NAME,
  ];

  await deleteOldIndex({ client, patterns, timestamp: ts });
}

main().catch((response) => {
  if (response.body) {
    logger.error(response.meta.statusCode);
    logger.error(response.name);
    logger.error(response.meta.meta.request);
  } else {
    logger.error(response);
  }
  process.exit(-1);
});
