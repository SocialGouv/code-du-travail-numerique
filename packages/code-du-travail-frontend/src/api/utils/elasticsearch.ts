import type { ClientOptions } from "@elastic/elasticsearch";
import { Client } from "@elastic/elasticsearch";

const ELASTICSEARCH_URL =
  process.env.ELASTICSEARCH_URL ?? "http://localhost:9200";
const ELASTICSEARCH_TOKEN_API: string | undefined =
  process.env.ELASTICSEARCH_TOKEN_API;
const esClientConfig: ClientOptions = {
  node: ELASTICSEARCH_URL,
};

if (ELASTICSEARCH_TOKEN_API) {
  esClientConfig.auth = { apiKey: ELASTICSEARCH_TOKEN_API };
}

export const elasticsearchClient = new Client(esClientConfig);
