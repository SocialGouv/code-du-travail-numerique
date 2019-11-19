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
    SOURCES.CONTRIBUTIONS
  ];
  const requestsBody = [
    { index },
    {
      ...getRelatedItemsBody({
        settings,
        sources
      })
    }
  ];
  if (queryVector) {
    requestsBody.push(
      { index },
      { ...getSemBody({ query_vector: queryVector, size: size + 1, sources }) }
    );
  }
  const {
    body: {
      responses: [esResponse, semResponse = []] // since semantic request
    }
  } = await elasticsearchClient.msearch({
    body: requestsBody
  });

  const { hits: { hits: semanticHits } = { hits: [] } } = semResponse;
  const { hits: { hits: fullTextHits } = { hits: [] } } = esResponse;

  const filteredFullTextHits = fullTextHits.filter(
    ({ _source }) => !_source.slug.includes(slug)
  );

  if (!queryVector) {
    return filteredFullTextHits
      .slice(0, MAX_RESULTS)
      .map(({ _source }) => _source);
  }

  const referenceId = settings[0].id;

  return utils
    .mergePipe(
      semanticHits.filter(doc => doc._id !== referenceId),
      filteredFullTextHits,
      MAX_RESULTS
    )
    .map(({ _source }) => _source);
}

module.exports = {
  getRelatedItems
};
