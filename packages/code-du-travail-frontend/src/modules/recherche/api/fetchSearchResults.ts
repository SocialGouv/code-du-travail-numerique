import { SearchResult } from "src/api/modules/search/service/presearch";

export const fetchSearchResults = async (
  query: string
): Promise<SearchResult[]> => {
  const response = await fetch(`/api/presearch?q=${encodeURIComponent(query)}`);

  if (!response.ok) {
    throw new Error("Failed to fetch presearch results");
  }

  return response.json().then((r) => r.results);
};
