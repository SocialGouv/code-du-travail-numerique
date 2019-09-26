import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Router, { withRouter } from "next/router";
import { Button, theme } from "@cdt/ui-old";

import SearchIcon from "../../icons/SearchIcon";
import { matopush } from "../../piwik";
import { fetchSuggestResults } from "../search.service";
import { DocumentSuggester } from "./DocumentSuggester";

const suggestMaxResults = 5;

const SearchBar = ({ router }) => {
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
      <SearchInputIcon />
      <SearchInput
        onChange={onChange}
        query={query}
        placeholder="Recherche"
        onSearch={onSearch}
        onSelect={onSelect}
        onClear={onClear}
        suggestions={suggestions}
      />
      <Submit type="submit">Rechercher</Submit>
    </SearchForm>
  );
};

export default withRouter(SearchBar);

const { animations, box, breakpoints, colors, spacing } = theme;

const SearchForm = styled.form`
  display: flex;
  position: relative;
  margin: 0;
  padding: 0;
  max-width: 800px;
  color: ${colors.darkText};
  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    height: auto;
  }
`;

const SearchInputIcon = styled(SearchIcon)`
  position: absolute;
  left: 0;
  top: 0;
  margin: ${spacing.base} 0 0 ${spacing.medium};
  width: 1.3rem;
  height: 1.3rem;
  @media (max-width: ${breakpoints.mobile}) {
    display: none;
  }
`;

const SearchInput = styled(DocumentSuggester)`
  display: flex;
  margin: 0;
  padding: 0 ${spacing.base} 0 4rem;
  width: 100%;
  height: 50px;
  font-size: inherit;
  font-family: inherit;
  appearance: none;
  background: ${colors.lightBackground};
  border: 1px solid ${colors.elementBorder};
  border-radius: ${box.borderRadius};
  transition: border ${animations.transitionTiming} ease;
  &:focus {
    border-color: ${colors.blueLight};
    outline: none;
  }
  @media (max-width: ${breakpoints.mobile}) {
    height: 50px;
    padding: 0 ${spacing.base};
  }
`;

const Submit = styled(Button)`
  margin-left: ${spacing.xsmall};
  @media (max-width: ${breakpoints.mobile}) {
    margin-left: 0;
    margin-top: ${spacing.small};
  }
`;
