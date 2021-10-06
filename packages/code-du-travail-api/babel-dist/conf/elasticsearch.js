"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0; // https://github.com/elastic/elasticsearch-js
const winston = require("winston");
const { Client } = require("@elastic/elasticsearch");
const { logger } = require("@socialgouv/cdtn-logger");

const ELASTICSEARCH_URL =
  process.env.ELASTICSEARCH_URL || "http://localhost:9200";
const esClientConfig = { node: `${ELASTICSEARCH_URL}` };
switch (process.env.NODE_ENV) {
  case "test":
    logger.level = winston.warn;
    break;
  case "production":
    esClientConfig.auth = { apiKey: process.env.ELASTICSEARCH_TOKEN_API };
    break;
}
logger.info(`ElasticSearch at ${ELASTICSEARCH_URL}`);
const client = new Client(esClientConfig);
var _default = client;
exports.default = _default;
