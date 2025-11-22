"use client";

import { fr } from "@codegouvfr/react-dsfr";
import Image from "next/image";
import Button from "@codegouvfr/react-dsfr/Button";
import Input, { InputProps } from "@codegouvfr/react-dsfr/Input";
import Downshift, { DownshiftState, StateChangeOptions } from "downshift";
import { useState, useRef, MutableRefObject, Ref, useEffect } from "react";
import Spinner from "../Spinner.svg";
import { css } from "@styled-system/css";
import Link from "../Link";
import { redirect } from "next/navigation";
import { AutocompleteProps } from "./Autocomplete";

export const AutocompleteV2 = <K,>({
  onChange,
  onSearch,
  onError,
  onInputValueChange,
  displayLabel,
  lineAsLink,
  search,
  label,
  state: autocompleteState,
  stateRelatedMessage,
  hintText,
  dataTestId,
  defaultValue,
  displayNoResult,
  isSearch = false,
  placeholder,
  id,
  inputRef: externalInputRef,
  renderSuggestion,
  defaultHighlightedIndex,
  hideLabel,
}: AutocompleteProps<K> & {
  renderSuggestion?: (item: K) => React.ReactNode;
  defaultHighlightedIndex?: number;
}) => {
  const [loading, setLoading] = useState(false);
  const [inputRef, setInputRef] = useState<HTMLInputElement | null>(null);
  const [suggestions, setSuggestions] = useState<K[]>([]);
  const isFocusedRef = useRef(false);

  useEffect(() => {
    return () => {
      isFocusedRef.current = false;
    };
  }, []);

  const stateReducer = (
    state: DownshiftState<K>,
    changes: StateChangeOptions<K>
  ) => {
    if (changes.type === Downshift.stateChangeTypes.blurInput) {
      return {
        ...changes,
        inputValue: state.inputValue,
      };
    }
    return changes;
  };

  return (
    <Downshift<K>
      initialSelectedItem={defaultValue}
      defaultHighlightedIndex={defaultHighlightedIndex}
      getA11yStatusMessage={({
        highlightedIndex,
        inputValue,
        isOpen,
        resultCount,
        selectedItem,
      }) => {
        if (!isOpen) {
          return selectedItem
            ? `${displayLabel(selectedItem)} sélectionné`
            : "";
        }

        if (!inputValue) {
          return "";
        }

        if (resultCount === 0) {
          return "Aucun résultat disponible";
        }

        const resultatText =
          resultCount === 1 ? "résultat est" : "résultats sont";
        const baseMessage = `${resultCount} ${resultatText} disponible${resultCount > 1 ? "s" : ""}`;

        if (highlightedIndex !== null && highlightedIndex >= 0) {
          return `${baseMessage}. Utilisez les flèches haut et bas pour naviguer.`;
        }

        return baseMessage;
      }}
      onInputValueChange={async (value, stateAndHelpers) => {
        if (!isFocusedRef.current) return;

        if (!stateAndHelpers.selectedItem) {
          onInputValueChange?.(value);

          if (!value) {
            onSearch?.(value, []);
            return;
          }

          try {
            setLoading(true);
            const results = await search(value);
            onSearch?.(value, results);
            setSuggestions(results);
          } catch (error) {
            onError?.(error);
            setSuggestions([]);
          } finally {
            setLoading(false);
          }
        }
      }}
      onChange={(item) => {
        if (item && onChange) onChange(item, suggestions);
        if (lineAsLink && item) redirect(lineAsLink(item));
      }}
      itemToString={displayLabel}
      stateReducer={stateReducer}
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        inputValue,
        isOpen,
        highlightedIndex,
        selectedItem,
        getRootProps,
        clearSelection,
      }) => {
        const getPluralSuffix = (count: number) => (count > 1 ? "s" : "");

        let statusMessage = "";
        if (!loading && isOpen && inputValue) {
          if (suggestions.length > 0) {
            const suffix = getPluralSuffix(suggestions.length);
            statusMessage = `${suggestions.length} résultat${suffix} trouvé${suffix}.`;
          } else {
            statusMessage = "Aucun résultat trouvé.";
          }
        }

        const inputProps = getInputProps({
          onFocus: (_e: React.FocusEvent<HTMLInputElement>) => {
            isFocusedRef.current = true;
          },
          onBlur: (_e: React.FocusEvent<HTMLInputElement>) => {
            isFocusedRef.current = false;
          },
          ...(id ? { id } : {}),
        });

        const labelProps = {
          ...getLabelProps(),
          ...(id ? { htmlFor: id } : {}),
        };

        return (
          <div
            className={`${searchContainer}`}
            {...getRootProps({ refKey: "ref" }, { suppressRefError: true })}
          >
            <Input
              nativeLabelProps={labelProps}
              hideLabel={hideLabel}
              addon={
                <>
                  <div className={addonBlock}>
                    {!loading && (selectedItem || inputValue) && (
                      <Button
                        data-testid={`${dataTestId ? dataTestId + "-" : ""}autocomplete-close`}
                        iconId="fr-icon-close-circle-fill"
                        className={`${fr.cx("fr-p-0")} ${buttonClose}`}
                        onClick={() => {
                          clearSelection();
                          if (onChange) onChange(undefined, []);
                          if (onSearch) onSearch("", []);
                          setSuggestions([]);
                          inputRef?.focus();
                        }}
                        priority="tertiary no outline"
                        title="Effacer la sélection"
                        type="button"
                      >
                        <span className={"fr-sr-only"}>
                          Effacer la sélection
                        </span>
                      </Button>
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
                type: "text",
                // @ts-ignore
                "data-testid": dataTestId,
                placeholder,
                ref: (el: HTMLInputElement | null) => {
                  setInputRef(el);
                  if (
                    externalInputRef &&
                    typeof externalInputRef === "object" &&
                    "current" in externalInputRef
                  ) {
                    (
                      externalInputRef as MutableRefObject<HTMLInputElement | null>
                    ).current = el;
                  }
                },
                ...inputProps,
                "aria-labelledby": undefined,
              }}
              className={`${fr.cx("fr-mb-0")}`}
              hintText={hintText}
              label={label}
              state={autocompleteState}
              stateRelatedMessage={stateRelatedMessage}
              classes={{
                wrap: isSearch ? inputSearchNoMarginTop : undefined,
                root: rootInputCss,
                nativeInputOrTextArea: inputStyle,
              }}
            />
            {statusMessage && (
              <div
                role="status"
                aria-live="polite"
                className={fr.cx("fr-sr-only")}
                lang="fr"
              >
                {statusMessage}
              </div>
            )}
            <ul
              {...getMenuProps()}
              className={`${fr.cx("fr-p-0", "fr-m-0")} ${autocompleteListContainer} ${isSearch ? listSearch : ""}`}
            >
              {isOpen && suggestions.length
                ? suggestions.map((item, index) => (
                    <li
                      {...getItemProps({
                        item,
                        index,
                      })}
                      key={`${displayLabel(item)}${index}`}
                      className={`${fr.cx("fr-p-3v")} ${suggestion} ${highlightedIndex === index ? isHighlighted : ""}`}
                    >
                      {lineAsLink ? (
                        <Link href={lineAsLink(item)} className={link}>
                          {renderSuggestion
                            ? renderSuggestion(item)
                            : displayLabel(item)}
                        </Link>
                      ) : (
                        <>
                          {renderSuggestion
                            ? renderSuggestion(item)
                            : displayLabel(item)}
                        </>
                      )}
                    </li>
                  ))
                : isOpen &&
                  displayNoResult &&
                  !selectedItem && (
                    <li className={fr.cx("fr-p-3v")} lang="fr">
                      Aucun résultat
                    </li>
                  )}
            </ul>
            {isSearch && (
              <button
                className="fr-btn fr-icon-search-line fr-btn--icon"
                title="Rechercher"
                type="submit"
              >
                <span className={fr.cx("fr-sr-only")}>Rechercher</span>
              </button>
            )}
          </div>
        );
      }}
    </Downshift>
  );
};

const searchContainer = css({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  width: "100%",
  position: "relative",
});

const autocompleteListContainer = css({
  position: "absolute",
  top: "100%",
  left: 0,
  width: "100%",
  zIndex: 1000,
  bg: "var(--background-default-grey)",
  listStyleType: "none!",
  borderTop: "none",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  maxHeight: "300px",
  overflowY: "auto",
});

const rootInputCss = css({
  width: "100%",
  height: "100%",
});

const inputStyle = css({
  height: "76px!",
  padding: "0.75rem 3rem 0.75rem 1rem!",
  width: "100%!",
  boxSizing: "border-box!",
  fontSize: "1rem!",
  lineHeight: "1.5!",
  marginBottom: "0!",
  borderColor: "var(--border-default-grey)!",
});

const suggestion = css({
  cursor: "pointer",
  color: "var(--text-default-grey)",
  transition: "background-color 0.2s ease",
  borderBottom: "1px solid var(--border-default-grey)",
  _last: {
    borderBottom: "none",
  },
  _hover: {
    bg: "var(--background-default-grey-hover)",
  },
});

const addonBlock = css({
  position: "absolute",
  right: 0,
  height: "100%",
  alignContent: "center",
});

const buttonClose = css({
  _before: {
    width: "18px!",
    height: "18px!",
  },
  color: "var(--text-default-grey)!",
});

const isHighlighted = css({
  bg: "var(--background-default-grey-hover)",
});

const link = css({
  backgroundImage: "none!",
});

const inputSearchNoMarginTop = css({
  marginTop: "0!",
});

const listSearch = css({
  marginTop: "0!",
  textAlign: "left",
});
