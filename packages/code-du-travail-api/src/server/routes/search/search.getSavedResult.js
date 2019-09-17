const knownQueries = require("@cdt/data...datafiller/prequalified.data.json");
const { getSourceByRoute, SOURCES } = require("@cdt/sources");

const { logger } = require("../../utils/logger");
const getEsReferences = require("./getEsReferences");

const isInternalUrl = url => url.match(/^\//);

// for fake facetting
const getSource = url => {
  if (!isInternalUrl(url)) {
    return SOURCES.EXTERNALS;
  }
  const [, source] = url.split("/");

  return getSourceByRoute(source);
};

// find known query if any
const getSavedResult = async (query, excludeSources = []) => {
  const knownQuery =
    query.length > 5 &&
    knownQueries.find(q => q.variants && q.variants.includes(query.trim()));

  if (knownQuery && knownQuery.refs) {
    // get ES results for a known query
    // apply source filters if any
    // build facets
    logger.info(`getSavedResult: ${knownQuery.title}`);
    const refs = (await getEsReferences(knownQuery.refs)).filter(
      ref => !excludeSources.includes(ref._source.source)
    );
    return {
      hits: {
        hits: refs
      },
      facets: makeFacets(
        knownQuery.refs.map(ref => ({
          _source: { source: getSource(ref.url) }
        }))
      )
    };
  }
};

// builds facets manually
const makeFacets = refs =>
  refs.reduce((a, c) => {
    const source = c._source.source;
    if (!a.find(facet => facet.key === source)) {
      a.push({
        key: source,
        doc_count: 0
      });
    }
    const facet = a.find(facet => facet.key === source);
    facet.doc_count++;
    return a;
  }, []);

module.exports = getSavedResult;
