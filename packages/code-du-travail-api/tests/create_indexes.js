const client = require("../src/server/conf/elasticsearch");
const { analyzer, filter, tokenizer } = require("./es_analysis");
const { logger } = require("../src/server/utils/logger");
const documentsData = require("./cdtn_document_data.json");
const annuaireData = require("./cdtn_annuaire_data.json");
const documentMapping = require("./cdtn_document_mapping");
const annuaireMapping = require("./cdtn_document_mapping");

const documentIndexName = "cdtn_document_test";
const annuaireIndexName = "cdtn_annuaire_test";

async function createIndex(indexName, mapping, data) {
  const exists = await client.indices.exists({ index: indexName });
  if (exists) {
    try {
      await client.indices.delete({ index: indexName });
      logger.info(`Index ${indexName} deleted.`);
    } catch (error) {
      logger.error("index delete", error);
    }
  }
  try {
    await client.indices.create({
      index: indexName,
      body: {
        settings: {
          number_of_shards: 1,
          number_of_replicas: 0,
          index: {
            analysis: {
              filter,
              analyzer,
              tokenizer
            }
          }
        },
        mappings: {
          [indexName]: mapping
        }
      }
    });
    logger.info(`Index ${indexName} created.`);
  } catch (error) {
    logger.error("index create", error);
  }
  try {
    await client.bulk({
      index: indexName,
      body: data.reduce(
        (state, doc, i) =>
          state.concat(
            { index: { _index: indexName, _type: indexName, _id: i } },
            doc
          ),
        []
      )
    });
    logger.info(`Index ${data.length} documents.`);
  } catch (error) {
    logger.error("index documents", error);
  }
}

createIndex(documentIndexName, documentMapping, documentsData);
createIndex(annuaireIndexName, annuaireMapping, annuaireData);
