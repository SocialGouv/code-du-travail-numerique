import React, { useState } from "react";
import * as Sentry from "@sentry/nextjs";
import { fr } from "@codegouvfr/react-dsfr";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { css } from "@styled-system/css";
import { useCombobox } from "downshift";
import { fetchSuggestResults } from "../../layout/header/fetchSuggestResults";
import { SUGGEST_MAX_RESULTS } from "../../../config";
import { useLayoutTracking } from "../../layout/tracking";

type Props = {
  onSearchSubmit: (text: string) => void;
};

export const HomeSearch = (props: Props) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { emitSuggestionEvent } = useLayoutTracking();

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    getLabelProps,
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
        console.error("Echec lors de la récupération des suggestions", error);
        Sentry.captureMessage("Echec lors de la récupération des suggestions");
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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      props.onSearchSubmit(query);
    }
  };

  return (
    <div
      className={fr.cx(
        "fr-grid-row",
        "fr-grid-row--gutters",
        "fr-grid-row--bottom"
      )}
      role="search"
    >
      <div className={fr.cx("fr-col-12", "fr-col-md-8")}>
        <div className={`${fr.cx("fr-input-group")}`}>
          <label
            {...getLabelProps({
              className: fr.cx("fr-label"),
            })}
          >
            Recherchez par mots-clés
            <span className={fr.cx("fr-hint-text")}>
              par exemple : congés payés, durée de préavis
            </span>
          </label>
          <input
            {...getInputProps({
              className: `${fr.cx("fr-input")}`,
              onKeyDown: handleKeyDown,
              "aria-label": "Champ de recherche par mots-clés",
              "data-testid": "search-input",
            })}
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
                    className: `${fr.cx("fr-p-3v")} ${suggestion} ${highlightedIndex === index ? isHighlighted : ""}`,
                  })}
                  key={`${item}${index}`}
                >
                  {item}
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className={fr.cx("fr-col-12", "fr-col-md-4")}>
        <Button
          iconId="fr-icon-search-line"
          iconPosition="right"
          priority="primary"
          aria-label="Lancer la recherche"
          className={buttonStyle}
          onClick={() => props.onSearchSubmit(query)}
        >
          Rechercher
        </Button>
      </div>
    </div>
  );
};

const buttonStyle = css({
  mdDown: {
    width: "100% !important",
    display: "flex !important",
    justifyContent: "center !important",
  },
});

const list = css({
  pos: "absolute",
  w: "100%",
  zIndex: 100,
  bg: "var(--background-default-grey)",
  listStyleType: "none !important",
  padding: "0!",
  margin: "0!",
});

const suggestion = css({
  cursor: "pointer",
  color: "var(--text-action-high-blue-france)",
  textAlign: "left",
  _hover: { bg: "var(--background-default-grey-hover)" },
});

const isHighlighted = css({
  background: "var(--background-default-grey-hover)",
});
