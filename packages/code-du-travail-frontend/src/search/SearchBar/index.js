import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Router, { useRouter } from "next/router";
import { Button, theme } from "@socialgouv/react-ui";

import SearchIcon from "../../icons/SearchIcon";
import { matopush } from "../../piwik";
import { fetchSuggestResults } from "../search.service";
import { DocumentSuggester } from "./DocumentSuggester";

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
      Router.push({
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
    Router.push({
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
      {hasButton && <SearchInputIcon />}
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
        <SubmitButton type="submit">Rechercher</SubmitButton>
      ) : (
        <SubmitIcon type="submit" variant="icon">
          <SearchIcon />
        </SubmitIcon>
      )}
    </SearchForm>
  );
};

export default SearchBar;

const { animations, box, breakpoints, colors, spacing } = theme;

const inputHeight = "50px";

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

const SearchInputIcon = styled(SearchIcon)`
  position: absolute;
  top: 0;
  left: 0;
  width: 1.3rem;
  height: 1.3rem;
  margin: ${spacing.base} 0 0 ${spacing.medium};
  @media (max-width: ${breakpoints.mobile}) {
    display: none;
  }
`;

const SearchInput = styled(DocumentSuggester)`
  display: flex;
  width: 100%;
  height: ${inputHeight};
  margin: 0;
  padding: 0
    ${({ hasButton }) =>
      hasButton
        ? `${spacing.base} 0 4rem `
        : `calc(${inputHeight} + ${spacing.small}) 0 ${spacing.base}`};
  font-size: inherit;
  font-family: inherit;
  background: ${colors.lightBackground};
  border: ${box.border};
  border-radius: ${spacing.xmedium};
  transition: border ${animations.transitionTiming} ease;
  appearance: none;
  &:focus {
    border-color: ${colors.blueLight};
    outline: none;
  }
  @media (max-width: ${breakpoints.mobile}) {
    padding: 0 ${spacing.base};
  }
`;

const SubmitButton = styled(Button)`
  margin-left: ${spacing.xsmall};
  @media (max-width: ${breakpoints.mobile}) {
    margin-top: ${spacing.small};
    margin-left: 0;
  }
`;
const SubmitIcon = styled(Button)`
  position: absolute;
  top: 1px;
  right: 1px;
  width: calc(${inputHeight} - 2px);
  height: calc(${inputHeight} - 2px);
  border-top-right-radius: ${box.borderRadius};
  border-bottom-right-radius: ${box.borderRadius};
`;
