import { Input, theme } from "@socialgouv/cdtn-ui";
import styled from "styled-components";
import { useCombobox } from "downshift";
import { useState } from "react";
import { ApiGeoResult, searchCities } from "./searchCities";
import { StyledList, StyledSuggestion } from "../../../../../search/SearchBar";

type Props = {
  setAddress: (address: string) => void;
  isDisabled?: boolean;
};

export const LocationSearchInput = (props: Props) => {
  const [suggestions, setSuggestions] = useState<ApiGeoResult[]>([]);
  const [selectedItem, setSelectedItem] = useState<null | ApiGeoResult>(null);
  const {
    isOpen,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: suggestions,
    itemToString(item) {
      return item ? item.nom : "";
    },
    onInputValueChange: async ({ inputValue }) => {
      try {
        const results = await searchCities(inputValue);
        setSuggestions(results);
      } catch (error) {
        setSuggestions([]);
        console.error(error);
      }
    },
    selectedItem,
    onSelectedItemChange(changes) {
      console.log("ok");
      props.setAddress(changes.selectedItem.nom);
      setSelectedItem(changes.selectedItem);
    },
  });

  return (
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
              {item.nom} (
              {item.codesPostaux.length > 1
                ? item.codeDepartement
                : item.codesPostaux[0]}
              )
            </StyledSuggestion>
          ))}
      </StyledList>
    </div>
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
