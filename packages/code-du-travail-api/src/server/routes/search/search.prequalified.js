const knownQueries = require("@cdt/data...datafiller/prequalified.json");

// find known query if any
const getKnownQuery = (query, excludeSources = []) => {
  const knownQuery =
    query.length > 5 && knownQueries.find(q => q.variants.includes(query));

  if (knownQuery) {
    // build an ES result for a known query
    // apply source filters if any
    // build facets
    return {
      hits: {
        hits: knownQuery.refs.filter(
          ref =>
            !excludeSources.length ||
            excludeSources.indexOf(ref._source.source) === -1
        )
      },
      facets: makeFacets(knownQuery.refs)
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

module.exports = getKnownQuery;
