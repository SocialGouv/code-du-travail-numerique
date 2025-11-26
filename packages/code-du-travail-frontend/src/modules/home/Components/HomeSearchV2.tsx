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
  const { results, isLoading, hasSearched, triggerSearch, resetSearch } =
    useSearchResults();

  return (
    <div className={containerStyle}>
      <SearchInput
        ref={searchRef}
        onSearchTriggered={triggerSearch}
        onQueryClear={resetSearch}
        isLoadingResults={isLoading}
        hasSearched={hasSearched}
      />

      {hasSearched && !isLoading && (
        <SearchResults results={results} hideTitle={true} />
      )}
    </div>
  );
};

const containerStyle = css({
  width: "100%",
});
