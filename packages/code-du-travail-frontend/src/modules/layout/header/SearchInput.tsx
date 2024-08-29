import { HTMLInputTypeAttribute, useState } from "react";
import { useCombobox } from "downshift";
import { push as matopush } from "@socialgouv/matomo-next";
import { fetchSuggestResults } from "./fetchSuggestResults";
import { SUGGEST_MAX_RESULTS } from "../../../config";
import variables from "./SearchInput.module.scss";
import { fr } from "@codegouvfr/react-dsfr";

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
      <ul
        {...getMenuProps({
          className: `${variables.list}`,
        })}
      >
        {isOpen &&
          suggestions.map((item, index) => (
            <li
              {...getItemProps({
                item,
                index,
                className: `${fr.cx("fr-p-1v")} ${variables.suggestion} ${
                  highlightedIndex === index ? variables["is-highlighted"] : ""
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
