"use client";
import { fr } from "@codegouvfr/react-dsfr";
import Image from "next/image";
import Button from "@codegouvfr/react-dsfr/Button";
import Input, { InputProps } from "@codegouvfr/react-dsfr/Input";
import { useCombobox } from "downshift";
import { useState } from "react";
import Spinner from "./Spinner.svg";
import { css } from "../../../styled-system/css";

export type AutocompleteProps<K> = InputProps & {
  onChange?: (value: K | undefined) => void;
  onError?: (value: string) => void;
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
  onError,
  displayLabel,
  lineAsLink,
  search,
  label,
  state,
  stateRelatedMessage,
  hintText,
  classes,
  dataTestId,
}: AutocompleteProps<K>) => {
  const [value, setValue] = useState<string>("");
  const [loading, setLoading] = useState(false);
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
              <div className={addonBlock}>
                {!loading && (selectedResult || value) && (
                  <Button
                    data-testid={`${dataTestId ? dataTestId + "-" : ""}autocomplete-close`}
                    iconId="fr-icon-close-circle-fill"
                    className={`${fr.cx("fr-p-0")} ${buttonClose}`}
                    onClick={() => {
                      setSelectedResult(undefined);
                      if (onChange) onChange(undefined);
                      if (onSearch) onSearch("", []);
                      setValue("");
                      setSuggestions([]);
                    }}
                    priority="tertiary no outline"
                    title="Effacer la sélection"
                  />
                )}
                {loading && (
                  <Image
                    className={fr.cx("fr-mr-1v")}
                    priority
                    src={Spinner}
                    alt="Chargement en cours"
                  />
                )}
              </div>
            </>
          }
          nativeInputProps={{
            type: "search",
            value,
            onChange: async (ev) => {
              const inputValue = ev.target.value;
              setValue(inputValue);
              if (!inputValue) {
                setSelectedResult(undefined);
              }
              if (selectedResult) {
                return;
              }
              try {
                setLoading(true);
                const results = await search(inputValue);
                if (onSearch) onSearch(inputValue, results);
                setSuggestions(results);
              } catch (error) {
                if (onError) onError(error);
                setSuggestions([]);
              } finally {
                setLoading(false);
              }
            },
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
                    key: `${displayLabel(item)}${index}`,
                  })}
                  className={`${fr.cx("fr-sidemenu__item", "fr-p-0", "fr-grid-row")} ${autocompleteContainer}${highlightedIndex === index ? ` ${buttonActive}` : ""} ${autocompleteItemContainer}`}
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

const addonBlock = css({
  position: "absolute",
  right: 0,
  height: "100%",
  alignContent: "center",
});

const buttonClose = css({
  _before: {
    width: "18px !important",
    height: "18px !important",
  },
  _hover: {
    backgroundColor: "unset !important",
  },
});
