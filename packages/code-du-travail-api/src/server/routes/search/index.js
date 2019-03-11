const Router = require("koa-router");
const API_BASE_URL = require("../v1.prefix");

const elasticsearchClient = require("../../conf/elasticsearch.js");
const getSearchBody = require("./search.elastic");
const getFacetsBody = require("./facets.elastic");
const getKnownQuery = require("./search.prequalified");

const index =
  process.env.ELASTICSEARCH_DOCUMENT_INDEX || "code_du_travail_numerique";

const MAX_RESULTS = 10;

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
  const excludeSources = (ctx.request.query.excludeSources || "").split(",");

  // shortcut ES if we find a known query
  const knownQueryResult = getKnownQuery(query, excludeSources);

  if (knownQueryResult) {
    ctx.body = knownQueryResult;
    return;
  }

  // we add 1 to maxResults in case we have a snippet document in the results
  // we filter results to remove snippet document from main results
  const size = Math.min(ctx.request.query.size || MAX_RESULTS + 1, 100);

  const body = getSearchBody({ query, size, excludeSources });
  const facetBody = getFacetsBody({ query });

  // query data
  const results = await elasticsearchClient.search({ index, body });
  const snippetIndex = results.hits.hits.findIndex(
    item => item._source.source === "snippet"
  );
  ctx.body = {
    hits: {
      ...results.hits,
      hits: results.hits.hits
        .filter(item => item._source.source !== "snippet")
        .slice(0, 10)
    },
    facets: []
  };
  // only add snippet if it's found in the returned results
  if (
    results.aggregations.bySource.buckets.length > 0 &&
    snippetIndex > -1 &&
    snippetIndex < 10
  ) {
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
