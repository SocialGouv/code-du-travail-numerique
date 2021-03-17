import { Client } from "@elastic/elasticsearch";
import {
  createIndex,
  deleteOldIndex,
  documentMapping,
  DOCUMENTS,
  indexDocumentsBatched,
  SUGGESTIONS,
  vectorizeDocument,
  version,
} from "@socialgouv/cdtn-elasticsearch";
import { logger } from "@socialgouv/cdtn-logger";
import { SOURCES } from "@socialgouv/cdtn-sources";
import PQueue from "p-queue";
import retry from "p-retry";

import { cdtnDocumentsGen } from "./cdtnDocuments";
import { fetchCovisits } from "./monolog";
import { populateSuggestions } from "./suggestion";

const ES_INDEX_PREFIX = process.env.ES_INDEX_PREFIX || "cdtn";

const DOCUMENT_INDEX_NAME = `${ES_INDEX_PREFIX}_${DOCUMENTS}`;
const SUGGEST_INDEX_NAME = `${ES_INDEX_PREFIX}_${SUGGESTIONS}`;

const ELASTICSEARCH_URL =
  process.env.ELASTICSEARCH_URL || "http://localhost:9200";

const NLP_URL = process.env.NLP_URL;

const esClientConfig = {
  auth: { apiKey: process.env.ELASTICSEARCH_DATA_TOKEN },
  node: `${ELASTICSEARCH_URL}`,
};

const client = new Client(esClientConfig);

export async function addVector(data) {
  if (NLP_URL) {
    if (!data.title) {
      logger.error(`No title for document ${data.source} / ${data.slug}`);
    }
    const title = data.title || "sans titre";
    await vectorizeDocument(title, data.text)
      .then((title_vector) => {
        if (title_vector.message) {
          throw new Error(`error fetching ${data.title}`);
        }
        data.title_vector = title_vector;
      })
      .catch((err) => {
        logger.error(`error fetching ${data.title}`, err.message);
      });
  }

  return Promise.resolve(data);
}

// these sources do not need NLP vectorization
const excludeSources = [
  SOURCES.CDT,
  SOURCES.GLOSSARY,
  SOURCES.PREQUALIFIED,
  SOURCES.HIGHLIGHTS,
  SOURCES.SHEET_MT_PAGE,
  SOURCES.VERSIONS,
];

async function main() {
  const ts = Date.now();
  const nlpQueue = new PQueue({ concurrency: 5 });

  const monologQueue = new PQueue({ concurrency: 20 });

  logger.info(`using cdtn elasticsearch ${process.env.ELASTICSEARCH_URL}`);

  if (NLP_URL) {
    logger.info(`Using NLP service to retrieve tf vectors on ${NLP_URL}`);
  } else {
    logger.info(`NLP_URL not defined, semantic search will be disabled.`);
  }

  await version({ client });

  // Indexing documents/search data
  await createIndex({
    client,
    indexName: `${DOCUMENT_INDEX_NAME}-${ts}`,
    mappings: documentMapping,
  });

  const t0 = Date.now();
  for await (const { source, documents } of cdtnDocumentsGen()) {
    logger.info(`› ${source}... ${documents.length} items`);

    // add covisits using pQueue (there is a plan to change this : see #2915)
    const pDocs = documents.map((doc) =>
      monologQueue.add(() => fetchCovisits(doc))
    );
    let covisitDocuments = await Promise.all(pDocs);
    await monologQueue.onIdle();
    // add NLP vectors
    if (!excludeSources.includes(source)) {
      const pDocs = covisitDocuments.map((doc) =>
        nlpQueue.add(() => retry(() => addVector(doc), { retries: 3 }))
      );
      covisitDocuments = await Promise.all(pDocs);
      await nlpQueue.onIdle();
    }
    await indexDocumentsBatched({
      client,
      documents: covisitDocuments,
      indexName: `${DOCUMENT_INDEX_NAME}-${ts}`,
    });
  }

  logger.info(`done in ${(Date.now() - t0) / 1000} s`);

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
  console.error(response);
  if (response.body) {
    logger.error({ statusCode: response.meta.statusCode });
    logger.error({ name: response.name });
    logger.error({ request: response.meta.meta.request });
    logger.error({ body: response.body });
  } else {
    logger.error({ response });
  }
  process.exit(1);
});
