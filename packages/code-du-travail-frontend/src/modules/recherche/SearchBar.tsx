"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import * as Sentry from "@sentry/nextjs";
import { HomemadeAutocomplete } from "src/modules/common/Autocomplete";
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
  const { emitSuggestionSelectionEvent } = useSearchTracking();

  const handleSearch = (searchTerm: string) => {
    if (searchTerm.trim()) {
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
      <HomemadeAutocomplete<string>
        id="search-bar-autocomplete"
        key={key}
        label="Recherchez par mots-clés"
        hintText="par exemple : congés payés, durée de préavis"
        isSearch={false}
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
        defaultValue={initialValue}
        disableNativeLabelAssociation={false}
      />
    </form>
  );
};
