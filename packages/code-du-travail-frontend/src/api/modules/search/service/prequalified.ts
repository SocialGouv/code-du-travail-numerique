import { SOURCES } from "@socialgouv/cdtn-utils";
const fuzz = require("fuzzball");
import deburr from "lodash.deburr";
import memoizee from "memoizee";
import { elasticDocumentsIndex, elasticsearchClient } from "../../../utils";

const THRESHOLD = 90;
const NON_FUZZY_TOKENS = new Set(["cdd", "cdi", "csp"]);

// Preprocess query : remove accentuation and
//  non alpha numerical to speed up the lookup.
const preprocess = (q) => {
  return fuzz.full_process(deburr(q.trim()));
};

// We populate the saved queries in an object in order to ease
//  searches and map variant matches with the actual known query.

const prequalifiedQuery = {
  bool: {
    filter: [
      { term: { source: SOURCES.PREQUALIFIED } },
      { term: { isPublished: true } },
    ],
  },
};

async function _getPrequalified() {
  const body = await elasticsearchClient.count({
    body: {
      query: prequalifiedQuery,
    },
    index: elasticDocumentsIndex,
  });
  const count = body.count ?? 10000;

  const response = await elasticsearchClient.search<any>({
    body: {
      query: prequalifiedQuery,
      size: count,
    },
    index: elasticDocumentsIndex,
  });

  if (response.hits.hits.length === 0) {
    return null;
  }

  const knownQueriesSet = response.hits.hits.reduce(
    (queries, { _source: query }) => {
      for (const variant of query.variants) {
        const prepro = preprocess(variant);
        queries[prepro] = query;
      }
      const title = preprocess(query.title);
      queries[title] = query;
      return queries;
    },
    {},
  );

  return {
    allVariants: Object.keys(knownQueriesSet),
    knownQueriesSet,
  };
}

const getPrequalified = memoizee(_getPrequalified, {
  maxAge: 1000 * 5 * 60,
  preFetch: true,
  promise: true,
});

const fuzzOptions = {
  full_process: false,
  limit: 2,
  scorer: fuzz.ratio,
  unsorted: false,
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
export const getPrequalifiedResults = async (query) => {
  const { knownQueriesSet, allVariants } = (await getPrequalified()) as any;

  // allow
  const knownQuery =
    query.length >= 3 && testMatch({ allVariants, knownQueriesSet, query });

  if (knownQuery && knownQuery.refs && knownQuery.refs.length > 0) {
    // get ES results for a known query
    return knownQuery.refs.map((ref) => ({
      _source: ref,
    }));
  }
  return false;
};
