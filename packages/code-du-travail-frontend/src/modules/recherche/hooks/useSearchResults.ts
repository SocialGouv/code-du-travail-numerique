import { useState, useEffect, useCallback } from "react";
import { fetchSearchResults } from "../api/fetchSearchResults";
import { useSearchTracking } from "../tracking";
import {
  PresearchClass,
  SearchResult,
} from "src/api/modules/search/service/types";

interface UseSearchResultsReturn {
  results: SearchResult[];
  queryClass?: PresearchClass;
  lastPresearchQuery?: string;
  isLoading: boolean;
  hasSearched: boolean;
  triggerSearch: (searchQuery?: string) => Promise<void>;
  resetSearch: () => void;
  query: string;
  setQuery: (s: string) => void;
}

export const useSearchResults = (): UseSearchResultsReturn => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [queryClass, setQueryClass] = useState<PresearchClass>();
  const [lastPresearchQuery, setLastPresearchQuery] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [query, setQuery] = useState("");

  const { emitPresearchEvent, emitMatomoTrackSiteSearch } = useSearchTracking();

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
        setLastPresearchQuery(queryToUse);
        emitPresearchEvent(queryToUse, fetchedClass);
        emitMatomoTrackSiteSearch(queryToUse);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setResults([]);
        setQueryClass(undefined);
        setLastPresearchQuery(undefined);
      } finally {
        setIsLoading(false);
      }
    },
    [emitPresearchEvent, emitMatomoTrackSiteSearch, query]
  );

  const resetSearch = useCallback(() => {
    setResults([]);
    setQueryClass(undefined);
    setLastPresearchQuery(undefined);
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
    lastPresearchQuery,
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
