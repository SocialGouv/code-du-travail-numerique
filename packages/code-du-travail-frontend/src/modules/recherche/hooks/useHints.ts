import { useSyncExternalStore } from "react";
import { HintsData, ModalLink } from "../modal/types";
import { fetchHints } from "../api/fetchHints";

// Hints older than this are refreshed in the background on the next opening.
export const HINTS_REVALIDATE_AFTER_MS = 60 * 1000;

type HintsState = {
  data?: HintsData;
  fetchedAt: number;
  isLoading: boolean;
  error: Error | null;
};

const INITIAL_STATE: HintsState = {
  fetchedAt: 0,
  isLoading: false,
  error: null,
};

// Shared by every component and kept across modal openings and client-side
// navigations: the hints are only fetched once, then refreshed when stale.
let state = INITIAL_STATE;
let inflight: Promise<void> | undefined;
const listeners = new Set<() => void>();

const setState = (patch: Partial<HintsState>) => {
  state = { ...state, ...patch };
  listeners.forEach((listener) => listener());
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

/**
 * Stale-while-revalidate: known hints stay displayed (no loader) while fresh
 * ones are fetched in the background, at most once per
 * `HINTS_REVALIDATE_AFTER_MS` and never twice at the same time.
 */
export const revalidateHints = (): Promise<void> => {
  if (inflight) return inflight;
  if (state.data && Date.now() - state.fetchedAt < HINTS_REVALIDATE_AFTER_MS) {
    return Promise.resolve();
  }

  setState({ isLoading: !state.data, error: null });
  inflight = fetchHints()
    .then((data) => {
      setState({ data, fetchedAt: Date.now(), isLoading: false });
    })
    .catch((err) => {
      const error =
        err instanceof Error ? err : new Error("Failed to fetch hints");
      console.error("Error fetching hints:", error);
      // Known hints are kept: an error must not empty the list.
      setState({ isLoading: false, error });
    })
    .finally(() => {
      inflight = undefined;
    });
  return inflight;
};

export const resetHintsCache = () => {
  inflight = undefined;
  setState(INITIAL_STATE);
};

const EMPTY: ModalLink[] = [];

interface UseHintsReturn {
  actualites: ModalLink[];
  suggestions: ModalLink[];
  isLoading: boolean;
  hasFetched: boolean;
  error: Error | null;
  fetchHintsData: () => Promise<void>;
}

export const useHints = (): UseHintsReturn => {
  const { data, isLoading, error } = useSyncExternalStore(
    subscribe,
    () => state,
    () => INITIAL_STATE
  );

  return {
    actualites: data?.actualites ?? EMPTY,
    suggestions: data?.suggestions ?? EMPTY,
    isLoading,
    hasFetched: data !== undefined,
    error,
    fetchHintsData: revalidateHints,
  };
};
