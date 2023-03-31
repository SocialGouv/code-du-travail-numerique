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

// debounce suggestions results
const fetchSuggestResultsDebounced = pDebounce(fetchSuggestResults, 200);

export {
  fetchSearchResults,
  fetchSuggestResultsDebounced as fetchSuggestResults,
};
