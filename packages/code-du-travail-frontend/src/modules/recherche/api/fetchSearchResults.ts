import {
  SearchResult,
  PresearchClass,
} from "src/api/modules/search/service/presearch";

export interface FetchSearchResultsResponse {
  results: SearchResult[];
  classes: PresearchClass[];
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
