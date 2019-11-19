const Router = require("koa-router");
const { DOCUMENTS } = require("@cdt/data/indexing/esIndexName");

const API_BASE_URL = require("../v1.prefix");
const elasticsearchClient = require("../../conf/elasticsearch.js");

const ES_INDEX_PREFIX = process.env.ES_INDEX_PREFIX || "cdtn";
const index = `${ES_INDEX_PREFIX}_${DOCUMENTS}`;

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
router.get("/docsCount", async ctx => {
  const {
    body: { aggregations }
  } = await elasticsearchClient.search({
    index,
    body: {
      size: 0,
      aggs: {
        sources: {
          terms: { field: "source" }
        }
      }
    }
  });
  ctx.body = aggregations;
});

module.exports = router;
