import { Button, icons, ScreenReaderOnly, theme } from "@socialgouv/cdtn-ui";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { matopush } from "../../piwik";
import { fetchSuggestResults } from "../search.service";
import { DocumentSuggester } from "./DocumentSuggester";

const { Search: SearchIcon } = icons;

const suggestMaxResults = 5;

const SearchBar = ({
  hasFocus = false,
  inputId,
  hasButton = false,
  hasSearchIcon = false,
}) => {
  const router = useRouter();
  // query in the input box
  const [query, setQuery] = useState(router.query.q || "");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    setQuery(router.query.q);
  }, [router.query.q]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (query) {
      window.scrollTo(0, 0);
      document.body.focus();
      router.push({
        pathname: "/recherche",
        query: {
          q: query.trim(),
        },
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
    window.scrollTo(0, 0);
    document.body.focus();
    router.push({
      pathname: "/recherche",
      query: { q: suggestion },
    });
  };

  const onClear = () => {
    setSuggestions([]);
  };

  const onSearch = async ({ value }) => {
    try {
      const results = await fetchSuggestResults(value).then((items) =>
        items.slice(0, suggestMaxResults)
      );
      setSuggestions(results);
    } catch (error) {
      console.error("fetch error", error);
    }
  };
  return (
    <SearchForm role="search" action="/recherche" onSubmit={onFormSubmit}>
      <ScreenReaderOnly>
        <label htmlFor={inputId}>Rechercher</label>
      </ScreenReaderOnly>
      {hasButton && !hasSearchIcon && <SearchIconLeft />}
      <SearchInput
        inputId={inputId}
        hasFocus={hasFocus}
        hasButton={hasButton}
        hasSearchIcon={hasSearchIcon}
        onChange={onChange}
        query={query}
        placeholder={
          hasButton ? "congés payés, durée de préavis" : "Rechercher"
        }
        onSearch={onSearch}
        onSelect={onSelect}
        onClear={onClear}
        suggestions={suggestions}
        ariaLabel="recherchez par mots-clés"
      />
      {hasButton ? (
        <SubmitButton
          hasSearchIcon={hasSearchIcon}
          variant="primary"
          type="submit"
          aria-label="Lancer ma recherche"
          title="Lancer ma recherche"
        >
          {(hasSearchIcon && <StyledSearchIcon />) || "Rechercher"}
        </SubmitButton>
      ) : (
        <SubmitIcon
          type="submit"
          title="Lancer ma recherche"
          aria-label="Lancer ma recherche"
          small
          narrow
          variant="naked"
        >
          <StyledSearchIcon />
        </SubmitIcon>
      )}
    </SearchForm>
  );
};

export default SearchBar;

const { box, breakpoints, fonts, spacings } = theme;

const SearchForm = styled.form`
  position: relative;
  display: flex;
  flex-grow: 1;
  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    height: auto;
  }
`;

const StyledSearchIcon = styled(SearchIcon)`
  width: 3rem;
  height: 3rem;
`;

const SearchIconLeft = styled(StyledSearchIcon)`
  position: absolute;
  top: 0;
  left: 0;
  margin: ${spacings.medium} 0 0 ${spacings.medium};
  color: ${({ theme }) => theme.placeholder};
  @media (max-width: ${breakpoints.mobile}) {
    display: none;
  }
`;

const SearchInput = styled(DocumentSuggester)`
  display: flex;
  width: 100%;
  height: ${({ hasButton }) => (hasButton ? "7rem" : "5.4rem")};
  margin: 0;
  padding: ${({ hasButton, hasSearchIcon }) =>
    hasButton
      ? `2rem ${hasSearchIcon ? "9rem" : "18.5rem"} 2rem ${
          hasSearchIcon ? spacings.xmedium : "6rem"
        }`
      : `1rem 5.5rem 1rem ${spacings.base}`};
  color: ${({ theme }) => theme.paragraph};
  font-weight: normal;
  font-size: ${fonts.sizes.default};
  font-family: "Open Sans", sans-serif;
  font-style: normal;
  line-height: inherit;
  background: ${({ theme }) => theme.white};
  border: 1px solid transparent;
  border-radius: ${box.borderRadius};
  box-shadow: ${({ theme }) => box.shadow.large(theme.secondary)};
  appearance: none;

  &::placeholder {
    color: ${({ theme }) => theme.placeholder};
  }

  @media (max-width: ${breakpoints.mobile}) {
    height: 5.4rem;
    padding: ${({ hasButton }) =>
      hasButton
        ? `1rem ${spacings.base}`
        : `1rem 5.5rem 1rem ${spacings.base}`};
  }
`;

const SubmitButton = styled(Button)`
  position: absolute;
  top: ${spacings.xsmall};
  right: ${spacings.xsmall};
  padding: ${({ hasSearchIcon }) =>
    hasSearchIcon ? `0 ${spacings.base}` : "inherit"};
  @media (max-width: ${breakpoints.mobile}) {
    position: static;
    margin-top: ${spacings.small};
    margin-left: 0;
  }
`;
const SubmitIcon = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
  width: 3rem;
  height: 5.4rem;
  color: ${({ theme }) => theme.secondary};
`;
