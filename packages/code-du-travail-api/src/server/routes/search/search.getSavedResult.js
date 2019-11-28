const knownQueries = require("@cdt/data...datafiller/prequalified.data.json");

const { logger } = require("../../utils/logger");
const getEsReferences = require("./getEsReferences");
const fuzz = require("fuzzball");
const deburr = require("lodash.deburr");

const threshold = 90;

// Preprocess query : remove accentuation and
//  non alpha numerical to speed up the lookup.
const preprocess = q => {
  return fuzz.full_process(deburr(q.trim()));
};

// We populate the saved queries in an object in order to ease
//  searches and map variant matches with the actual known query.
const knownQueriesSet = knownQueries.reduce((queries, query) => {
  for (const variant of query.variants) {
    const prepro = preprocess(variant);
    queries[prepro] = query;
  }
  return queries;
});

const allVariants = Object.keys(knownQueriesSet);

const fuzzOptions = {
  scorer: fuzz.ratio,
  full_process: false,
  unsorted: false,
  limit: 2
};

// Test if a given query fuzzy matches with
//  a known one (and variants).
const testMatch = query => {
  // preprocess query
  const ppQuery = preprocess(query);

  const results = fuzz.extract(ppQuery, allVariants, fuzzOptions);

  if (results && results.length > 1) {
    const closerMatch = results[0][0];
    const bestScore = results[0][1];

    if (bestScore > threshold) {
      return knownQueriesSet[closerMatch];
    }
  }
};

// find known query if any
const getSavedResult = async query => {
  const knownQuery = query.length > 5 && testMatch(query);

  if (knownQuery && knownQuery.refs) {
    // get ES results for a known query
    logger.info(`getSavedResult: ${knownQuery.title}`);
    const refs = await getEsReferences(knownQuery.refs);
    return refs;
  }
};

module.exports = getSavedResult;
