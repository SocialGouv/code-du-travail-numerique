import type { ClientOptions } from "@elastic/elasticsearch";
import { Client } from "@elastic/elasticsearch";

const ELASTICSEARCH_URL =
  process.env.ELASTICSEARCH_URL ?? "http://localhost:9200";
const ELASTICSEARCH_TOKEN_API: string | undefined =
  process.env.ELASTICSEARCH_TOKEN_API;
const ES_INDEX_PREFIX = process.env.ES_INDEX_PREFIX ?? "cdtn";
const CDTN_ADMIN_VERSION = process.env.CDTN_ADMIN_VERSION ?? "v2";

const esClientConfig: ClientOptions = {
  node: ELASTICSEARCH_URL,
};

if (ELASTICSEARCH_TOKEN_API) {
  esClientConfig.auth = { apiKey: ELASTICSEARCH_TOKEN_API };
}

export const elasticsearchClient = new Client(esClientConfig);

// TODO DO NOT MERGE !!!!!!
// TODO DO NOT MERGE !!!!!!
// TODO DO NOT MERGE !!!!!!
// TODO DO NOT MERGE !!!!!!
// TODO DO NOT MERGE !!!!!!
export const elasticDocumentsIndex = `cdtn-dev-v2_documents-1700565698890`;
export const elasticSuggestionsIndex = `${ES_INDEX_PREFIX}-${CDTN_ADMIN_VERSION}_suggestions`;
