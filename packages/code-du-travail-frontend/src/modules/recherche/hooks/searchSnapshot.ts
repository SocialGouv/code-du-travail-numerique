import type { SearchResultResponse } from "src/api/modules/search/type";

export type SearchSnapshotOrigin = "home" | "modal";

export type SearchSnapshotFocusTarget =
  | { kind: "see-all" }
  | { kind: "result"; cdtnId: string };

export type SearchSnapshot = {
  origin: SearchSnapshotOrigin;
  originPath?: string;
  query: string;
  definition?: SearchResultResponse["definition"];
  results: SearchResultResponse["results"];
  queryClass: SearchResultResponse["class"];
  lastPresearchQuery?: string;
  focusTarget: SearchSnapshotFocusTarget;
  savedAt: number;
};

export const SEARCH_SNAPSHOT_STORAGE_KEY = "cdtn:search-back-nav:v1";
export const SEARCH_SNAPSHOT_MAX_AGE_MS = 30 * 60 * 1000;

const getStorage = (): Storage | null => {
  if (typeof window === "undefined") return null;
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
};

export const saveSearchSnapshot = (
  snapshot: Omit<SearchSnapshot, "savedAt">
): void => {
  const storage = getStorage();
  if (!storage) return;
  try {
    const payload: SearchSnapshot = { ...snapshot, savedAt: Date.now() };
    storage.setItem(SEARCH_SNAPSHOT_STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // Swallow: quota exceeded or serialization failure should not break navigation.
  }
};

const parseSnapshot = (raw: string | null): SearchSnapshot | null => {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as SearchSnapshot;
    if (!parsed || typeof parsed.savedAt !== "number") return null;
    if (Date.now() - parsed.savedAt > SEARCH_SNAPSHOT_MAX_AGE_MS) return null;
    return parsed;
  } catch {
    return null;
  }
};

export const peekSearchSnapshot = (): SearchSnapshot | null => {
  const storage = getStorage();
  if (!storage) return null;
  const snapshot = parseSnapshot(storage.getItem(SEARCH_SNAPSHOT_STORAGE_KEY));
  if (!snapshot) {
    // Housekeeping: drop stale payloads.
    storage.removeItem(SEARCH_SNAPSHOT_STORAGE_KEY);
  }
  return snapshot;
};

export const clearSearchSnapshot = (): void => {
  const storage = getStorage();
  if (!storage) return;
  try {
    storage.removeItem(SEARCH_SNAPSHOT_STORAGE_KEY);
  } catch {
    // ignore
  }
};

export const consumeSearchSnapshot = (
  predicate: (snapshot: SearchSnapshot) => boolean
): SearchSnapshot | null => {
  const snapshot = peekSearchSnapshot();
  if (!snapshot) return null;
  if (!predicate(snapshot)) return null;
  clearSearchSnapshot();
  return snapshot;
};
