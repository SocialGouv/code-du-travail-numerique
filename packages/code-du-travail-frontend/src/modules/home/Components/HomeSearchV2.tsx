"use client";

import React, { useRef } from "react";
import { css } from "@styled-system/css";
import {
  SearchInput,
  ModalSearchHandle,
} from "../../recherche/modal/SearchInput";
import { SearchResults } from "../../recherche/modal/SearchResults";
import { useSearchResults } from "../../recherche/hooks/useSearchResults";

export const HomeSearchV2 = () => {
  const searchRef = useRef<ModalSearchHandle>(null);
  const {
    results,
    isLoading,
    hasSearched,
    triggerSearch,
    resetSearch,
    setQuery,
  } = useSearchResults();

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
      />

      {hasSearched && !isLoading && (
        <SearchResults results={results} contextType="home" />
      )}
    </div>
  );
};

const containerStyle = css({
  width: "100%",
});
