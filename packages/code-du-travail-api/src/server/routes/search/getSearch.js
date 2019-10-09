const fetch = require("node-fetch");
const { SOURCES } = require("@cdt/sources");

const elasticsearchClient = require("../../conf/elasticsearch.js");
const utils = require("./utils");
const { logger } = require("../../utils/logger");

const getSearchBody = require("./search.elastic");
const getSemBody = require("./search.sem");
const getSavedResult = require("./search.getSavedResult");
const index =
  process.env.ELASTICSEARCH_DOCUMENT_INDEX || "code_du_travail_numerique";
const NLP_URL = process.env.NLP_URL || "http://localhost:5000";

const MAX_RESULTS = 10;

const getSearch = async querystring => {
  const query = querystring.q;
  const excludeSources = (querystring.excludeSources || "").split(",");

  const skipSavedResults =
    Boolean(querystring.skipSavedResults) ||
    querystring.skipSavedResults === "";
  // shortcut ES if we find a known query
  const knownQueryResult =
    !skipSavedResults && (await getSavedResult(query, excludeSources));

  if (knownQueryResult) {
    return knownQueryResult;
  }
  // remove console.log when stavble
  logger.info(
    `querying sem search on: ${NLP_URL}/api/search?q=${encodeURIComponent(
      query
    )}`
  );

  // we filter results to remove snippet document from main results
  const size = Math.min(querystring.size || MAX_RESULTS, 100);

  const query_vector = await fetch(
    `${NLP_URL}/api/search?q=${encodeURIComponent(query)}`
  ).then(response => (response = response.json()));

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

  return results.slice(0, size);
};

module.exports = getSearch;
