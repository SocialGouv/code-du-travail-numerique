const Router = require("koa-router");
const API_BASE_URL = require("../v1.prefix");
const elasticsearchClient = require("../../conf/elasticsearch.js");

const index =
  process.env.ELASTICSEARCH_DOCUMENT_INDEX || "code_du_travail_numerique";

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
    type: index,
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
