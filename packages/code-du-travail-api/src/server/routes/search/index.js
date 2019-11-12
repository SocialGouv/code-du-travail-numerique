const Router = require("koa-router");
const fetch = require("node-fetch");
const { SOURCES } = require("@cdt/sources");

const API_BASE_URL = require("../v1.prefix");

const elasticsearchClient = require("../../conf/elasticsearch.js");
const getSavedResult = require("./search.getSavedResult");
const getSearchBody = require("./search.elastic");
const getSemBody = require("./search.sem");
const getRelatedThemesBody = require("./searchRelatedThemes.elastic");
const getRelatedArticlesBody = require("./searchRelatedArticles.elastic");

const { removeDuplicate, merge, mergePipe } = require("./utils");
const { logger } = require("../../utils/logger");

const index =
  process.env.ELASTICSEARCH_DOCUMENT_INDEX || "code_du_travail_numerique";
const themeIndex = process.env.ELASTICSEARCH_THEME_INDEX || "cdtn_themes";

const NLP_URL = process.env.NLP_URL || "http://localhost:5000";

const MAX_RESULTS = 100;
const DEFAULT_RESULTS_NUMBER = 7;
const THEMES_RESULTS_NUMBER = 5;
const CDT_RESULTS_NUMBER = 5;

const router = new Router({ prefix: API_BASE_URL });

const DOCUMENTS_SEM = "documents_sem";
const DOCUMENTS_ES = "documents_es";
const THEMES_ES = "themes_es";
const THEMES_SEM = "themes_sem";
const CDT_ES = "cdt_es";
/**
 */
/**
 * Return documents matching the given query.
 *
 * @example
 * http://localhost:1337/api/v1/search?q=incapacité%20travail
 *
 * @param {string} querystring.q A `q` querystring param containing the query to process.
 * @param {string} querystring.skipSavedResults A `skipSavedResults` querystring param indicates that we skip the savedResults search
 * @returns {Object} Results.
 */
router.get("/search", async ctx => {
  const { q: query } = ctx.query;

  const sources = [
    SOURCES.SHEET_MT,
    SOURCES.SHEET_SP,
    SOURCES.LETTERS,
    SOURCES.TOOLS,
    SOURCES.CONTRIBUTIONS
  ];
  const skipSavedResults =
    ctx.query.skipSavedResults === "" || ctx.query.skipSavedResults === "true";
  // shortcut ES if we find a known query
  const knownQueryResult = !skipSavedResults && (await getSavedResult(query));
  let documents = [];
  let articles = [];
  let themes = [];

  if (knownQueryResult) {
    documents = knownQueryResult.filter(({ _source: { source } }) =>
      sources.includes(source)
    );
    articles = knownQueryResult.filter(
      ({ _source: { source } }) => source === SOURCES.CDT
    );
    themes = knownQueryResult.filter(
      ({ _source: { source } }) => source === SOURCES.THEMES
    );
  }

  const searches = {};
  const shouldRequestCdt = articles.length < 5;
  const shouldRequestThemes = themes.length < 5;
  const size = Math.min(ctx.query.size || DEFAULT_RESULTS_NUMBER, MAX_RESULTS);
  if (!knownQueryResult || shouldRequestThemes) {
    logger.info(
      `querying sem search on: ${NLP_URL}/api/search?q=${encodeURIComponent(
        query
      )}`
    );
    const query_vector = await fetch(
      `${NLP_URL}/api/search?q=${encodeURIComponent(query)}`
    )
      .then(response => (response = response.json()))
      .catch(error => {
        logger.error(error);
        return [];
      });

    if (!knownQueryResult) {
      searches[DOCUMENTS_ES] = [
        { index },
        getSearchBody({ query, size, sources })
      ];
      searches[DOCUMENTS_SEM] = [
        { index },
        getSemBody({ query_vector, size, sources })
      ];
    }

    if (shouldRequestThemes) {
      const themeNumber = THEMES_RESULTS_NUMBER - themes.length;
      searches[THEMES_ES] = [
        { index: themeIndex }, // we search in themeIndex here to try to match title in breadcrumb
        getRelatedThemesBody({
          query,
          size: themeNumber
        })
      ];
      searches[THEMES_SEM] = [
        { index },
        getSemBody({
          query_vector,
          size: themeNumber,
          sources: [SOURCES.THEMES]
        })
      ];
    }
  }

  if (shouldRequestCdt) {
    const cdtNumber = CDT_RESULTS_NUMBER - articles.length;
    searches[CDT_ES] = [
      { index },
      getRelatedArticlesBody({
        query,
        size: cdtNumber
      })
    ];
  }

  const results = await msearch({
    client: elasticsearchClient,
    searches
  });

  if (!knownQueryResult) {
    const { hits: { hits: fulltextHits } = { hits: [] } } = results[
      DOCUMENTS_ES
    ];
    const { hits: { hits: semanticHits } = { hits: [] } } = results[
      DOCUMENTS_SEM
    ];
    documents = mergePipe(semanticHits, fulltextHits, size);
  }
  if (shouldRequestThemes) {
    const { hits: { hits: fulltextHits } = { hits: [] } } = results[THEMES_ES];
    const { hits: { hits: semanticHits } = { hits: [] } } = results[THEMES_SEM];
    themes = removeDuplicate(
      themes
        .concat(merge(fulltextHits, semanticHits, THEMES_RESULTS_NUMBER * 2))
        .slice(0, THEMES_RESULTS_NUMBER)
    );
  }
  if (shouldRequestCdt) {
    articles = removeDuplicate(articles.concat(results[CDT_ES].hits.hits));
  }

  logger.info(`search: ${query} took ${results.took}ms`);

  ctx.body = {
    documents: documents.map(({ _source }) => _source),
    articles: articles.map(({ _source }) => _source),
    // we add source prop since some result might come from dedicataed themes index
    // wich has no source prop
    themes: themes.map(({ _source }) => ({
      ..._source,
      source: SOURCES.THEMES
    }))
  };
});

module.exports = router;

async function msearch({ client, searches }) {
  const requests = [];
  const keys = [];

  // return an empty object if we receive an empty object
  if (Object.keys(searches).length === 0) {
    return {};
  }

  for (const [key, [index, query]] of Object.entries(searches)) {
    requests.push(index, query);
    keys.push(key);
  }

  const { body, error } = await client.msearch({ body: requests });

  if (error) {
    throw error;
  }

  const results = keys.reduce((state, key, index) => {
    state[key] = body.responses[index];
    return state;
  }, {});

  results.took = body.took;

  return results;
}
