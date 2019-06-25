// https://github.com/elastic/elasticsearch-js

const { Client } = require("@elastic/elasticsearch");
const { logger } = require("../utils/logger");

const ELASTICSEARCH_URL =
  process.env.ELASTICSEARCH_URL || "http://localhost:9200";

logger.info(`ElasticSearch at ${ELASTICSEARCH_URL}`);

const client = new Client({
  node: `${ELASTICSEARCH_URL}`
});

module.exports = client;
