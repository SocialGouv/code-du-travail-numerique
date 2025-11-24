import { useState, useEffect } from "react";
import { SearchResult } from "../modal/types";
import { fetchSearchResults } from "../api/fetchSearchResults";

interface UseSearchResultsReturn {
  results: SearchResult[];
  isLoading: boolean;
  hasSearched: boolean;
  triggerSearch: () => Promise<void>;
  resetSearch: () => void;
}

export const useSearchResults = (): UseSearchResultsReturn => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const triggerSearch = async () => {
    setIsLoading(true);
    setHasSearched(true);

    try {
      const mockResults = await fetchSearchResults();
      setResults(mockResults);
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
  };
};
