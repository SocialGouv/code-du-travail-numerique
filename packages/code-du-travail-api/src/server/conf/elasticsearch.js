// https://github.com/elastic/elasticsearch-js

const winston = require("winston");
const { Client } = require("@elastic/elasticsearch");
const { logger } = require("../utils/logger");

const ELASTICSEARCH_URL =
  process.env.ELASTICSEARCH_URL || "http://localhost:9200";

if (process.env.NODE_ENV === "test") {
  logger.level = winston.warn;
}

logger.info(`ElasticSearch at ${ELASTICSEARCH_URL}`);

const client = new Client({
  node: `${ELASTICSEARCH_URL}`
});

module.exports = client;
