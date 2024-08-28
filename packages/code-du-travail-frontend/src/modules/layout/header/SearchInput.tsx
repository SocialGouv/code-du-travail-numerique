import { HTMLInputTypeAttribute, useState } from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { useCombobox } from "downshift";
import { push as matopush } from "@socialgouv/matomo-next";
import { fetchSuggestResults } from "./fetchSuggestResults";
import { SUGGEST_MAX_RESULTS } from "../../../config";
import styled from "styled-components";

type Props = {
  id: string;
  className: string;
  placeholder: string;
  type: HTMLInputTypeAttribute;
  onSearchSubmit: (text: string) => void;
};

export const SearchInput = (props: Props) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: suggestions,
    onInputValueChange: async ({ inputValue }) => {
      setQuery(inputValue);
      try {
        const results = await fetchSuggestResults(inputValue).then((items) =>
          items.slice(0, SUGGEST_MAX_RESULTS)
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
        props.onSearchSubmit(suggestion);
      }
    },
    initialInputValue: query,
  });

  return (
    <>
      <input
        {...getInputProps()}
        className={props.className}
        id={props.id}
        placeholder={props.placeholder}
        type={props.type}
      />
      <StyledList {...getMenuProps()}>
        {isOpen &&
          suggestions.map((item, index) => (
            <StyledSuggestion
              {...getItemProps({
                item,
                index,
              })}
              key={`${item}${index}`}
              isHighlighted={highlightedIndex === index}
            >
              {item}
            </StyledSuggestion>
          ))}
      </StyledList>
    </>
  );
};

const StyledList = styled.ul`
  position: absolute;
  top: ${fr.spacing("10v")};
  width: 100%;
  z-index: 100;
  background: ${fr.colors.decisions.background.default.grey.default};
`;

const StyledSuggestion = styled.li`
  cursor: pointer;
  line-height: 2rem;
  list-style-type: none;
  text-align: left;
  padding: ${fr.spacing("1v")};
  background: ${({ isHighlighted }) =>
    isHighlighted
      ? fr.colors.decisions.background.default.grey.active
      : fr.colors.decisions.background.default.grey.default};
  &:nth-child(2n + 1) {
    background: ${({ isHighlighted }) =>
      isHighlighted
        ? fr.colors.decisions.background.default.grey.active
        : fr.colors.decisions.background.default.grey.hover};
  }
`;
