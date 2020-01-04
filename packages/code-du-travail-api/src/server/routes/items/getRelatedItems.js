const { SOURCES } = require("@cdt/sources");
const { DOCUMENTS } = require("@cdt/data/indexing/esIndexName");

const elasticsearchClient = require("../../conf/elasticsearch.js");
const fetchWithTimeout = require("../../utils/fetchWithTimeout");
const getSemBody = require("../search/search.sem");
const utils = require("../search/utils");
const getRelatedItemsBody = require("./relatedItems.elastic");
const { logger } = require("../../utils/logger");

const MAX_RESULTS = 5;

const ES_INDEX_PREFIX = process.env.ES_INDEX_PREFIX || "cdtn";
const index = `${ES_INDEX_PREFIX}_${DOCUMENTS}`;

const NLP_URL = process.env.NLP_URL || "http://localhost:5000";

async function getRelatedItems({ title, settings, slug }) {
  const size = MAX_RESULTS;
  const sources = [
    SOURCES.TOOLS,
    SOURCES.SHEET_SP,
    SOURCES.SHEET_MT,
    SOURCES.LETTERS,
    SOURCES.CONTRIBUTIONS,
    SOURCES.EXTERNALS
  ];
  const relatedItemBody = getRelatedItemsBody({ settings, sources });
  const requestBodies = [{ index }, relatedItemBody];
  const query_vector = await fetchWithTimeout(
    `${NLP_URL}/api/search?q=${encodeURIComponent(title)}`
  )
    .then(response => (response = response.json()))
    .catch(error => {
      logger.error(error);
      return [];
    });
  const semBody = getSemBody({
    query_vector,
    // we +1 the size to remove the document source that should match perfectly for the given vector
    size: size + 1,
    sources
  });
  // we use relatedItem query _source to have the same prop returned
  // for both request
  semBody._source = relatedItemBody._source;
  requestBodies.push({ index }, semBody);

  const {
    body: {
      responses: [esResponse = [], semResponse = []]
    }
  } = await elasticsearchClient.msearch({ body: requestBodies });

  const { hits: { hits: semanticHits } = { hits: [] } } = semResponse;
  const { hits: { hits: fullTextHits } = { hits: [] } } = esResponse;

  const [rootSlug] = slug.split("#");

  return utils
    .mergePipe(semanticHits, fullTextHits, MAX_RESULTS)
    .filter(({ _source }) => !_source.slug.startsWith(rootSlug))
    .map(({ _source }) => _source);
}

module.exports = {
  getRelatedItems
};
