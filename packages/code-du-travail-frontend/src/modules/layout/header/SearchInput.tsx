import { HTMLInputTypeAttribute, useState } from "react";
import { useCombobox } from "downshift";
import { fetchSuggestResults } from "./fetchSuggestResults";
import { SUGGEST_MAX_RESULTS } from "../../../config";
import { fr } from "@codegouvfr/react-dsfr";
import { useLayoutTracking } from "../tracking";
import {
  autocompleteListContainer,
  isHighlighted,
  suggestion,
} from "../../common/Autocomplete";

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
  const { emitSuggestionEvent } = useLayoutTracking();

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getItemProps,
    highlightedIndex,
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
        emitSuggestionEvent(query, suggestion, suggestions);
        props.onSearchSubmit(suggestion);
      }
    },
    initialInputValue: query,
  });

  return (
    <>
      <input
        {...getInputProps({
          className: props.className,
          id: props.id,
          placeholder: props.placeholder,
          type: props.type,
        })}
        data-testid="search-input"
      />
      <ul
        {...getMenuProps({
          className: autocompleteListContainer,
        })}
      >
        {isOpen &&
          suggestions.map((item, index) => (
            <li
              {...getItemProps({
                item,
                index,
                className: `${fr.cx("fr-p-3v")} ${suggestion} ${
                  highlightedIndex === index ? isHighlighted : ""
                }`,
              })}
              key={`${item}${index}`}
            >
              {item}
            </li>
          ))}
      </ul>
    </>
  );
};
