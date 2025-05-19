"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import * as Sentry from "@sentry/nextjs";
import { Autocomplete } from "../common/Autocomplete";
import { fetchSuggestResults } from "../layout/header/fetchSuggestResults";
import { SUGGEST_MAX_RESULTS } from "../../config";
import { useSearchTracking } from "./tracking";

type SearchBarProps = {
  initialValue?: string;
};

export const SearchBar: React.FC<SearchBarProps> = ({ initialValue = "" }) => {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [query, setQuery] = useState(initialValue);
  const { emitSearchEvent, emitSuggestionSelectionEvent } = useSearchTracking();

  const handleSearch = (searchTerm: string) => {
    if (searchTerm.trim()) {
      emitSearchEvent(searchTerm.trim());
      router.push(`/recherche?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    handleSearch(query);
  };

  const search = async (inputValue: string) => {
    try {
      const results = await fetchSuggestResults(inputValue).then((items) =>
        items.slice(0, SUGGEST_MAX_RESULTS)
      );
      return results;
    } catch (error) {
      console.error("Échec lors de la récupération des suggestions", error);
      return [];
    }
  };

  const onError = (error: string) => {
    console.error("Échec lors de la récupération des suggestions", error);
    Sentry.captureMessage("Échec lors de la récupération des suggestions");
  };

  return (
    <form role="search" onSubmit={handleSubmit} ref={formRef}>
      <Autocomplete<string>
        label="Rechercher"
        placeholder="Rechercher"
        isSearch
        displayLabel={(data) => data ?? ""}
        search={search}
        onError={onError}
        onInputValueChange={(value) => {
          if (value) {
            setQuery(value);
          }
        }}
        onChange={(value) => {
          setQuery(value ?? "");
          if (value) {
            emitSuggestionSelectionEvent(query, value);
            handleSearch(value);
          }
        }}
        dataTestId="search-bar-input"
      />
    </form>
  );
};
