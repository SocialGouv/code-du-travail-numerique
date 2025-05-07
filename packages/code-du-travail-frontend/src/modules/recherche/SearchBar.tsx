"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Autocomplete } from "../common/Autocomplete";
import { fetchSuggestResults } from "../layout/header/fetchSuggestResults";
import { SUGGEST_MAX_RESULTS } from "../../config";

type SearchBarProps = {
  initialValue?: string;
};

export const SearchBar: React.FC<SearchBarProps> = ({ initialValue = "" }) => {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const [query, setQuery] = useState(initialValue);

  const handleSearch = (searchTerm: string) => {
    if (searchTerm.trim()) {
      router.replace(`/recherche?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    handleSearch(query);
  };

  const submitForm = () => {
    handleSubmit();
  };

  return (
    <form role="search" onSubmit={handleSubmit} ref={formRef}>
      <Autocomplete<string>
        label="Rechercher"
        placeholder="Rechercher"
        isSearch
        displayLabel={(data) => data ?? ""}
        search={async (input) => {
          try {
            const results = await fetchSuggestResults(input).then((items) =>
              items.slice(0, SUGGEST_MAX_RESULTS)
            );
            return results;
          } catch (error) {
            return [];
          }
        }}
        onInputValueChange={(value) => {
          if (value) {
            setQuery(value);
          }
        }}
        onChange={(value) => {
          setQuery(value ?? "");
          if (value) {
            handleSearch(value);
          }
        }}
        onSubmitSearch={submitForm}
      />
    </form>
  );
};
