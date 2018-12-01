import getConfig from "next/config";
import memoizee from "memoizee";
import pDebounce from "p-debounce";

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

const fetchResults = endpoint => (query = "", excludeSources = "") => {
  const url = `${API_URL}/${endpoint}?q=${encodeURIComponent(
    query
  )}&excludeSources=${encodeURIComponent(excludeSources)}`;
  return fetch(url).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error("Un problème est survenu.");
  });
};
const searchResults = fetchResults("search");
const suggestResults = fetchResults("suggest");

const suggestMin = (query, excludeSources) => {
  if (query.length > 2) {
    return suggestResults(query, excludeSources);
  } else {
    return Promise.resolve({ hits: { hits: [] } });
  }
};

// memoize search results
const searchResultsMemoized = memoizee(searchResults, { promise: true });

// memoize suggestions results
const suggestResultsMemoized = memoizee(suggestMin, { promise: true });

// debounce memoized suggestions results
const suggestResultDebounce = pDebounce(suggestResultsMemoized, 200);

export {
  suggestResultDebounce as suggestResults,
  searchResultsMemoized as searchResults
};
