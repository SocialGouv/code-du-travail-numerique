"use client";

import React, { useRef, useState, useEffect } from "react";
import { css } from "@styled-system/css";
import {
  SearchInput,
  ModalSearchHandle,
} from "../../recherche/modal/SearchInput";
import { SearchResults } from "../../recherche/modal/SearchResults";
import { useSearchResults } from "../../recherche/hooks/useSearchResults";

export const HomeSearchV2 = () => {
  const searchRef = useRef<ModalSearchHandle>(null);
  const resultsTitleRef = useRef<HTMLHeadingElement | null>(null);
  const noResultMessageRef = useRef<HTMLParagraphElement>(null);
  const [pendingFocus, setPendingFocus] = useState(false);
  const {
    results,
    isLoading,
    hasSearched,
    triggerSearch,
    resetSearch,
    setQuery,
  } = useSearchResults();

  const handleFocusRequest = () => {
    setPendingFocus(true);
  };

  // Handle focus after search completes
  useEffect(() => {
    if (pendingFocus && hasSearched && !isLoading) {
      setPendingFocus(false);
      if (results.length > 0) {
        // Focus on results title if there are results
        setTimeout(() => {
          resultsTitleRef.current?.focus();
        }, 100);
      } else {
        // Focus on "no results" message if displayed, otherwise keep on input
        setTimeout(() => {
          if (noResultMessageRef.current) {
            noResultMessageRef.current.focus();
          } else {
            searchRef.current?.focusInput();
          }
        }, 100);
      }
    }
  }, [pendingFocus, hasSearched, isLoading, results.length]);

  return (
    <div className={containerStyle}>
      <SearchInput
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
      />

      {hasSearched && !isLoading && (
        <SearchResults
          results={results}
          contextType="home"
          titleRef={resultsTitleRef}
        />
      )}
    </div>
  );
};

const containerStyle = css({
  width: "100%",
});
