import { Button, icons, Label, Input, Text, theme } from "@socialgouv/cdtn-ui";
import styled from "styled-components";
import { useCombobox } from "downshift";
import { useState } from "react";
import { ApiGeoResult, searchCities } from "./searchCities";
import { StyledList, StyledSuggestion } from "../../../../../search/SearchBar";
import { detectIfPostalCode } from "../../../../../conventions/Search/api/utils";

const { Search: SearchIcon } = icons;

type Props = {
  setAddress: (address: string) => void;
  setPostCode: (postCode: string[]) => void;
  isDisabled?: boolean;
  searchInputHandler: (e: React.FormEvent) => void;
};

export const LocationSearchInput = (props: Props) => {
  const [suggestions, setSuggestions] = useState<ApiGeoResult[]>([]);
  const [selectedItem, setSelectedItem] = useState<null | ApiGeoResult>(null);
  const [postalCode, setPostalCode] = useState<string | undefined>(undefined);
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
      try {
        const results = await searchCities(inputValue);
        setSuggestions(results);
        const isPostalCode = detectIfPostalCode(inputValue);
        setPostalCode(isPostalCode ? inputValue : undefined);
      } catch (error) {
        setSuggestions([]);
        console.error(error);
      }
    },
    selectedItem,
    onSelectedItemChange(changes) {
      props.setAddress(changes.selectedItem.nom);
      if (postalCode) {
        props.setPostCode([postalCode]);
      } else {
        props.setPostCode(changes.selectedItem.codesPostaux);
      }
      setSelectedItem(changes.selectedItem);
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
  color: ${({ theme, disabled }) =>
    disabled ? theme.placeholder : theme.paragraph};
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
