const Router = require("koa-router");
const { DOCUMENTS } = require("@socialgouv/cdtn-elasticsearch");

const { API_BASE_URL, CDTN_ADMIN_VERSION } = require("../v1.prefix");
const elasticsearchClient = require("../../conf/elasticsearch.js");

const ES_INDEX_PREFIX = process.env.ES_INDEX_PREFIX || "cdtn";
const index = `${ES_INDEX_PREFIX}-${CDTN_ADMIN_VERSION}_${DOCUMENTS}`;
const docsCountBody = require("./docCount.elastic");

const router = new Router({ prefix: API_BASE_URL });

/**
 * Return document matching the given ID.
 *
 * @example
 * http://localhost:1337/api/v1/docsCount
 *
 * @param {string} :id The item ID to fetch.
 * @returns {Object} Result.
 */
router.get("/docsCount", async (ctx) => {
  const {
    body: { aggregations },
  } = await elasticsearchClient.search({ body: docsCountBody, index });
  ctx.body = { ...aggregations };
});

module.exports = router;
