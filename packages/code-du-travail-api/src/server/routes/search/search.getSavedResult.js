const knownQueries = require("@cdt/data...datafiller/prequalified.json");

// find known query if any
const getSavedResult = (query, excludeSources = []) => {
  const knownQuery =
    query.length > 5 &&
    knownQueries.find(q => q.variants.includes(query.trim()));

  if (knownQuery) {
    // build an ES result for a known query
    // apply source filters if any
    return knownQuery.refs.filter(
      ref => !excludeSources.includes(ref._source.source)
    );
  }
};

module.exports = getSavedResult;
