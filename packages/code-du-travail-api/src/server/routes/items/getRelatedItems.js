const { SOURCES } = require("@cdt/sources");

const elasticsearchClient = require("../../conf/elasticsearch.js");
const getSemBody = require("../search/search.sem");
const utils = require("../search/utils");
const getRelatedItemsBody = require("./relatedItems.elastic");

const MAX_RESULTS = 5;
const index =
  process.env.ELASTICSEARCH_DOCUMENT_INDEX || "code_du_travail_numerique";

async function getRelatedItems({ queryVector, settings, slug }) {
  const size = MAX_RESULTS;
  const sources = [
    SOURCES.TOOLS,
    SOURCES.SHEET_SP,
    SOURCES.SHEET_MT,
    SOURCES.LETTERS,
    SOURCES.CONTRIBUTIONS
  ];
  const {
    body: {
      responses: [esResponse, semResponse]
    }
  } = await elasticsearchClient.msearch({
    body: [
      { index },
      {
        ...getRelatedItemsBody({
          settings,
          size: 10,
          sources
        })
      },
      { index },
      // we +1 the size to remove the document source that should match perfectly for the given vector
      { ...getSemBody({ query_vector: queryVector, size: size + 1, sources }) }
    ]
  });

  const { hits: { hits: semanticHits } = { hits: [] } } = semResponse;
  const { hits: { hits: fullTextHits } = { hits: [] } } = esResponse;

  console.log(JSON.stringify(fullTextHits, null, 2));
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
