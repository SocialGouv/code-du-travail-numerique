import pDebounce from "p-debounce";
import { SITE_URL } from "../config";

const fetchSearchResults = async (query = "", excludeSources = "") => {
  const url = `${SITE_URL}/api/search?q=${encodeURIComponent(
    query
  )}&excludeSources=${encodeURIComponent(excludeSources)}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Un problème est survenu.");
  }
  return await response.json();
};

const fetchSuggestResults = async (query) => {
  const url = `${SITE_URL}/api/suggest?q=${query}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("suggester: Un problème est survenu.");
  }
  return response.json();
};

// debounce suggestions results
const fetchSuggestResultsDebounced = pDebounce(fetchSuggestResults, 200);

export {
  fetchSearchResults,
  fetchSuggestResultsDebounced as fetchSuggestResults,
};
