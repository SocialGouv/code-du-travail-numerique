const client = require("../src/server/conf/elasticsearch");
const { analyzer, filter, char_filter, tokenizer } = require("./es_analysis");
const { logger } = require("../src/server/utils/logger");
const documentMapping = require("./cdtn_document_mapping");
const documentsData = require("./cdtn_document_data.json");
const annuaireMapping = require("./cdtn_annuaire_mapping");
const annuaireData = require("./cdtn_annuaire_data.json");

const documentIndexName = "cdtn_document_test";
const annuaireIndexName = "cdtn_annuaire_test";

async function createIndex(indexName, mappings, data) {
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
      index: indexName,
      includeTypeName: false,
      body: {
        settings: {
          number_of_shards: 1,
          number_of_replicas: 0,
          index: {
            analysis: {
              filter,
              analyzer,
              char_filter,
              tokenizer
            }
          }
        },
        mappings: mappings
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
            { index: { _index: indexName, _type: "_doc", _id: i } },
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
async function version() {
  const { body } = await client.info();
  logger.info(body.version.number);
}
version();
createIndex(documentIndexName, documentMapping, documentsData);
createIndex(annuaireIndexName, annuaireMapping, annuaireData);
