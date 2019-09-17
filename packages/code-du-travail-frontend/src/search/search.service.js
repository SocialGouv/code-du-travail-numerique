import getConfig from "next/config";
import memoizee from "memoizee";
import pDebounce from "../lib/pDebounce";

const {
  publicRuntimeConfig: { API_URL, SUGGEST_URL }
} = getConfig();

const fetchSearchResults = async ({ query = "", excludeSources = "" }) => {
  const url = `${API_URL}/search?q=${encodeURIComponent(
    query
  )}&excludeSources=${encodeURIComponent(excludeSources)}`;
  const response = await fetch(url);
  if (!response.ok) {
    return { statusCode: response.status };
  }
  const json = await response.json();
  return json;
};

const fetchSuggestResults = async query => {
  const url = `${SUGGEST_URL}?q=${query}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("suggester: Un problème est survenu.");
  }
  return response.json();
};

const suggestMin = query =>
  query.length > 2 ? fetchSuggestResults(query) : Promise.resolve([]);

// memoize search results
const fetchSearchResultsMemoized = memoizee(fetchSearchResults, {
  promise: true,
  // make sure the params get serialized correctly so memoize works well
  normalizer: function(args) {
    return JSON.stringify(args[0]);
  },
  length: 1 // ensure memoize work for function with es6 default params
});

// memoize suggestions results
const fetchSuggestResultsMemoized = memoizee(suggestMin, {
  promise: true,
  length: 1 // ensure memoize work for function with es6 default params
});

// debounce memoized suggestions results
const fetchSuggestResultsDebounced = pDebounce(
  fetchSuggestResultsMemoized,
  200
);

export {
  fetchSuggestResultsDebounced as fetchSuggestResults,
  fetchSearchResultsMemoized as fetchSearchResults
};
