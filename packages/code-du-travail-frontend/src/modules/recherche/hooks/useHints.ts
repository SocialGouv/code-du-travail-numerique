import { useState, useEffect, useCallback } from "react";
import { HintsData, ModalLink } from "../modal/types";
import { fetchHints } from "../api/fetchHints";

interface UseHintsReturn {
  actualites: ModalLink[];
  suggestions: ModalLink[];
  isLoading: boolean;
  hasFetched: boolean;
  error: Error | null;
  fetchHintsData: () => Promise<void>;
  resetHints: () => void;
}

export const useHints = (): UseHintsReturn => {
  const [actualites, setActualites] = useState<ModalLink[]>([]);
  const [suggestions, setSuggestions] = useState<ModalLink[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchHintsData = useCallback(async () => {
    if (hasFetched) return;

    setIsLoading(true);
    setError(null);

    try {
      const hintsData: HintsData = await fetchHints();
      setActualites(hintsData.actualites);
      setSuggestions(hintsData.suggestions);
      setHasFetched(true);
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Failed to fetch hints");
      console.error("Error fetching hints:", error);
      setError(error);
      setActualites([]);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, [hasFetched]);

  const resetHints = useCallback(() => {
    setActualites([]);
    setSuggestions([]);
    setHasFetched(false);
    setIsLoading(false);
    setError(null);
  }, []);

  useEffect(() => {
    return () => {
      resetHints();
    };
  }, [resetHints]);

  return {
    actualites,
    suggestions,
    isLoading,
    hasFetched,
    error,
    fetchHintsData,
    resetHints,
  };
};
