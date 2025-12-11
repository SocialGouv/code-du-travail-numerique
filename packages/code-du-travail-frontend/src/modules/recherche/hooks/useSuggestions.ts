import { useState, useCallback } from "react";
import { fetchSuggestResults } from "../../layout/header/fetchSuggestResults";
import * as Sentry from "@sentry/nextjs";

interface UseSuggestionsReturn {
  suggestions: string[];
  isLoading: boolean;
  fetchSuggestions: (query: string, maxResults?: number) => Promise<string[]>;
  clearSuggestions: () => void;
}

export const useSuggestions = (): UseSuggestionsReturn => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSuggestions = useCallback(
    async (query: string, maxResults?: number): Promise<string[]> => {
      if (!query || query.length < 3) {
        setSuggestions([]);
        return [];
      }

      setIsLoading(true);

      try {
        const results = await fetchSuggestResults(query);
        const slicedResults = maxResults
          ? results.slice(0, maxResults)
          : results;
        setSuggestions(slicedResults);
        return slicedResults;
      } catch (error) {
        Sentry.captureMessage(
          "Échec lors de la récupération des suggestions - " + error
        );
        setSuggestions([]);
        return [];
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const clearSuggestions = useCallback(() => {
    setSuggestions([]);
  }, []);

  return {
    suggestions,
    isLoading,
    fetchSuggestions,
    clearSuggestions,
  };
};
