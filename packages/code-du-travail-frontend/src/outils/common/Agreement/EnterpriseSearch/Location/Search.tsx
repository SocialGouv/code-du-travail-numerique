import { Button, icons, Label, Input, Text, theme } from "@socialgouv/cdtn-ui";
import styled from "styled-components";
import { useCombobox } from "downshift";
import { useState } from "react";
import { ApiGeoResult, searchCities } from "./searchCities";
import { StyledList, StyledSuggestion } from "../../../../../search/SearchBar";
import { detectIfPostalCode } from "../../../../../conventions/Search/api/utils";

const { Search: SearchIcon } = icons;

type Props = {
  selectedApiGeoResult?: ApiGeoResultWithSelectedPostCode;
  setSelectedApiGeoResult: (
    apiGeoResult?: ApiGeoResultWithSelectedPostCode
  ) => void;
  isDisabled?: boolean;
  searchInputHandler: (e: React.FormEvent) => void;
};

export type ApiGeoResultWithSelectedPostCode = ApiGeoResult & {
  selectedPostCode: string[];
};

export const LocationSearchInput = (props: Props) => {
  const [suggestions, setSuggestions] = useState<ApiGeoResult[]>([]);
  const [postalCode, setPostalCode] = useState<string | undefined>(undefined);
  const [hasSearchError, setHasSearchError] = useState<boolean>(false);
  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getLabelProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: suggestions,
    itemToString,
    onInputValueChange: async ({ inputValue }) => {
      if (!inputValue) {
        props.setSelectedApiGeoResult(undefined);
      }
      try {
        const results = await searchCities(inputValue);
        setSuggestions(results);
        const isPostalCode = detectIfPostalCode(inputValue);
        setPostalCode(isPostalCode ? inputValue : undefined);
        setHasSearchError(false);
      } catch (error) {
        setSuggestions([]);
        console.error(error);
        setHasSearchError(true);
      }
    },
    selectedItem: props.selectedApiGeoResult,
    onSelectedItemChange(changes) {
      props.setSelectedApiGeoResult({
        ...changes.selectedItem,
        selectedPostCode: postalCode
          ? [postalCode]
          : changes.selectedItem.codesPostaux,
      });
    },
  });

  function itemToString(item: ApiGeoResult | null) {
    return item
      ? `${item.nom} (${
          postalCode ??
          (item.codesPostaux.length > 1
            ? item.codeDepartement
            : item.codesPostaux[0])
        })`
      : "";
  }

  return (
    <>
      <InlineLabel
        {...getLabelProps()}
        htmlFor="enterprise-search-address"
        disabled={props.isDisabled}
      >
        Code postal ou ville
      </InlineLabel>{" "}
      <InlineText fontWeight="400" fontSize="small" disabled={props.isDisabled}>
        (facultatif)
      </InlineText>
      <InputWithButton>
        <div>
          <BlockInputRight
            {...getInputProps()}
            data-testid="agreement-postal-code-search-input"
            id="enterprise-search-address"
            placeholder="Ex : 31000 ou Toulouse"
            disabled={props.isDisabled}
          />

          {hasSearchError && (
            <InlineText hasSearchError={hasSearchError}>
              Une erreur est survenue lors de la recherche par ville, veuillez
              réessayer plus tard.
            </InlineText>
          )}

          <StyledList {...getMenuProps()}>
            {isOpen &&
              suggestions.map((item, index) => (
                <StyledSuggestion
                  {...getItemProps({
                    item,
                    index,
                  })}
                  key={`${item.code}${index}`}
                  isHighlighted={highlightedIndex === index}
                >
                  {itemToString(item)}
                </StyledSuggestion>
              ))}
          </StyledList>
        </div>
        <SubmitIcon
          type="submit"
          title="Lancer ma recherche"
          aria-label="Lancer ma recherche"
          onClick={props.searchInputHandler}
          small
          narrow
          variant="secondary"
          data-testid="agreement-company-search-button"
          disabled={props.isDisabled}
        >
          <MobileOnly>Rechercher</MobileOnly>
          <StyledSearchIcon />
        </SubmitIcon>
      </InputWithButton>
    </>
  );
};

const BlockInputRight = styled(Input)`
  width: 100%;

  @media (min-width: ${theme.breakpoints.tablet}) {
    input {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
`;

const InlineLabel = styled(Label)`
  display: inline;
  color: ${({ theme, disabled }) =>
    disabled ? theme.placeholder : theme.paragraph};
`;

const InlineText = styled(Text)`
  color: ${({ theme, disabled, hasSearchError }) =>
    disabled
      ? theme.placeholder
      : hasSearchError
      ? theme.error
      : theme.paragraph};
`;

const InputWithButton = styled.div`
  position: relative;
`;
const SubmitIcon = styled(Button)`
  @media (min-width: ${theme.breakpoints.mobile}) {
    position: absolute;
    top: 6px;
    right: 6px;
    width: 2.5rem;
  }
  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 100%;
    margin-top: ${theme.spacings.xmedium};
    box-sizing: inherit;
  }
  color: ${({ theme }) => theme.white};
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.placeholder : theme.secondary};
  border-color: ${({ theme, disabled }) =>
    disabled ? theme.placeholder : theme.secondary};
`;

const StyledSearchIcon = styled(SearchIcon)`
  @media (max-width: ${theme.breakpoints.mobile}) {
    display: none;
  }
  color: ${({ theme }) => theme.white};
  height: 25px;
  width: 25px;
`;

const MobileOnly = styled.span`
  @media (min-width: ${theme.breakpoints.mobile}) {
    display: none;
  }
`;
