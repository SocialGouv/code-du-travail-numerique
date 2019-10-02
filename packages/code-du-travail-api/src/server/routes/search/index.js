const Router = require("koa-router");
const fetch = require("node-fetch");
const { SOURCES } = require("@cdt/sources");

const elasticsearchClient = require("../../conf/elasticsearch.js");
const API_BASE_URL = require("../v1.prefix");
const utils = require("./utils");
const { logger } = require("../../utils/logger");

const getSearchBody = require("./search.elastic");
const getSemBody = require("./search.sem");
const getSavedResult = require("./search.getSavedResult");
const index =
  process.env.ELASTICSEARCH_DOCUMENT_INDEX || "code_du_travail_numerique";
const NLP_URL = process.env.NLP_URL || "http://localhost:5000";

const MAX_RESULTS = 10;
const router = new Router({ prefix: API_BASE_URL });

/**
 */
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
  const excludeSources = (ctx.request.query.excludeSources || "").split(",");

  const skipSavedResults =
    Boolean(ctx.request.query.skipSavedResults) ||
    ctx.request.query.skipSavedResults === "";
  // shortcut ES if we find a known query
  const knownQueryResult =
    !skipSavedResults && (await getSavedResult(query, excludeSources));

  if (knownQueryResult) {
    ctx.body = knownQueryResult;
    return;
  }
  // remove console.log when stavble
  logger.info(`querying sem search on: ${NLP_URL}/api/search?q=${query}`);

  // we filter results to remove snippet document from main results
  const size = Math.min(ctx.request.query.size || MAX_RESULTS, 100);

  const query_vector = await fetch(`${NLP_URL}/api/search?q=${query}`).then(
    response => (response = response.json())
  );

  const semSources = [
    SOURCES.SHEET_MT,
    SOURCES.SHEET_SP,
    SOURCES.LETTERS,
    SOURCES.TOOLS,
    SOURCES.THEMES
  ];
  const {
    body: {
      responses: [esResponse, semResponse]
    }
  } = await elasticsearchClient.msearch({
    body: [
      { index },
      { ...getSearchBody({ query, size, excludeSources }) },
      { index },
      { ...getSemBody({ query_vector, size, sources: semSources }) }
    ]
  });

  const { hits: { hits: semanticHits } = { hits: [] } } = semResponse;
  const { hits: { hits: bem25Hits } = { hits: [] } } = esResponse;

  const results = utils.mergePipe(semanticHits, bem25Hits, MAX_RESULTS);

  ctx.body = results.slice(0, size);
});

module.exports = router;
