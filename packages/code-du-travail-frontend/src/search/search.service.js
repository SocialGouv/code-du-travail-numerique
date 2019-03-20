import getConfig from "next/config";
import memoizee from "memoizee";
import pDebounce from "../lib/pDebounce";

const {
  publicRuntimeConfig: { API_URL, SUGGEST_URL }
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

const suggestResults = query => {
  const url = `${SUGGEST_URL}?q=${query}`;
  return fetch(url).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error("suggester: Un problème est survenu.");
  });
};

const suggestMin = query => {
  if (query.length > 2) {
    return suggestResults(query);
  } else {
    return Promise.resolve([]);
  }
};

// memoize search results
const searchResultsMemoized = memoizee(searchResults, {
  promise: true,
  length: 2 // ensure memoize work for function with es6 default params
});

// memoize suggestions results
const suggestResultsMemoized = memoizee(suggestMin, {
  promise: true,
  length: 1 // ensure memoize work for function with es6 default params
});

// debounce memoized suggestions results
const suggestResultDebounce = pDebounce(suggestResultsMemoized, 200);

export {
  suggestResultDebounce as suggestResults,
  searchResultsMemoized as searchResults
};
