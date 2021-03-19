const Router = require("koa-router");
const { SOURCES } = require("@socialgouv/cdtn-sources");
const { DOCUMENTS, vectorizeQuery } = require("@socialgouv/cdtn-elasticsearch");

const API_BASE_URL = require("../v1.prefix");
const elasticsearchClient = require("../../conf/elasticsearch.js");
const getSavedResult = require("./search.getSavedResult");
const getSearchBody = require("./search.elastic");
const getSemBody = require("./search.sem");
const getRelatedThemesBody = require("./searchRelatedThemes.elastic");
const getRelatedArticlesBody = require("./searchRelatedArticles.elastic");
const { removeDuplicate, merge, mergePipe } = require("./utils");
const { logger } = require("../../utils/logger");

const ES_INDEX_PREFIX = process.env.ES_INDEX_PREFIX || "cdtn";
const index = `${ES_INDEX_PREFIX}_${DOCUMENTS}`;

const MAX_RESULTS = 100;
const DEFAULT_RESULTS_NUMBER = 25;
const THEMES_RESULTS_NUMBER = 5;
const CDT_RESULTS_NUMBER = 5;
const SEMANTIC_THRESHOLD = 1.11;

const router = new Router({ prefix: API_BASE_URL });

const DOCUMENTS_SEM = "documents_sem";
const DOCUMENTS_ES = "documents_es";
const THEMES_ES = "themes_es";
const THEMES_SEM = "themes_sem";
const CDT_ES = "cdt_es";

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
router.get("/search", async (ctx) => {
  const { q: query } = ctx.query;

  const sources = [
    SOURCES.SHEET_MT,
    SOURCES.SHEET_SP,
    SOURCES.LETTERS,
    SOURCES.TOOLS,
    SOURCES.CONTRIBUTIONS,
    SOURCES.EXTERNALS,
    SOURCES.THEMATIC_FILES,
    SOURCES.EDITORIAL_CONTENT,
    SOURCES.CCN,
  ];
  const skipSavedResults =
    ctx.query.skipSavedResults === "" || ctx.query.skipSavedResults === "true";
  // shortcut ES if we find a known query
  const knownQueryResult = !skipSavedResults && (await getSavedResult(query));
  let documents = [];
  let articles = [];
  let themes = [];
  if (knownQueryResult) {
    knownQueryResult.forEach((item) => (item._source.algo = "pre-qualified"));
    documents = knownQueryResult.filter(
      ({ _source: { source } }) =>
        ![SOURCES.CDT, SOURCES.THEMES].includes(source)
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
    const query_vector = await vectorizeQuery(query.toLowerCase()).catch(
      (error) => {
        logger.error(error.message);
      }
    );

    if (!knownQueryResult) {
      searches[DOCUMENTS_ES] = [
        { index },
        getSearchBody({ query, size, sources }),
      ];
      if (query_vector) {
        searches[DOCUMENTS_SEM] = [
          { index },
          getSemBody({ query_vector, size, sources }),
        ];
      }
    }

    if (shouldRequestThemes) {
      const themeNumber = THEMES_RESULTS_NUMBER - themes.length;
      searches[THEMES_ES] = [
        { index }, // we search in themeIndex here to try to match title in breadcrumb
        getRelatedThemesBody({
          query,
          size: themeNumber,
        }),
      ];
      if (query_vector) {
        searches[THEMES_SEM] = [
          { index },
          getSemBody({
            query_vector,
            size: themeNumber,
            sources: [SOURCES.THEMES],
          }),
        ];
      }
    }
  }

  if (shouldRequestCdt) {
    const cdtNumber = CDT_RESULTS_NUMBER - articles.length;
    searches[CDT_ES] = [
      { index },
      getRelatedArticlesBody({
        query,
        size: cdtNumber,
      }),
    ];
  }

  const results = await msearch({
    client: elasticsearchClient,
    searches,
  });

  if (!knownQueryResult) {
    const fulltextHits = extractHits(results[DOCUMENTS_ES]);
    const semanticHits = extractHits(results[DOCUMENTS_SEM]);

    fulltextHits.forEach((item) => (item._source.algo = "fulltext"));
    semanticHits.forEach((item) => (item._source.algo = "semantic"));

    // we only consider semantic results above a given threshold
    const semanticHitsFiltered = semanticHits.filter(
      (item) => item._score > SEMANTIC_THRESHOLD
    );
    semanticHitsFiltered.forEach((item) => (item._source.algo = "semantic"));
    documents = mergePipe(fulltextHits, semanticHitsFiltered, size);
  }
  if (shouldRequestThemes) {
    const fulltextHits = extractHits(results[THEMES_ES]);
    const semanticHits = extractHits(results[THEMES_SEM]);
    fulltextHits.forEach((item) => (item._source.algo = "fulltext"));
    semanticHits.forEach((item) => (item._source.algo = "semantic"));
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
    articles: articles.map(({ _score, _source }) => ({ _score, ..._source })),
    documents: documents.map(({ _score, _source }) => ({ _score, ..._source })),
    // we add source prop since some result might come from dedicataed themes index
    // wich has no source prop
    themes: themes.map(({ _score, _source }) => ({
      _score,
      ..._source,
      source: SOURCES.THEMES,
    })),
  };
});

module.exports = router;

function extractHits(response) {
  if (response && response.hits) {
    return response.hits.hits;
  }
  return [];
}

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
    const resp = body.responses[index];

    if (resp.error) {
      logger.error(
        `Elastic search error : index ${index}, search key ${key} : ${JSON.stringify(
          resp.error,
          null,
          2
        )}`
      );
    }

    state[key] = resp;
    return state;
  }, {});

  results.took = body.took;

  return results;
}
