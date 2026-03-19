import { useCallback, useEffect, useState } from "react";
import { fetchSearchResults } from "../api/fetchSearchResults";
import { useSearchTracking } from "../tracking";
import type { SearchResultResponse } from "src/api/modules/search/type";
import { PresearchClass } from "src/api/modules/search/service/types";

type UseSearchResultsReturn = {
  definition: SearchResultResponse["definition"];
  results: SearchResultResponse["results"];
  queryClass: SearchResultResponse["class"];
  lastPresearchQuery?: string;
  isLoading: boolean;
  hasSearched: boolean;
  triggerSearch: (searchQuery?: string) => Promise<void>;
  resetSearch: () => void;
  query: string;
  setQuery: (s: string) => void;
};

export const useSearchResults = (): UseSearchResultsReturn => {
  const [definition, setDefinition] =
    useState<SearchResultResponse["definition"]>(undefined);
  const [results, setResults] = useState<SearchResultResponse["results"]>([]);
  const [queryClass, setQueryClass] = useState<SearchResultResponse["class"]>(
    PresearchClass.UNKNOWN
  );
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
        const {
          results: fetchedResults,
          class: fetchedClass,
          definition: fetchedDefinition,
        } = await fetchSearchResults(queryToUse);
        setDefinition(fetchedDefinition);
        setResults(fetchedResults);
        setQueryClass(fetchedClass);
        setLastPresearchQuery(queryToUse);
        emitPresearchEvent(queryToUse, fetchedClass, definition?.term);
        emitMatomoTrackSiteSearch(queryToUse);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setResults([]);
        setQueryClass(PresearchClass.UNKNOWN);
        setLastPresearchQuery(undefined);
      } finally {
        setIsLoading(false);
      }
    },
    [emitPresearchEvent, emitMatomoTrackSiteSearch, query]
  );

  const resetSearch = useCallback(() => {
    setDefinition(undefined);
    setResults([]);
    setQueryClass(PresearchClass.UNKNOWN);
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
    definition,
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
