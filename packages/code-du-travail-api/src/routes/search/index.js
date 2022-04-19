import elasticsearchClient from "../../conf/elasticsearch";
import { API_BASE_URL, CDTN_ADMIN_VERSION } from "../v1.prefix";

const Router = require("koa-router");
const { SOURCES } = require("@socialgouv/cdtn-sources");
const { DOCUMENTS, vectorizeQuery } = require("@socialgouv/cdtn-elasticsearch");
const getSemBody = require("./search.sem");
const { removeDuplicate } = require("./utils");
const { logger } = require("@socialgouv/cdtn-logger");

const ES_INDEX_PREFIX = process.env.ES_INDEX_PREFIX || "cdtn";
const index = `${ES_INDEX_PREFIX}-${CDTN_ADMIN_VERSION}_${DOCUMENTS}`;

const MAX_RESULTS = 100;
const DEFAULT_RESULTS_NUMBER = 25;
const SEMANTIC_THRESHOLD = 1.11;

const router = new Router({ prefix: API_BASE_URL });

const DOCUMENTS_SEM = "documents_sem";

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

  let documents = [];
  const articles = [];
  const themes = [];

  const searches = {};
  const size = Math.min(ctx.query.size || DEFAULT_RESULTS_NUMBER, MAX_RESULTS);

  const query_vector = await vectorizeQuery(query.toLowerCase()).catch(
    (error) => {
      logger.error(error.message);
    }
  );

  // if not enough prequalified results, we also trigger ES search

  searches[DOCUMENTS_SEM] = [
    { index },
    getSemBody({ query_vector, size, sources }),
  ];

  const results = await msearch({
    client: elasticsearchClient,
    searches,
  });

  const semanticHits = extractHits(results[DOCUMENTS_SEM]);
  semanticHits.forEach((item) => (item._source.algo = "semantic"));

  // we only consider semantic results above a given threshold
  const semanticHitsFiltered = semanticHits.filter(
    (item) => item._score > SEMANTIC_THRESHOLD
  );

  // we merge prequalified + full text + semantic results
  documents.push(...semanticHitsFiltered);
  documents = removeDuplicate(documents);

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

export default router;

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
