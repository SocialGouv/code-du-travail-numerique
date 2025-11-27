import { useState, useEffect } from "react";
import { fetchSearchResults } from "../api/fetchSearchResults";
import { SearchResult } from "src/api/modules/search/service/presearch";

interface UseSearchResultsReturn {
  results: SearchResult[];
  isLoading: boolean;
  hasSearched: boolean;
  triggerSearch: () => Promise<void>;
  resetSearch: () => void;
  query: string;
  setQuery: (s: string) => void;
}

export const useSearchResults = (): UseSearchResultsReturn => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [query, setQuery] = useState("");

  const triggerSearch = async () => {
    setIsLoading(true);
    setHasSearched(true);

    try {
      const results = await fetchSearchResults(query);
      setResults(results);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const resetSearch = () => {
    setResults([]);
    setHasSearched(false);
    setIsLoading(false);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      resetSearch();
    };
  }, []);

  return {
    results,
    isLoading,
    hasSearched,
    triggerSearch,
    resetSearch,
    query,
    setQuery,
  };
};
