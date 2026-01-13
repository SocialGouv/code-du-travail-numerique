import { useState, useEffect, useCallback } from "react";
import { fetchSearchResults } from "../api/fetchSearchResults";
import { PresearchClass } from "src/api/modules/search/service/presearch";
import { useSearchTracking } from "../tracking";
import { SearchResult } from "src/api/modules/search/service/search";

interface UseSearchResultsReturn {
  results: SearchResult[];
  classes: PresearchClass[];
  isLoading: boolean;
  hasSearched: boolean;
  triggerSearch: (searchQuery?: string) => Promise<void>;
  resetSearch: () => void;
  query: string;
  setQuery: (s: string) => void;
}

export const useSearchResults = (): UseSearchResultsReturn => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [classes, setClasses] = useState<PresearchClass[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [query, setQuery] = useState("");

  const { emitPresearchEvent } = useSearchTracking();

  const triggerSearch = useCallback(
    async (searchQuery?: string) => {
      const queryToUse = searchQuery ?? query;
      setIsLoading(true);
      setHasSearched(true);

      try {
        const { results: fetchedResults, classes: fetchedClasses } =
          await fetchSearchResults(queryToUse);
        setResults(fetchedResults);
        setClasses(fetchedClasses);
        emitPresearchEvent(queryToUse, fetchedClasses);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setResults([]);
        setClasses([]);
      } finally {
        setIsLoading(false);
      }
    },
    [emitPresearchEvent, query]
  );

  const resetSearch = useCallback(() => {
    setResults([]);
    setClasses([]);
    setHasSearched(false);
    setIsLoading(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      resetSearch();
    };
  }, [resetSearch]);

  return {
    results,
    classes,
    isLoading,
    hasSearched,
    triggerSearch,
    resetSearch,
    query,
    setQuery,
  };
};

// keep hooks stable reference types
useSearchResults.displayName = "useSearchResults";
