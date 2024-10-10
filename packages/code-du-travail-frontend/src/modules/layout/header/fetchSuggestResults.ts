import pDebounce from "p-debounce";
import { SITE_URL, SUGGEST_DEBOUNCE_DELAY } from "../../../config";

const fetchSuggestResultsWithoutDebounce = async (
  query
): Promise<Array<string>> => {
  const url = `${SITE_URL}/api/suggest?q=${query}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("suggester: Un problème est survenu.");
  }
  return response.json();
};

export const fetchSuggestResults = pDebounce(
  fetchSuggestResultsWithoutDebounce,
  SUGGEST_DEBOUNCE_DELAY
);
