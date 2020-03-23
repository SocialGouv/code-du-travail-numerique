const Router = require("koa-router");
const API_BASE_URL = require("../v1.prefix");
const fetch = require("node-fetch");
const { startOfDay, subMonths, max, format } = require("date-fns");

const { DOCUMENTS } = require("@cdt/data/indexing/esIndexName");
const elasticsearchClient = require("../../conf/elasticsearch.js");
const docsCountBody = require("../docs-count/docCount.elastic");

const router = new Router({ prefix: API_BASE_URL });

const ES_INDEX_PREFIX = process.env.ES_INDEX_PREFIX || "cdtn";
const index = `${ES_INDEX_PREFIX}_${DOCUMENTS}`;

const MATOMO_SITE_ID = process.env.PIWIK_SITE_ID;
const MATOMO_URL = process.env.PIWIK_URL;
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
      return value.map(value => `${key}[]=${value}`).join("&");
    }
    return `${key}=${value}`;
  });
  return `${baseUrl}?${qs.join("&")}`;
}

// general matomo congif params
const baseParams = {
  idSite: MATOMO_SITE_ID,
  module: "API",
  format: "JSON",
  period: "range",
  date: getDate(new Date()),
};

const methodParams = [
  {
    method: "VisitsSummary.getVisits",
  },
  {
    method: "Actions.get",
  },
  {
    method: "Events.getAction",
    label: ["negative", "positive"], // transform into label[]=
  },
];

router.get("/stats", async ctx => {
  if (!MATOMO_SITE_ID && !MATOMO_URL) {
    ctx.throw(500, `There is no matomo`);
    return;
  }
  const promises = methodParams.map(params =>
    fetch(getUrl(MATOMO_URL, { ...baseParams, ...params })).then(data =>
      data.json(),
    ),
  );
  const {
    body: { aggregations },
  } = await elasticsearchClient.search({ index, body: docsCountBody });
  let nbDocuments = 0;
  const { buckets = [] } = aggregations.sources;
  for (const { doc_count } of buckets) {
    nbDocuments += doc_count;
  }
  const [nbVisitData, infoData, feedbackData] = await Promise.all(promises);
  const positiveFeedback = feedbackData.find(f => f.label === "positive");
  const negativeFeedback = feedbackData.find(f => f.label === "negative");
  ctx.body = {
    nbVisits: nbVisitData.value,
    nbPageViews: infoData.nb_pageviews,
    nbSearches: infoData.nb_searches,
    feedback: {
      positive: positiveFeedback.nb_events,
      negative: negativeFeedback.nb_events,
    },
    nbDocuments,
  };
});

module.exports = router;
