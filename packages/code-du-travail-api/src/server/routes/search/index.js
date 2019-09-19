const Router = require("koa-router");
const fetch = require("node-fetch");

const elasticsearchClient = require("../../conf/elasticsearch.js");
const API_BASE_URL = require("../v1.prefix");
const utils = require("./utils");
const getSearchBody = require("./search.elastic");
const getSavedResult = require("./search.getSavedResult");

const index =
  process.env.ELASTICSEARCH_DOCUMENT_INDEX || "code_du_travail_numerique";
const NLP_URL = process.env.NLP_URL || "http://localhost:5000";

const MAX_RESULTS = 10;
const MAX_TIMEOUT = 2000;
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
  // remove console.log when stavble
  console.log(
    `querying sem search on: ${NLP_URL}/api/search?q=${query}&excludeSources=${excludeSources}`
  );

  // we filter results to remove snippet document from main results
  const size = Math.min(ctx.request.query.size || MAX_RESULTS, 100);
  const body = getSearchBody({
    query,
    size: size,
    excludeSources
  });

  const pTimeout = (promise, timeout) =>
    new Promise((resolve, reject) => {
      setTimeout(() => reject("max timeout elapsed"), timeout);
      promise.then(resolve, reject);
    });

  const esResponse = pTimeout(
    elasticsearchClient.search({ index, size, body }),
    MAX_TIMEOUT
  ).catch(err => {
    console.error("es", err);
    return { body: { hits: { hits: [] } } };
  });

  const semResponse = pTimeout(
    fetch(
      `${NLP_URL}/api/search?q=${query}&excludeSources=${excludeSources}&size=${size}`
    ).then(response => response.json()),
    MAX_TIMEOUT
  ).catch(err => {
    console.error("nlp", err);
    return { hits: { hits: [] } };
  });

  const [esResults, semResults] = await Promise.all([esResponse, semResponse]);
  const results = utils.mergePipe(
    semResults.hits.hits,
    esResults.body.hits.hits,
    MAX_RESULTS
  );

  ctx.body = results.slice(0, size);
});

module.exports = router;
