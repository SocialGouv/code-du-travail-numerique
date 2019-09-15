import getConfig from "next/config";
import memoizee from "memoizee";

import pDebounce from "../lib/pDebounce";

const {
  publicRuntimeConfig: { API_URL, SUGGEST_URL }
} = getConfig();

const fetchResults = endpoint => async (query = "", excludeSources = "") => {
  const url = `${API_URL}/${endpoint}?q=${encodeURIComponent(
    query
  )}&excludeSources=${encodeURIComponent(excludeSources)}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Un problème est survenu.");
  }
  const json = await response.json();
  return json;
};
const searchResults = fetchResults("search");

const suggestResults = async query => {
  const url = `${SUGGEST_URL}?q=${query}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("suggester: Un problème est survenu.");
  }
  return response.json();
};

const suggestMin = query =>
  query.length > 2 ? suggestResults(query) : Promise.resolve([]);

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
