import elasticsearchClient from "../../conf/elasticsearch.js";
import { API_BASE_URL, CDTN_ADMIN_VERSION } from "../v1.prefix";

const Router = require("koa-router");
const fetch = require("node-fetch");
const { startOfDay, subMonths, max, format } = require("date-fns");

const { DOCUMENTS } = require("@socialgouv/cdtn-elasticsearch");
const docsCountBody = require("../docs-count/docCount.elastic");

const router = new Router({ prefix: API_BASE_URL });

const ES_INDEX_PREFIX = process.env.ES_INDEX_PREFIX || "cdtn";
const index = `${ES_INDEX_PREFIX}-${CDTN_ADMIN_VERSION}_${DOCUMENTS}`;

const MATOMO_SITE_ID = process.env.PIWIK_SITE_ID || "3";
const MATOMO_URL =
  process.env.PIWIK_URL || "https://matomo.fabrique.social.gouv.fr";
/**
 * Return a date range (matomo api format)
 * getDate return a 6month date range that starts from 2020-01-01
 * @param {date} date a date
 */
function getDate(date) {
  const launchDate = new Date(Date.UTC(2020, 0, 1));
  const startDate = max([subMonths(startOfDay(date), 6), launchDate]);
  return `${format(startDate, "yyyy-MM-dd")},today`;
}

function getUrl(baseUrl, params) {
  const qs = Object.entries(params).map(([key, value]) => {
    if (Array.isArray(value)) {
      //label: ["A", "B"] => label[]=A&label[]=B
      return value.map((value) => `${key}[]=${value}`).join("&");
    }
    return `${key}=${value}`;
  });
  return `${baseUrl}?${qs.join("&")}`;
}

// general matomo congif params
const baseParams = {
  date: getDate(new Date()),
  format: "JSON",
  idSite: MATOMO_SITE_ID,
  module: "API",
  period: "range",
};

const methodParams = [
  {
    method: "VisitsSummary.getVisits",
  },
  {
    method: "Actions.get",
  },
];

router.get("/stats", async (ctx) => {
  if (!MATOMO_SITE_ID && !MATOMO_URL) {
    ctx.throw(500, `There is no matomo`);
    return;
  }
  const promises = methodParams.map((params) =>
    fetch(getUrl(MATOMO_URL, { ...baseParams, ...params }))
      .then((data) => data.json())
      .catch(() => {
        return null;
      })
  );
  const {
    body: { aggregations },
  } = await elasticsearchClient.search({ body: docsCountBody, index });
  let nbDocuments = 0;
  const { buckets = [] } = aggregations.sources;
  for (const { doc_count } of buckets) {
    nbDocuments += doc_count;
  }
  const [nbVisitData, infoData] = await Promise.all(promises);

  if (!nbVisitData && !infoData) {
    ctx.status = 502;
    ctx.body = {};
  } else {
    ctx.body = {
      nbDocuments,
      nbPageViews: infoData.nb_pageviews,
      nbSearches: infoData.nb_searches,
      nbVisits: nbVisitData.value,
    };
  }
});

export default router;
