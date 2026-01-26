import { PresearchClass, SearchResult } from "src/api";

export interface FetchSearchResultsResponse {
  results: SearchResult[];
  class: PresearchClass;
}

export const fetchSearchResults = async (
  query: string
): Promise<FetchSearchResultsResponse> => {
  const response = await fetch(`/api/presearch?q=${encodeURIComponent(query)}`);

  if (!response.ok) {
    throw new Error("Failed to fetch presearch results");
  }

  return response.json();
};
