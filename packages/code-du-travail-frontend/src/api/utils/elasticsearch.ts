import type { ClientOptions } from "@elastic/elasticsearch";
import { Client } from "@elastic/elasticsearch";

const ELASTICSEARCH_URL =
  process.env.ELASTICSEARCH_URL ?? "http://localhost:9200";
const ELASTICSEARCH_TOKEN_API = process.env.ELASTICSEARCH_TOKEN_API;
const ELASTICSEARCH_USER = process.env.ELASTICSEARCH_USER;
const ELASTICSEARCH_PASSWORD = process.env.ELASTICSEARCH_PASSWORD;
const ES_INDEX_PREFIX = process.env.NEXT_PUBLIC_ES_INDEX_PREFIX ?? "cdtn";
const CDTN_ADMIN_VERSION = process.env.CDTN_ADMIN_VERSION ?? "v2";
const BRANCH_NAME_SLUG = process.env.NEXT_PUBLIC_BRANCH_NAME_SLUG;

const esClientConfig: ClientOptions = {
  node: ELASTICSEARCH_URL,
};

console.log("Connecting to elasticsearch at", ELASTICSEARCH_URL);

if (ELASTICSEARCH_USER && ELASTICSEARCH_PASSWORD) {
  console.log("Using basic auth");
  esClientConfig.auth = {
    username: ELASTICSEARCH_USER,
    password: ELASTICSEARCH_PASSWORD,
  };
}

if (ELASTICSEARCH_TOKEN_API) {
  console.log("Using token api");
  esClientConfig.auth = { apiKey: ELASTICSEARCH_TOKEN_API };
}

export const elasticsearchClient = new Client(esClientConfig);

const prefixIndex = BRANCH_NAME_SLUG?.startsWith("linked")
  ? `cdtn-${BRANCH_NAME_SLUG}`
  : `${ES_INDEX_PREFIX}-${CDTN_ADMIN_VERSION}`;
export const elasticDocumentsIndex = `${prefixIndex}_documents`;
export const elasticSuggestionsIndex = `${prefixIndex}_suggestions`;
