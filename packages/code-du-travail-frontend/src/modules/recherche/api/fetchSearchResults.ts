import { SearchResult } from "src/api/modules/search/service/presearch";

export const fetchSearchResults = async (
  query: string
): Promise<SearchResult[]> => {
  const response = await fetch(`/api/presearch?q=${query}`, {});

  if (!response.ok) {
    throw new Error("Failed to fetch hints");
  }

  return response.json();
};
