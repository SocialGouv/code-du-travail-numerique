import { SearchResult } from "src/api/modules/search/service/presearch";

export const fetchSearchResults = async (
  query: string
): Promise<SearchResult[]> => {
  const response = await fetch(`/api/presearch?q=${query}`, {
    // we might want to cache frequent calls ?
    // next: {
    //   revalidate: REVALIDATE_CACHING_TIME,
    // },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch hints");
  }

  return response.json();
};
