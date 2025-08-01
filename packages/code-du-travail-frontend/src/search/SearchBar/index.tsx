import { Button, icons, ScreenReaderOnly, theme } from "@socialgouv/cdtn-ui";
import { push as matopush } from "@socialgouv/matomo-next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchSuggestResults } from "../../modules/layout/header/fetchSuggestResults";
import { useCombobox } from "downshift";
const { Search: SearchIcon } = icons;

const suggestMaxResults = 5;

type Props = {
  inputId: string;
  hasButton?: boolean;
  hasSearchIcon?: boolean;
};

const SearchBar = ({
  inputId,
  hasButton = false,
  hasSearchIcon = false,
}: Props) => {
  const router = useRouter();
  const [query, setQuery] = useState(
    typeof router.query.q === "string" ? router.query.q : ""
  );
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getLabelProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: suggestions,
    onInputValueChange: async ({ inputValue }) => {
      setQuery(inputValue);
      try {
        const results = await fetchSuggestResults(inputValue).then((items) =>
          items.slice(0, suggestMaxResults)
        );
        setSuggestions(results);
      } catch (error) {
        console.error("fetch error", error);
      }
    },
    onSelectedItemChange(changes) {
      const suggestion = changes.selectedItem;
      if (suggestion) {
        matopush(["trackEvent", "selectedSuggestion", query, suggestion]);
        matopush([
          "trackEvent",
          "candidateSuggestions",
          suggestions.join("###"),
        ]);
        window.scrollTo(0, 0);
        document.body.focus();
        router.push({
          pathname: "/recherche",
          query: { q: suggestion },
        });
      }
    },
    initialInputValue: query,
  });

  useEffect(() => {
    if (typeof router.query.q === "string") setQuery(router.query.q);
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

  return (
    <SearchForm role="search" action="/recherche" onSubmit={onFormSubmit}>
      <ScreenReaderOnly>
        <label {...getLabelProps()} htmlFor={inputId}>
          Rechercher
        </label>
      </ScreenReaderOnly>
      {hasButton && !hasSearchIcon && <SearchIconLeft aria-hidden="true" />}

      <StyledInput
        {...getInputProps()}
        id={inputId}
        placeholder={
          hasButton ? "congés payés, durée de préavis" : "Rechercher"
        }
        hasButton={hasButton}
        hasSearchIcon={hasSearchIcon}
        type="text"
      />

      <StyledList {...getMenuProps()} hasButton={hasButton}>
        {isOpen &&
          suggestions.map((item, index) => (
            <StyledSuggestion
              {...getItemProps({
                item,
                index,
              })}
              isHighlighted={highlightedIndex === index}
              key={`${item}${index}`}
            >
              {item}
            </StyledSuggestion>
          ))}
      </StyledList>

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

const { breakpoints, spacings, fonts, box, colors } = theme;

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

const SubmitButton = styled(Button)`
  position: absolute;
  top: ${spacings.xsmall};
  right: ${spacings.xsmall};
  ${({ hasSearchIcon }) => hasSearchIcon && `padding: 0 ${spacings.base};`};
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

export const StyledInput = styled.input`
  display: flex;
  width: 100%;
  height: ${({ hasButton }) => (hasButton ? "7rem" : "5.4rem")};
  margin: 0;
  padding: ${({ hasButton, hasSearchIcon }) =>
    hasButton
      ? `2rem ${hasSearchIcon ? "9rem" : "18.5rem"} 2rem ${hasSearchIcon ? spacings.xmedium : "6rem"}`
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

export const StyledList = styled.ul`
  position: absolute;
  width: 100%;
  z-index: 100;
  background: ${colors.white};
  box-shadow: 0 10px 10px -10px #b7bcdf;
  margin: 0;
  margin-top: ${spacings.tiny};
  padding: 0;
  border-radius: 3px;
  top: ${({ hasButton }) => (hasButton ? "7rem" : "5.4rem")};
`;

export const StyledSuggestion = styled.li`
  border-radius: 3px;
  cursor: pointer;
  line-height: 2rem;
  list-style-type: none;
  padding: ${spacings.base};
  background: ${({ isHighlighted }) =>
    isHighlighted ? colors.bgTertiary : colors.white};
  &:nth-child(2n + 1) {
    background: ${({ isHighlighted }) =>
      isHighlighted ? colors.bgTertiary : colors.bgSecondary};
  }
`;

export default SearchBar;
