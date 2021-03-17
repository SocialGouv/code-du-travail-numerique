import { Client } from "@elastic/elasticsearch";
import {
  createIndex,
  deleteOldIndex,
  documentMapping,
  DOCUMENTS,
  indexDocumentsBatched,
  SUGGESTIONS,
  version,
} from "@socialgouv/cdtn-elasticsearch";
import { logger } from "@socialgouv/cdtn-logger";

import { populateSuggestions } from "./suggestion";

// NOTE(douglasduteil): define the __non_webpack_require__ as requireFn
// As we are using @vercel/ncc to run this code and we want to require dynamic
// files we need this `__non_webpack_require__`.
const requireFn =
  // eslint-disable-next-line no-undef
  typeof __webpack_require__ === "function" ? __non_webpack_require__ : require;

const ES_INDEX_PREFIX = process.env.ES_INDEX_PREFIX || "cdtn";

const DOCUMENT_INDEX_NAME = `${ES_INDEX_PREFIX}_${DOCUMENTS}`;
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
      password: process.env.ELASTICSEARCH_PWD,
      username: process.env.ELASTICSEARCH_USER || "elastic",
    };
    break;
}

const client = new Client(esClientConfig);

async function main() {
  const ts = Date.now();
  await version({ client });

  // Indexing documents/search data
  await createIndex({
    client,
    indexName: `${DOCUMENT_INDEX_NAME}-${ts}`,
    mappings: documentMapping,
  });
  const documents = requireFn(DUMP_PATH);
  await indexDocumentsBatched({
    client,
    documents,
    indexName: `${DOCUMENT_INDEX_NAME}-${ts}`,
  });

  // Indexing Suggestions
  await populateSuggestions(client, `${SUGGEST_INDEX_NAME}-${ts}`);

  // Creating aliases
  await client.indices.updateAliases({
    body: {
      actions: [
        {
          remove: {
            alias: `${DOCUMENT_INDEX_NAME}`,
            index: `${DOCUMENT_INDEX_NAME}-*`,
          },
        },
        {
          remove: {
            alias: `${SUGGEST_INDEX_NAME}`,
            index: `${SUGGEST_INDEX_NAME}-*`,
          },
        },

        {
          add: {
            alias: `${DOCUMENT_INDEX_NAME}`,
            index: `${DOCUMENT_INDEX_NAME}-${ts}`,
          },
        },
        {
          add: {
            alias: `${SUGGEST_INDEX_NAME}`,
            index: `${SUGGEST_INDEX_NAME}-${ts}`,
          },
        },
      ],
    },
  });

  const patterns = [DOCUMENT_INDEX_NAME, SUGGEST_INDEX_NAME];

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
