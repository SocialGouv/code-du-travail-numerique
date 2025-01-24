import { HTMLInputTypeAttribute, useState } from "react";
import { useCombobox } from "downshift";
import { fetchSuggestResults } from "./fetchSuggestResults";
import { SUGGEST_MAX_RESULTS } from "../../../config";
import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@styled-system/css";
import { useLayoutTracking } from "../tracking";

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
          "aria-labelledby": "fr-header-search-label",
        })}
        data-testid="search-input"
      />
      <ul
        {...getMenuProps({
          className: list,
          "aria-labelledby": "fr-header-search-label",
        })}
      >
        {isOpen &&
          suggestions.map((item, index) => (
            <li
              {...getItemProps({
                item,
                index,
                className: `${fr.cx("fr-p-3v")} ${suggestion} ${
                  highlightedIndex === index && suggestionHover
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

const list = css({
  pos: "absolute",
  top: "2.5rem",
  w: "100%",
  zIndex: 100,
  bg: "var(--background-default-grey)",
});

const suggestion = css({
  cursor: "pointer",
  color: "var(--text-action-high-blue-france)",
  textAlign: "left",
});

const suggestionHover = css({
  bg: "var(--background-default-grey-hover)",
});
