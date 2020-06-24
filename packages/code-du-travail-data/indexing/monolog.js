const { Queries } = require("@socialgouv/cdtn-monolog");
const { Client } = require("@elastic/elasticsearch");
const { getRouteBySource, SOURCES } = require("@cdt/sources");

const ES_LOGS = process.env.ES_LOGS;
// "https://804b8d99b80941e2a99f551cd481fb5b.westeurope.azure.elastic-cloud.com:9243";
const ES_LOGS_TOKEN = process.env.ES_LOGS_TOKEN;
// "Vkt2ajVuSUI4M0NBbGo2cFM2U2I6VjFfMjJBMXhUUWl4aVNMM1JDRVdxUQ==";

const esClientConfig = {
  node: ES_LOGS,
  auth: { apiKey: ES_LOGS_TOKEN },
};

const client = new Client(esClientConfig);

const queries = Queries(client, "log_reports");

export const fetchCovisits = async (doc) => {
  let sourceRoute = getRouteBySource(doc.source);

  // special case for fiches MT
  if (doc.source == SOURCES.SHEET_MT_PAGE) {
    sourceRoute = getRouteBySource(SOURCES.SHEET_MT);
  }

  const path = `${sourceRoute}/${doc.slug}`;
  const links = await queries
    .getCovisitLinks(path)
    .then((covisits) => covisits.links)
    .catch(() => {
      // TODO avoid silent and deal with failure properly
      // console.error(err);
      return undefined;
    });

  /*
  if (doc.source == SOURCES.SHEET_MT_PAGE) {
    console.error(links);
    console.error(path);
    console.error(doc.url);
  }
  */

  doc.covisits = links;

  return doc;
};
