"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import * as Sentry from "@sentry/nextjs";
import { Autocomplete } from "../common/Autocomplete";
import { fetchSuggestResults } from "../layout/header/fetchSuggestResults";
import { SUGGEST_MAX_RESULTS } from "../../config";
import { useSearchTracking } from "./tracking";

type SearchBarProps = {
  initialValue?: string;
};

export const SearchBar = ({ initialValue = "" }: SearchBarProps) => {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState(initialValue);
  const [key, setKey] = useState(0);
  const { emitSearchEvent, emitSuggestionSelectionEvent } = useSearchTracking();

  const handleSearch = (searchTerm: string) => {
    if (searchTerm.trim()) {
      emitSearchEvent(searchTerm.trim());
      router.push(`/recherche?query=${encodeURIComponent(searchTerm.trim())}`);
      setKey((prevKey) => prevKey + 1);
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
      Sentry.captureMessage(
        "Échec lors de la récupération des suggestions - " + error
      );
      return [];
    }
  };

  const onError = (error: string) => {
    Sentry.captureMessage(
      "Échec lors de la récupération des suggestions - " + error
    );
  };

  return (
    <form role="search" onSubmit={handleSubmit} ref={formRef}>
      <Autocomplete<string>
        id="search-bar-autocomplete"
        key={key}
        label="Recherchez sur le site, la sélection d'une option charge une nouvelle page"
        placeholder="Recherchez sur le site"
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
        inputRef={inputRef}
      />
    </form>
  );
};
