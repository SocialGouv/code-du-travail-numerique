import { analyzer, char_filter, filter, tokenizer } from "./analysis";
import { logger } from "./logger";

async function createIndex({ client, indexName, mappings }) {
  const { body } = await client.indices.exists({ index: indexName });
  if (body) {
    try {
      await client.indices.delete({ index: indexName });
      logger.info(`Index ${indexName} deleted.`);
    } catch (error) {
      logger.error("index delete", error);
    }
  }
  try {
    await client.indices.create({
      body: {
        mappings: mappings,
        settings: {
          index: {
            analysis: {
              analyzer,
              char_filter,
              filter,
              tokenizer,
            },
          },
          number_of_replicas: 1,
          number_of_shards: 1,
        },
      },
      index: indexName,
    });
    logger.info(`Index ${indexName} created.`);
  } catch (error) {
    logger.error("index create", error);
  }
}

async function version({ client }) {
  const { body } = await client.info();
  logger.info(body.version.number);
}

async function bulkIndexDocuments({ client, indexName, documents }) {
  try {
    const resp = await client.bulk({
      body: documents.reduce(
        (state, doc, i) =>
          state.concat(
            {
              index: {
                _index: indexName,
                // if available, use our cdtnId as the actual Elastic document id
                ...(doc.cdtnId && { _id: doc.cdtnId }),
                // unless we're in testing mode where we use position
                ...(process.env.NODE_ENV === "test" && { _id: i }),
              },
            },
            doc
          ),
        []
      ),
      index: indexName,
    });
    if (resp.body.errors) {
      const errorDocs = resp.body.items.filter(
        (item) => item.index.status != 201
      );
      logger.error(`Errors during indexation : ${JSON.stringify(errorDocs)}`);
    }
    logger.info(`Index ${documents.length} documents.`);
  } catch (error) {
    logger.error("index documents", error);
  }
}

async function indexDocumentsBatched({
  client,
  indexName,
  documents,
  size = 1000,
}) {
  logger.info(`Loaded ${documents.length} documents`);
  for (const chunk of chunks(documents, size)) {
    await bulkIndexDocuments({ client, documents: chunk, indexName });
  }
}

async function deleteOldIndex({ client, patterns, timestamp }) {
  const { body: indices } = await client.cat.indices({ format: "json" });

  const IndicesToDelete = getIndicesToDelete(patterns, timestamp, indices);
  const pIndicesToDelete = IndicesToDelete.map(({ index }) =>
    client.indices.delete({ index })
  );

  return Promise.all(pIndicesToDelete).then(() => {
    logger.info(`Remove ${pIndicesToDelete.length} old indices`);
  });
}

function* chunks(items, size) {
  for (const val of range(0, items.length, size)) {
    yield items.slice(val, val + size);
  }
}

function range(start, end, size = 1) {
  return Array.from(
    { length: Math.ceil((end - start) / size) },
    (_, i) => start + i * size
  );
}

function getIndicesToDelete(patterns, timestamp, indices) {
  function isCdtnIndex({ index }) {
    return patterns.some((pattern) => index.startsWith(`${pattern}-`));
  }

  const currentIndices = patterns.map((pattern) => `${pattern}-${timestamp}`);

  return indices
    .filter(({ index }) => !currentIndices.includes(index))
    .filter(isCdtnIndex)
    .sort(({ index: indexA }, { index: indexB }) => {
      const [, typeA = "", tsA = 0] = indexA.match(/(\w+)-(\d+)/);
      const [, typeB = "", tsB = 0] = indexB.match(/(\w+)-(\d+)/);
      if (tsA === tsB) {
        return typeA - typeB;
      }
      return parseInt(tsA) - parseInt(tsB);
    })
    .slice(0, -patterns.length);
}

export {
  bulkIndexDocuments,
  chunks,
  createIndex,
  deleteOldIndex,
  getIndicesToDelete,
  indexDocumentsBatched,
  range,
  version,
};
