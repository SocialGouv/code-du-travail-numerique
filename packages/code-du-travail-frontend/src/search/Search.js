import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Router, { withRouter } from "next/router";
import Link from "next/link";
import { Button, Container, theme, Section } from "@cdt/ui-old";

import SearchIcon from "../icons/SearchIcon";
import { DocumentSuggester } from "./DocumentSuggester";
import { fetchSuggestResults } from "./search.service";
import { withClipboard } from "../common/withClipboard.hoc";
import { matopush } from "../piwik";

const suggestMaxResults = 5;

const SearchIconWithClipboard = withClipboard(SearchIcon);

const Search = ({ router }) => {
  // query in the input box
  const [query, setQuery] = useState(router.query.q || "");
  const [suggestions, setSuggestions] = useState([]);

  const searchRef = useRef(null);

  useEffect(() => {
    setQuery(router.query.q);
    if (searchRef.current && searchRef.current.scrollIntoView) {
      searchRef.current.scrollIntoView({ behavior: "smooth" });
    }
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
    <React.Fragment>
      <SearchSection variant="white">
        <Container>
          <StyledSearch ref={searchRef}>
            <SearchLabel>
              Posez votre question sur le droit du travail
              <br />
              <Link href="/droit-du-travail" passHref>
                <A>Le droit du travail, c‘est quoi ?</A>
              </Link>
            </SearchLabel>
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
          </StyledSearch>
        </Container>
      </SearchSection>
    </React.Fragment>
  );
};

export default withRouter(Search);

const { animations, box, breakpoints, colors, spacing, fonts } = theme;

const SearchSection = styled(Section)`
  box-shadow: 0 10px 10px -10px ${colors.lightGrey};
  @media print {
    display: none;
  }
`;

const SearchLabel = styled.p`
  margin-top: 0;
  font-size: ${fonts.sizeH2};
  line-height: ${fonts.lineHeight};
  color: ${colors.title};
`;

const A = styled.a`
  font-size: ${fonts.sizeBase};
`;

const StyledSearch = styled.div`
  position: relative;
  padding: ${spacing.base} 0;
  text-align: center;
`;

const SearchForm = styled.form`
  display: flex;
  margin: 0 auto;
  padding: 0;
  position: relative;
  width: 70%;
  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
  }
  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    height: auto;
    width: 100%;
  }
`;

const SearchInputIcon = styled(SearchIconWithClipboard)`
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
  color: inherit;
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
