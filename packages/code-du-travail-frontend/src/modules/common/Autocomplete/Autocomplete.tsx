"use client";
import { fr } from "@codegouvfr/react-dsfr";
import Image from "next/image";
import Button from "@codegouvfr/react-dsfr/Button";
import { useCombobox } from "downshift";
import { useState } from "react";
import Spinner from "../Spinner.svg";
import { css } from "@styled-system/css";
import { redirect } from "next/navigation";
import { Input, InputProps } from "../../dsfr-extract/Input";

export type AutocompleteProps<K> = InputProps & {
  onChange?: (value: K | undefined) => void;
  onError?: (value: string) => void;
  onSearch?: (query: string, results: K[]) => void;
  displayLabel: (item: K | null) => string;
  search: (search: string) => Promise<K[]>;
  dataTestId?: string;
  lineAsLink?: (value: K) => string;
  displayNoResult?: boolean;
  defaultValue?: K;
  onInputValueChange?: (value: string) => void;
};

export const Autocomplete = <K,>({
  className,
  onChange,
  onSearch,
  onError,
  onInputValueChange,
  displayLabel,
  lineAsLink,
  search,
  label,
  state,
  stateRelatedMessage,
  hintText,
  classes,
  dataTestId,
  displayNoResult,
  defaultValue,
}: AutocompleteProps<K>) => {
  const [value, setValue] = useState<string>(
    displayLabel(defaultValue ?? null)
  );
  const [loading, setLoading] = useState(false);
  const [selectedResult, setSelectedResult] = useState<K | undefined>(
    defaultValue
  );
  const [inputRef, setInputRef] = useState<HTMLInputElement | null>();

  const [suggestions, setSuggestions] = useState<K[]>([]);
  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getLabelProps,
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
      if (lineAsLink) redirect(lineAsLink(changes.selectedItem));
    },
  });
  return (
    <div className={`${autocompleteContainer} ${className}`}>
      <Input
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
                    inputRef?.focus();
                  }}
                  priority="tertiary no outline"
                  title="Effacer la sélection"
                  type="button"
                >
                  <span className={"fr-sr-only"}>Effacer la sélection</span>
                </Button>
              )}
              {(loading || (lineAsLink && selectedResult)) && (
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
        nativeLabelProps={{
          ...getLabelProps(),
        }}
        nativeInputProps={{
          ...getInputProps(),
          type: "search",
          value,
          onChange: async (ev) => {
            const inputValue = ev.target.value;
            onInputValueChange?.(inputValue);
            setValue(inputValue);
            if (!inputValue) {
              setSelectedResult(undefined);
              onSearch?.(inputValue, []);
            }
            if (selectedResult || inputValue.length <= 1) {
              return;
            }
            try {
              setLoading(true);
              const results = await search(inputValue);
              onSearch?.(inputValue, results);
              setSuggestions(results);
            } catch (error) {
              onError?.(error);
              setSuggestions([]);
            } finally {
              setLoading(false);
            }
          },
          // @ts-ignore
          "data-testid": dataTestId,
          ref: setInputRef,
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
        className={`${fr.cx("fr-p-0", "fr-m-0")} ${autocompleteListContainer} ${!isOpen && fr.cx("fr-hidden")}`}
      >
        {suggestions.length
          ? suggestions.map((item, index) => (
              <li
                key={`${displayLabel(item)}${index}`}
                className={`${fr.cx("fr-sidemenu__item", "fr-p-0", "fr-grid-row")} ${autocompleteContainer}${highlightedIndex === index ? ` ${buttonActive}` : ""}`}
                {...getItemProps({
                  item,
                  index,
                })}
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
                  className={`${fr.cx("fr-col-12")} ${autocompleteButton}`}
                >
                  {displayLabel(item)}
                </Button>
              </li>
            ))
          : displayNoResult &&
            !selectedResult && (
              <li
                key={`no-result`}
                className={`${fr.cx("fr-sidemenu__item", "fr-p-0", "fr-grid-row")} ${autocompleteContainer}`}
              >
                <span className={fr.cx("fr-py-1w", "fr-px-2w")}>
                  Aucun résultat
                </span>
              </li>
            )}
      </ul>
    </div>
  );
};

const autocompleteContainer = css({
  position: "relative",
});

const autocompleteListContainer = css({
  position: "absolute",
  w: "calc(100% - 1rem)",
  zIndex: 100,
  bg: "var(--background-default-grey)",
});

const autocompleteButton = css({
  textAlign: "left",
});

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
