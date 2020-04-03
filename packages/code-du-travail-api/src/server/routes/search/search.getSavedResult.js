const elasticsearchClient = require("../../conf/elasticsearch.js");
const getPrequalifiedBody = require("./prequalified.elastic");
// const knownQueries = require("@cdt/data...datafiller/prequalified.data.json");
const { DOCUMENTS } = require("@cdt/data/indexing/esIndexName");

const ES_INDEX_PREFIX = process.env.ES_INDEX_PREFIX || "cdtn";
const index = `${ES_INDEX_PREFIX}_${DOCUMENTS}`;

const { logger } = require("../../utils/logger");
const getEsReferences = require("./getEsReferences");
const fuzz = require("fuzzball");
const deburr = require("lodash.deburr");
const memoizee = require("memoizee");

const THRESHOLD = 90;
const NON_FUZZY_TOKENS = new Set(["cdd", "cdi", "csp"]);

// Preprocess query : remove accentuation and
//  non alpha numerical to speed up the lookup.
const preprocess = (q) => {
  return fuzz.full_process(deburr(q.trim()));
};

// We populate the saved queries in an object in order to ease
//  searches and map variant matches with the actual known query.

async function _getPrequalified() {
  const body = getPrequalifiedBody();
  const response = await elasticsearchClient.search({ index, body });
  if (response.body.hits.total.value === 0) {
    return null;
  }

  const knownQueries = response.body.hits.hits[0]._source.data;

  const knownQueriesSet = knownQueries.reduce((queries, query) => {
    for (const variant of query.variants) {
      const prepro = preprocess(variant);
      queries[prepro] = query;
    }
    return queries;
  }, {});

  return {
    knownQueriesSet,
    allVariants: Object.keys(knownQueriesSet),
  };
}

const getPrequalified = memoizee(_getPrequalified, {
  promise: true,
  maxAge: 1000 * 5,
  preFetch: true,
});

const fuzzOptions = {
  scorer: fuzz.ratio,
  full_process: false,
  unsorted: false,
  limit: 2,
};

const testFuzzyAllowed = (query, match) => {
  // don't apply fuzzy matching to specific terms
  const matchingNonFuzz = match
    .split(/\s+/)
    .filter((token) => NON_FUZZY_TOKENS.has(token));

  // if the matching variant contains non-fuzzy tokens,
  // ensure the query also contains it
  const queryTokens = query.split(/\s+/);
  if (matchingNonFuzz.length > 0) {
    return (
      matchingNonFuzz.filter((token) => queryTokens.includes(token)).length > 0
    );
  } else {
    return true;
  }
};

// Test if a given query fuzzy matches with
//  a known one (and variants).
const testMatch = ({ query, knownQueriesSet, allVariants }) => {
  // preprocess query
  const ppQuery = preprocess(query);

  const results = fuzz.extract(ppQuery, allVariants, fuzzOptions);

  if (results && results.length > 1) {
    const closerMatch = results[0][0];
    const bestScore = results[0][1];

    // ensure match is valid
    if (testFuzzyAllowed(query, closerMatch) && bestScore > THRESHOLD) {
      return knownQueriesSet[closerMatch];
    }
  }
};

// find known query if any
const getSavedResult = async (query) => {
  const { knownQueriesSet, allVariants } = await getPrequalified();

  const knownQuery =
    query.length > 3 && testMatch({ query, knownQueriesSet, allVariants });

  if (knownQuery && knownQuery.refs) {
    // get ES results for a known query
    logger.info(`getSavedResult: ${knownQuery.title}`);
    const refs = await getEsReferences(knownQuery.refs);
    return refs;
  }
};

module.exports = getSavedResult;
