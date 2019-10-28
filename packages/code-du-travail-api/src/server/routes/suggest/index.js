const Router = require("koa-router");
const API_BASE_URL = require("../v1.prefix");
const elasticsearchClient = require("../../conf/elasticsearch.js");
const { getSuggestQuery } = require("./suggest.elastic.js");

//const index = process.env.ELASTICSEARCH_SUGGESTION_INDEX || "cdtn_suggestions";
const index = process.env.ELASTICSEARCH_SUGGESTION_INDEX || "suggestions-index";

const router = new Router({ prefix: API_BASE_URL });

/**
 * Return the search suggestion
 *
 * @example
 * http://localhost:1337/api/v1/suggest?q=aba
 *
 * @returns {Object} An object containing the matching theme .
 */
router.get("/suggest", async ctx => {
  const { q = "", size = 5 } = ctx.request.query;

  const body = getSuggestQuery(q, size);
  const response = await elasticsearchClient.search({
    index,
    body
  });
  //TODO Handle minimun length case
  ctx.body = response.body.hits.hits.map(t => t._source.title);
});

module.exports = router;
