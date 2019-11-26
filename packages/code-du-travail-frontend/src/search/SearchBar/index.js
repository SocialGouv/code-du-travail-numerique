import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { Button, icons, theme } from "@socialgouv/react-ui";

import { matopush } from "../../piwik";
import { fetchSuggestResults } from "../search.service";
import { DocumentSuggester } from "./DocumentSuggester";

const { Search: SearchIcon } = icons;

const suggestMaxResults = 5;

const SearchBar = ({ hasFocus = false, inputId, hasButton = false }) => {
  const router = useRouter();
  // query in the input box
  const [query, setQuery] = useState(router.query.q || "");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    setQuery(router.query.q);
  }, [router.query.q]);

  const onFormSubmit = e => {
    e.preventDefault();
    if (query) {
      router.push({
        pathname: "/recherche",
        query: {
          q: query
        }
      });
    }
  };

  const onChange = (event, { newValue } = {}) => {
    setQuery(newValue);
  };

  const onSelect = (suggestion, event) => {
    // prevent onSubmit to be call
    event.preventDefault();
    matopush(["trackEvent", "selectedSuggestion", query, suggestion]);
    matopush(["trackEvent", "candidateSuggestions", suggestions.join("###")]);
    router.push({
      pathname: "/recherche",
      query: { q: suggestion }
    });
  };

  const onClear = () => {
    setSuggestions([]);
  };

  const onSearch = async ({ value }) => {
    try {
      const results = await fetchSuggestResults(value).then(items =>
        items.slice(0, suggestMaxResults)
      );
      setSuggestions(results);
    } catch (error) {
      console.error("fetch error", error);
    }
  };
  return (
    <SearchForm onSubmit={onFormSubmit}>
      {hasButton && <SearchIconLeft />}
      <SearchInput
        inputId={inputId}
        hasFocus={hasFocus}
        hasButton={hasButton}
        onChange={onChange}
        query={query}
        placeholder="Recherche"
        onSearch={onSearch}
        onSelect={onSelect}
        onClear={onClear}
        suggestions={suggestions}
      />
      {hasButton ? (
        <SubmitButton variant="primary" type="submit">
          Rechercher
        </SubmitButton>
      ) : (
        <SubmitIcon type="submit" small narrow variant="naked">
          <StyledSearchIcon />
        </SubmitIcon>
      )}
    </SearchForm>
  );
};

export default SearchBar;

const { animations, box, breakpoints, colors, spacings } = theme;

const INPUT_HEIGHT = "5.4rem";

const SearchForm = styled.form`
  position: relative;
  display: flex;
  margin: 0 auto;
  padding: 0;
  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    height: auto;
  }
`;

const StyledSearchIcon = styled(SearchIcon)`
  width: 2.5rem;
`;

const SearchIconLeft = styled(StyledSearchIcon)`
  position: absolute;
  top: 0;
  left: 0;
  margin: ${spacings.base} 0 0 ${spacings.medium};
  @media (max-width: ${breakpoints.mobile}) {
    display: none;
  }
`;

const SearchInput = styled(DocumentSuggester)`
  display: flex;
  width: 100%;
  margin: 0;
  padding: 0
    ${({ hasButton }) =>
      hasButton
        ? `${spacings.base} 0 6.4rem `
        : `calc(${INPUT_HEIGHT} + ${spacings.small}) 0 ${spacings.base}`};
  font-size: inherit;
  font-family: inherit;
  background: ${colors.bgSecondary};
  transition: border ${animations.transitionTiming} ease;
  appearance: none;
  @media (max-width: ${breakpoints.mobile}) {
    padding: 0 ${spacings.base};
  }
`;

const SubmitButton = styled(Button)`
  margin-left: ${spacings.tiny};
  @media (max-width: ${breakpoints.mobile}) {
    margin-top: ${spacings.small};
    margin-left: 0;
  }
`;
const SubmitIcon = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
  width: calc(${INPUT_HEIGHT} - ${spacings.small});
  height: calc(${INPUT_HEIGHT} - 2px);
  border-top-right-radius: ${box.borderRadius};
  border-bottom-right-radius: ${box.borderRadius};
`;
