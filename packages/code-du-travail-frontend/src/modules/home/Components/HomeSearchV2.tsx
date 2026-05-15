"use client";

import React, { useRef, useState, useEffect } from "react";
import { css } from "@styled-system/css";
import {
  SearchInput,
  ModalSearchHandle,
} from "../../recherche/modal/SearchInput";
import { SearchResults } from "../../recherche/modal/SearchResults";
import { useSearchResults } from "../../recherche/hooks/useSearchResults";
import { PresearchClass, SearchResult } from "src/api";
import {
  consumeSearchSnapshot,
  saveSearchSnapshot,
  SearchSnapshot,
  SearchSnapshotFocusTarget,
} from "../../recherche/hooks/searchSnapshot";

const HOME_SEE_ALL_BUTTON_ID = "search-see-all-button-home";
const homeResultCardId = (cdtnId: string) =>
  `search-result-card-home-${cdtnId}`;

export const HomeSearchV2 = () => {
  const searchRef = useRef<ModalSearchHandle>(null);
  const resultsTitleRef = useRef<HTMLHeadingElement | null>(null);
  const noResultMessageRef = useRef<HTMLParagraphElement>(null);
  const restoredSnapshotRef = useRef<SearchSnapshot | null | undefined>(
    undefined
  );
  const [pendingFocus, setPendingFocus] = useState(false);
  const [initialQuery, setInitialQuery] = useState<string | undefined>();
  const [pendingRestoreFocus, setPendingRestoreFocus] =
    useState<SearchSnapshotFocusTarget | null>(null);
  const {
    definition,
    results,
    queryClass,
    lastPresearchQuery,
    isLoading,
    hasSearched,
    triggerSearch,
    resetSearch,
    hydrate,
    setQuery,
  } = useSearchResults();

  const handleFocusRequest = () => {
    setPendingFocus(true);
  };

  // Restore snapshot on mount (back navigation into the home page).
  // The ref caches the consumed snapshot so React StrictMode's simulated
  // unmount-remount (which fires the useSearchResults cleanup in between)
  // re-hydrates from the same payload instead of seeing an empty storage.
  useEffect(() => {
    if (restoredSnapshotRef.current === undefined) {
      restoredSnapshotRef.current =
        consumeSearchSnapshot(
          (s) => s.origin === "home" && s.results.length > 0
        ) ?? null;
    }
    const snapshot = restoredSnapshotRef.current;
    if (!snapshot) return;

    hydrate({
      query: snapshot.query,
      definition: snapshot.definition,
      results: snapshot.results,
      queryClass: snapshot.queryClass,
      lastPresearchQuery: snapshot.lastPresearchQuery,
    });
    setInitialQuery(snapshot.query);
    setPendingRestoreFocus(snapshot.focusTarget);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Move focus to the previously-selected target after restored content has rendered.
  useEffect(() => {
    if (!pendingRestoreFocus) return;
    if (!hasSearched || isLoading) return;

    const focusTimer = window.setTimeout(() => {
      const target =
        pendingRestoreFocus.kind === "see-all"
          ? document.getElementById(HOME_SEE_ALL_BUTTON_ID)
          : document.getElementById(
              homeResultCardId(pendingRestoreFocus.cdtnId)
            );
      target?.focus();
      setPendingRestoreFocus(null);
    }, 150);

    return () => window.clearTimeout(focusTimer);
  }, [pendingRestoreFocus, hasSearched, isLoading, results.length]);

  // Handle focus after a fresh (non-restored) search completes.
  useEffect(() => {
    if (pendingRestoreFocus) return;
    if (pendingFocus && hasSearched && !isLoading) {
      setPendingFocus(false);
      if (results.length > 0) {
        setTimeout(() => {
          resultsTitleRef.current?.focus();
        }, 100);
      } else {
        setTimeout(() => {
          if (noResultMessageRef.current) {
            noResultMessageRef.current.focus();
          } else {
            searchRef.current?.focusInput();
          }
        }, 100);
      }
    }
  }, [
    pendingFocus,
    hasSearched,
    isLoading,
    results.length,
    pendingRestoreFocus,
  ]);

  const buildSnapshotBase = (normalizedQuery: string) => ({
    origin: "home" as const,
    query: normalizedQuery,
    definition,
    results,
    queryClass,
    lastPresearchQuery,
  });

  const handleBeforeSeeAllNavigation = (normalizedQuery: string) => {
    if (results.length === 0) return;
    saveSearchSnapshot({
      ...buildSnapshotBase(normalizedQuery),
      focusTarget: { kind: "see-all" },
    });
  };

  const handleResultClick = (result: SearchResult) => {
    if (!result.cdtnId) return;
    saveSearchSnapshot({
      ...buildSnapshotBase(lastPresearchQuery ?? ""),
      focusTarget: { kind: "result", cdtnId: result.cdtnId },
    });
  };

  return (
    <div className={containerStyle}>
      <SearchInput
        key={`home-${initialQuery ?? "__fresh__"}`}
        ref={searchRef}
        onSearchTriggered={triggerSearch}
        onQueryClear={resetSearch}
        isLoadingResults={isLoading}
        onChangeQuery={setQuery}
        hasSearched={hasSearched}
        resultsCount={results.length}
        contextType="home"
        onFocusRequest={handleFocusRequest}
        noResultMessageRef={noResultMessageRef}
        queryClass={queryClass}
        lastPresearchQuery={lastPresearchQuery}
        initialQuery={initialQuery}
        onBeforeSeeAllNavigation={handleBeforeSeeAllNavigation}
      />

      {hasSearched && !isLoading && (
        <SearchResults
          definition={definition}
          results={results}
          queryClass={queryClass as PresearchClass}
          contextType="home"
          titleRef={resultsTitleRef}
          onResultClick={handleResultClick}
        />
      )}
    </div>
  );
};

const containerStyle = css({
  width: "100%",
});
