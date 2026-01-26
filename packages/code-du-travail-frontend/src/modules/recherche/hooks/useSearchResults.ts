import { useState, useEffect, useCallback } from "react";
import { fetchSearchResults } from "../api/fetchSearchResults";
import { useSearchTracking } from "../tracking";
import {
  PresearchClass,
  SearchResult,
} from "src/api/modules/search/service/types";

interface UseSearchResultsReturn {
  results: SearchResult[];
  queryClass: PresearchClass;
  isLoading: boolean;
  hasSearched: boolean;
  triggerSearch: (searchQuery?: string) => Promise<void>;
  resetSearch: () => void;
  query: string;
  setQuery: (s: string) => void;
}

export const useSearchResults = (): UseSearchResultsReturn => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [queryClass, setQueryClass] = useState<PresearchClass>(
    PresearchClass.UNKNOWN
  );
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
        const { results: fetchedResults, class: fetchedClass } =
          await fetchSearchResults(queryToUse);
        setResults(fetchedResults);
        setQueryClass(fetchedClass);
        emitPresearchEvent(queryToUse, fetchedClass);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setResults([]);
        setQueryClass(PresearchClass.UNKNOWN);
      } finally {
        setIsLoading(false);
      }
    },
    [emitPresearchEvent, query]
  );

  const resetSearch = useCallback(() => {
    setResults([]);
    setQueryClass(PresearchClass.UNKNOWN);
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
    queryClass,
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
