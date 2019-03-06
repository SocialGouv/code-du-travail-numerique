const Router = require("koa-router");
const API_BASE_URL = require("../v1.prefix");

const elasticsearchClient = require("../../conf/elasticsearch.js");
const getSearchBody = require("./search.elastic");
const getFacetsBody = require("./facets.elastic");

const index =
  process.env.ELASTICSEARCH_DOCUMENT_INDEX || "code_du_travail_numerique";

const router = new Router({ prefix: API_BASE_URL });

/**
 * Return documents matching the given query.
 *
 * @example
 * http://localhost:1337/api/v1/search?q=incapacité%20travail
 *
 * @param {string} querystring.q A `q` querystring param containing the query to process.
 * @param {string} querystring.excludeSources A `excludeSources` querystring param containing the sources (comma separatied list) to exclude from the results
 * @returns {Object} Results.
 */
router.get("/search", async ctx => {
  const query = ctx.request.query.q;
  const size = Math.min(ctx.request.query.size || 10, 100);

  const excludeSources = (ctx.request.query.excludeSources || "").split(",");

  const body = getSearchBody({ query, size, excludeSources });
  const facetBody = getFacetsBody({ query });

  // query data
  const results = await elasticsearchClient.search({ index, body });
  ctx.body = {
    hits: {
      ...results.hits,
      hits: results.hits.hits.filter(item => item._source.source !== "snippet")
    },
    facets: []
  };
  if (results.aggregations.bySource.buckets.length > 0) {
    const [snippetResults] = results.aggregations.bySource.buckets;
    ctx.body.snippet = snippetResults.bySource.hits.hits[0];
  }

  // facet data
  const facetResults = await elasticsearchClient.search({
    index,
    body: facetBody
  });
  if (facetResults.aggregations.document_count.buckets.length > 0) {
    ctx.body.facets = facetResults.aggregations.document_count.buckets;
  }
});

module.exports = router;
