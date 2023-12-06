import type { ClientOptions } from "@elastic/elasticsearch";
import { Client } from "@elastic/elasticsearch";

const ELASTICSEARCH_URL =
  process.env.ELASTICSEARCH_URL ?? "http://localhost:9200";
const ELASTICSEARCH_TOKEN_API: string | undefined =
  process.env.ELASTICSEARCH_TOKEN_API;
const ES_INDEX_PREFIX = process.env.ES_INDEX_PREFIX ?? "cdtn";
const CDTN_ADMIN_VERSION = process.env.CDTN_ADMIN_VERSION ?? "v2";
const BRANCH_NAME_SLUG = process.env.BRANCH_NAME_SLUG;

const esClientConfig: ClientOptions = {
  node: ELASTICSEARCH_URL,
};

if (ELASTICSEARCH_TOKEN_API) {
  esClientConfig.auth = { apiKey: ELASTICSEARCH_TOKEN_API };
}

export const elasticsearchClient = new Client(esClientConfig);

const prefixIndex = BRANCH_NAME_SLUG?.startsWith("linked")
  ? process.env.BRANCH_NAME_SLUG
  : `${ES_INDEX_PREFIX}-${CDTN_ADMIN_VERSION}`;
console.log(`Prefix index : ${prefixIndex}`);
export const elasticDocumentsIndex = `${prefixIndex}_documents`;
export const elasticSuggestionsIndex = `${prefixIndex}_suggestions`;
