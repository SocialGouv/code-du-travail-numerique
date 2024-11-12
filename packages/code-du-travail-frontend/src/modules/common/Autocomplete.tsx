"use client";
import { fr } from "@codegouvfr/react-dsfr";
import Button from "@codegouvfr/react-dsfr/Button";
import Input, { InputProps } from "@codegouvfr/react-dsfr/Input";
import { useCombobox } from "downshift";
import { useState } from "react";
import { css } from "../../../styled-system/css";

type Props<K> = InputProps & {
  onChange?: (value: K | undefined) => void;
  onSearch?: (query: string, results: K[]) => void;
  displayLabel: (item: K | null) => string;
  search: (search: string) => Promise<K[]>;
  dataTestId?: string;
  lineAsLink?: (value: K) => string;
};

export const Autocomplete = <K,>({
  className,
  onChange,
  onSearch,
  displayLabel,
  lineAsLink,
  search,
  label,
  state,
  stateRelatedMessage,
  hintText,
  classes,
  dataTestId,
}: Props<K>) => {
  const [value, setValue] = useState<string>("");
  const [selectedResult, setSelectedResult] = useState<K | undefined>();
  const [suggestions, setSuggestions] = useState<K[]>([]);
  const {
    isOpen,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: suggestions,
    itemToString: displayLabel,
    onInputValueChange: async ({ inputValue }) => {
      setValue(inputValue);
      if (!inputValue) {
        setSelectedResult(undefined);
      }
      try {
        const results = await search(inputValue);
        if (onSearch) onSearch(inputValue, results);
        setSuggestions(results);
      } catch (error) {
        console.error(error);
        setSuggestions([]);
      }
    },
    selectedItem: selectedResult,
    onSelectedItemChange: (changes) => {
      setSelectedResult(changes.selectedItem);
      setValue(changes.inputValue ?? "");
      if (onChange) onChange(changes.selectedItem);
    },
  });
  return (
    <>
      <div className={`${autocompleteContainer} ${className}`}>
        <Input
          {...getInputProps({
            id: "location-search",
          })}
          addon={
            <>
              {(selectedResult || value) && (
                <Button
                  data-testid={`${dataTestId ? dataTestId + "-" : ""}autocomplete-close`}
                  iconId="fr-icon-close-circle-fill"
                  className={`${fr.cx("fr-p-0")} ${buttonClose}`}
                  onClick={() => {
                    setSelectedResult(undefined);
                    if (onChange) onChange(undefined);
                    setValue("");
                    setSuggestions([]);
                  }}
                  priority="tertiary no outline"
                  title="Effacer la sélection"
                />
              )}
            </>
          }
          nativeInputProps={{
            type: "search",
            value,
            // @ts-ignore
            "data-testid": dataTestId,
          }}
          className={`${fr.cx("fr-mb-0")}`}
          hintText={hintText}
          label={label}
          state={state}
          stateRelatedMessage={stateRelatedMessage}
          classes={classes}
        />
        <ul
          {...getMenuProps()}
          className={`${fr.cx("fr-p-0")} ${autocompleteListContainer}`}
        >
          {isOpen &&
            suggestions.map((item, index) => (
              <>
                <li
                  {...getItemProps({
                    item,
                    index,
                  })}
                  className={`${fr.cx("fr-sidemenu__item", "fr-p-0", "fr-grid-row")} ${autocompleteContainer}${highlightedIndex === index ? ` ${buttonActive}` : ""} ${autocompleteItemContainer}`}
                  key={`${displayLabel(item)}${index}`}
                >
                  <Button
                    {...(lineAsLink
                      ? {
                          linkProps: {
                            href: lineAsLink(item),
                          },
                        }
                      : {
                          linkProps: undefined,
                        })}
                    priority="tertiary no outline"
                    className={fr.cx("fr-col-12")}
                  >
                    {displayLabel(item)}
                  </Button>
                </li>
              </>
            ))}
        </ul>
      </div>
    </>
  );
};

const autocompleteContainer = css({
  position: "relative",
});

const autocompleteListContainer = css({
  position: "absolute",
  w: "100%",
  zIndex: 100,
  bg: "var(--background-default-grey)",
});

const autocompleteItemContainer = css({});

const buttonActive = css({
  backgroundColor: "rgb(246, 246, 246)",
});

const buttonClose = css({
  position: "absolute",
  right: 0,
  _before: {
    width: "18px !important",
    height: "18px !important",
  },
  _hover: {
    backgroundColor: "unset !important",
  },
});
