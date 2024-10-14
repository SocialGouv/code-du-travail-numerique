import { HTMLInputTypeAttribute, useState } from "react";
import { useCombobox } from "downshift";
import { fetchSuggestResults } from "./fetchSuggestResults";
import { SUGGEST_MAX_RESULTS } from "../../../config";
import { fr } from "@codegouvfr/react-dsfr";
import { css } from "../../../../styled-system/css";
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
          className: list,
        })}
      >
        {isOpen &&
          suggestions.map((item, index) => (
            <li
              {...getItemProps({
                item,
                index,
                className: `${fr.cx("fr-p-1v")} ${suggestion} ${highlightedIndex === index ? isHighlighted : ""}`,
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
  position: "absolute",
  top: "2.5rem",
  width: "100%",
  zIndex: 100,
  background: "var(--background-default-grey)",
});

const suggestion = css({
  cursor: "pointer",
  lineHeight: "2rem",
  listStyleType: "none",
  textAlign: "left",
  background: "var(--background-default-grey)",
  "&:nth-child(2n + 1)": {
    background: "var(--background-default-grey-hover)",
  },
});

const isHighlighted = css({
  background: "var(--background-default-grey-active)",
  "&:nth-child(2n + 1)": {
    background: "var(--background-default-grey-active)",
  },
});
