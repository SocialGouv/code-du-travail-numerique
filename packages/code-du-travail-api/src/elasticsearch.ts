// https://github.com/elastic/elasticsearch-js

import type { ClientOptions } from "@elastic/elasticsearch";
import { Client } from "@elastic/elasticsearch";
import { logger } from "@socialgouv/cdtn-logger";
import winston from "winston";

const ELASTICSEARCH_URL =
  process.env.ELASTICSEARCH_URL ?? "http://localhost:9200";
const ELASTICSEARCH_TOKEN_API: string | undefined =
  process.env.ELASTICSEARCH_TOKEN_API;
const esClientConfig: ClientOptions = {
  node: `${ELASTICSEARCH_URL}`,
};

switch (process.env.NODE_ENV) {
  case "test":
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    logger.level = winston.warn;
    break;
  case "production":
    if (ELASTICSEARCH_TOKEN_API) {
      esClientConfig.auth = { apiKey: ELASTICSEARCH_TOKEN_API };
    }
    break;
  default:
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    logger.level = winston.warn;
    break;
}

logger.info(`ElasticSearch at ${ELASTICSEARCH_URL}`);

const client = new Client(esClientConfig);

export default client;
