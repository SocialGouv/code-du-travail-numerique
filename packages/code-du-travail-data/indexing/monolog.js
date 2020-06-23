import { Queries } from "@socialgouv/cdtn-monolog";
import { Client } from "@elastic/elasticsearch";

const ES_LOGS =
  "https://804b8d99b80941e2a99f551cd481fb5b.westeurope.azure.elastic-cloud.com:9243";
const ES_LOGS_TOKEN =
  "eU1fYlZIRUI4M0NBbGo2cG13Y1I6UXdfOXdpVVhRZW1ibkxRYml6UXVQUQ==";

const esClientConfig = {
  node: ES_LOGS,
  auth: { apiKey: ES_LOGS_TOKEN },
};

const client = new Client(esClientConfig);

export const queries = Queries(client, "log_reports");
