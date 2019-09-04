const utils = require("./utils");
const Router = require("koa-router");
const API_BASE_URL = require("../v1.prefix");

const elasticsearchClient = require("../../conf/elasticsearch.js");
const getSearchBody = require("./search.elastic");
const getSavedResult = require("./search.getSavedResult");

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
 * @param {string} querystring.skipSavedResults A `skipSavedResults` querystring param indicates that we skip the savedResults search
 * @returns {Object} Results.
 */
router.get("/search", async ctx => {
  const query = ctx.request.query.q;
  const skipSavedResults =
    Boolean(ctx.request.query.skipSavedResults) ||
    ctx.request.query.skipSavedResults === "";
  const excludeSources = (ctx.request.query.excludeSources || "").split(",");

  // shortcut ES if we find a known query
  const knownQueryResult =
    !skipSavedResults && getSavedResult(query, excludeSources);

  if (knownQueryResult) {
    ctx.body = knownQueryResult;
    return;
  }

  const size = Math.min(ctx.request.query.size || MAX_RESULTS, 100);
  const body = getSearchBody({ query, size, excludeSources });

  // query data

  const [esResults, semResults] = await Promise.all([
    elasticsearchClient.search({ index, body }),
    fetch(
      `${process.env.NLP_URL}:5000/api/search?q=${query}&excludeSources=${excludeSources}`
    ).then(data => data.json())
  ]);

  const semResultWithKey = utils.addKey(semResults.hits.hits);
  const esResultWithKey = utils.addKey(esResults.body.hits.hits);
  const results = utils.merge(semResultWithKey, esResultWithKey, MAX_RESULTS);
  const resultsNoDuplicate = utils.removeDuplicate(results);

  const snippetIndex = esResults.body.hits.hits.findIndex(
    item => item._source.source === "snippet"
  );
  ctx.body = {
    hits: {
      hits: resultsNoDuplicate
        .filter(item => item._source.source !== "snippet")
        .slice(0, size)
    },
    facets: []
  };
  // only add snippet if it's found in the returned results
  if (
    response.body.aggregations.bySource.buckets.length > 0 &&
    snippetIndex > -1 &&
    snippetIndex < size
  ) {
    const [snippetResults] = response.body.aggregations.bySource.buckets;
    ctx.body.snippet = snippetResults.bySource.hits.hits[0];
  }

  ctx.body = response.body.hits.hits;
});

module.exports = router;
