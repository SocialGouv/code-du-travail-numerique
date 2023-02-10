import memoizee from "memoizee";
import pDebounce from "p-debounce";
import { API_URL } from "../config";

const fetchSearchResults = async (query = "", excludeSources = "") => {
  const url = `${API_URL}/search?q=${encodeURIComponent(
    query
  )}&excludeSources=${encodeURIComponent(excludeSources)}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Un problème est survenu.");
  }
  return await response.json();
};

const fetchSuggestResults = async (query) => {
  const url = `${API_URL}/suggest?q=${query}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("suggester: Un problème est survenu.");
  }
  return response.json();
};

const suggestMin = (query) =>
  query.length > 2 ? fetchSuggestResults(query) : Promise.resolve([]);

// memoize search results
const fetchSearchResultsMemoized = memoizee(fetchSearchResults, {
  length: 1,
  promise: true, // ensure memoize work for function with es6 default params
});

// memoize suggestions results
const fetchSuggestResultsMemoized = memoizee(suggestMin, {
  length: 1,
  promise: true, // ensure memoize work for function with es6 default params
});

// debounce memoized suggestions results
const fetchSuggestResultsDebounced = pDebounce(
  fetchSuggestResultsMemoized,
  200
);

export {
  fetchSearchResultsMemoized as fetchSearchResults,
  fetchSuggestResultsDebounced as fetchSuggestResults,
};
