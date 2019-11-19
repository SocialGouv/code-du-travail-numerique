const { SOURCES } = require("@cdt/sources");
const { DOCUMENTS } = require("@cdt/data/indexing/esIndexName");

const elasticsearchClient = require("../../conf/elasticsearch.js");
const getSemBody = require("../search/search.sem");
const utils = require("../search/utils");
const getRelatedItemsBody = require("./relatedItems.elastic");

const MAX_RESULTS = 5;

const ES_INDEX_PREFIX = process.env.ES_INDEX_PREFIX || "cdtn";
const index = `${ES_INDEX_PREFIX}_${DOCUMENTS}`;

async function getRelatedItems({ queryVector, settings, slug }) {
  const size = MAX_RESULTS;
  const sources = [
    SOURCES.TOOLS,
    SOURCES.SHEET_SP,
    SOURCES.SHEET_MT,
    SOURCES.LETTERS,
    SOURCES.CONTRIBUTIONS,
    SOURCES.EXTERNALS
  ];

  const requestBodies = [
    { index },
    {
      ...getRelatedItemsBody({
        settings,
        sources
      })
    }
  ];
  if (queryVector) {
    requestBodies.push(
      { index },
      // we +1 the size to remove the document source that should match perfectly for the given vector
      { ...getSemBody({ query_vector: queryVector, size: size + 1, sources }) }
    );
  }
  const {
    body: {
      responses: [esResponse = [], semResponse = []]
    }
  } = await elasticsearchClient.msearch({ body: requestBodies });

  const { hits: { hits: semanticHits } = { hits: [] } } = semResponse;
  const { hits: { hits: fullTextHits } = { hits: [] } } = esResponse;

  return utils
    .mergePipe(semanticHits, fullTextHits, MAX_RESULTS)
    .filter(({ _source }) => !_source.slug.includes(slug))
    .map(({ _source }) => _source);
}

module.exports = {
  getRelatedItems
};
