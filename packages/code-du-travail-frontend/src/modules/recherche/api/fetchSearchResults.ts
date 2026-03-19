import { SearchResultResponse } from "../../../api/modules/search/type";

export const fetchSearchResults = async (
  query: string
): Promise<SearchResultResponse> => {
  const response = await fetch(`/api/presearch?q=${encodeURIComponent(query)}`);

  if (!response.ok) {
    throw new Error("Failed to fetch presearch results");
  }

  return response.json();
};
