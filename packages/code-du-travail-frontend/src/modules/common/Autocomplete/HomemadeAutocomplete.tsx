"use client";

import { fr } from "@codegouvfr/react-dsfr";
import Image from "next/image";
import Button from "@codegouvfr/react-dsfr/Button";
import Input, { InputProps } from "@codegouvfr/react-dsfr/Input";
import {
  useState,
  useRef,
  MutableRefObject,
  Ref,
  useEffect,
  useCallback,
  KeyboardEvent,
} from "react";
import Spinner from "../Spinner.svg";
import { css } from "@styled-system/css";
import Link from "../Link";
import { redirect } from "next/navigation";

type HomemadeAutocompleteProps<K> = InputProps & {
  onChange?: (value: K | undefined, suggestions?: K[]) => void;
  onError?: (value: string) => void;
  onSearch?: (query: string, results: K[]) => void;
  displayLabel: (item: K | null) => string;
  search: (search: string) => Promise<K[]>;
  dataTestId?: string;
  lineAsLink?: (value: K) => string;
  displayNoResult?: boolean;
  defaultValue?: K;
  onInputValueChange?: (value: string) => void;
  isSearch?: boolean;
  placeholder?: string;
  inputRef?: Ref<HTMLInputElement>;
  id?: string;
  highlightQuery?: boolean;
  ariaDescribedby?: string;
  onDropdownOpenChange?: (isOpen: boolean) => void;
  onEnterPress?: () => void;
};

export const HomemadeAutocomplete = <K,>({
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
  highlightQuery = false,
  hideLabel,
  ariaDescribedby,
  onDropdownOpenChange,
  onEnterPress,
}: HomemadeAutocompleteProps<K>) => {
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState(
    defaultValue ? displayLabel(defaultValue) : ""
  );
  const [suggestions, setSuggestions] = useState<K[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const [selectedItem, setSelectedItem] = useState<K | undefined>(defaultValue);
  const [a11yStatusMessage, setA11yStatusMessage] = useState("");
  const [liveRegionMessage, setLiveRegionMessage] = useState("");

  const internalInputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const isFocusedRef = useRef(false);
  const isMouseOverListRef = useRef(false);

  const listboxId = id ? `${id}-listbox` : "autocomplete-listbox";
  const labelId = id ? `${id}-label` : "autocomplete-label";

  const generateA11yStatusMessage = useCallback(
    (
      isMenuOpen: boolean,
      results: K[],
      currentHighlightedIndex: number,
      currentSelectedItem: K | undefined,
      currentInputValue: string
    ) => {
      if (!isMenuOpen) {
        return currentSelectedItem
          ? `${displayLabel(currentSelectedItem)} sélectionné`
          : "";
      }

      if (!currentInputValue) {
        return "";
      }

      const resultCount = results.length;

      if (resultCount === 0) {
        return "Aucun résultat disponible";
      }

      const resultatText =
        resultCount === 1 ? "résultat est" : "résultats sont";
      const baseMessage = `${resultCount} ${resultatText} disponible${resultCount > 1 ? "s" : ""}`;

      if (currentHighlightedIndex !== null && currentHighlightedIndex >= 0) {
        return `${baseMessage}. Utilisez les flèches haut et bas pour naviguer.`;
      }

      return baseMessage;
    },
    [displayLabel]
  );

  useEffect(() => {
    const message = generateA11yStatusMessage(
      isOpen,
      suggestions,
      highlightedIndex,
      selectedItem,
      inputValue
    );
    setA11yStatusMessage(message);

    if (message) {
      setLiveRegionMessage("");
      setTimeout(() => {
        setLiveRegionMessage(message);
      }, 100);
    } else {
      setLiveRegionMessage("");
    }
  }, [
    isOpen,
    suggestions,
    highlightedIndex,
    selectedItem,
    inputValue,
    generateA11yStatusMessage,
  ]);

  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const highlightedElement = listRef.current.children[
        highlightedIndex
      ] as HTMLElement;
      if (highlightedElement) {
        highlightedElement.scrollIntoView({ block: "nearest" });
      }
    }
  }, [highlightedIndex]);

  useEffect(() => {
    onDropdownOpenChange?.(isOpen);
  }, [isOpen, onDropdownOpenChange]);

  const handleInputChange = async (value: string) => {
    setInputValue(value);
    onInputValueChange?.(value);

    if (!value) {
      onSearch?.(value, []);
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    if (selectedItem && displayLabel(selectedItem) === value) {
      return;
    }

    try {
      setLoading(true);
      const results = await search(value);
      onSearch?.(value, results);
      setSuggestions(results);
      setIsOpen(true);
      setHighlightedIndex(-1);
    } catch (error) {
      onError?.(error as string);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectItem = (item: K) => {
    setSelectedItem(item);
    setInputValue(displayLabel(item));
    setIsOpen(false);
    setHighlightedIndex(-1);

    if (onChange) onChange(item, suggestions);
    if (lineAsLink) redirect(lineAsLink(item));
  };

  const clearSelection = () => {
    setSelectedItem(undefined);
    setInputValue("");
    setSuggestions([]);
    setIsOpen(false);
    setHighlightedIndex(-1);
    if (onChange) onChange(undefined, []);
    if (onSearch) onSearch("", []);
    internalInputRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" && suggestions.length > 0) {
        setIsOpen(true);
        setHighlightedIndex(0);
        e.preventDefault();
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case "Enter":
        if (highlightedIndex >= 0 && suggestions[highlightedIndex]) {
          e.preventDefault();
          handleSelectItem(suggestions[highlightedIndex]);
        } else {
          // Close dropdown and let the form handle it
          setIsOpen(false);
          setHighlightedIndex(-1);
          onEnterPress?.();
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
      case "Tab":
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    isFocusedRef.current = true;
    const input = e.target;
    const length = input.value.length;
    setTimeout(() => {
      input.setSelectionRange(length, length);
    }, 0);

    if (suggestions.length > 0 && inputValue) {
      setIsOpen(true);
    }
  };

  const handleBlur = () => {
    isFocusedRef.current = false;
    setTimeout(() => {
      if (!isMouseOverListRef.current) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    }, 150);
  };

  const renderHighlightedLabel = (item: K, query: string): React.ReactNode => {
    const itemLabel = displayLabel(item);

    if (!query || !itemLabel) return itemLabel;

    const lowerQuery = query.toLowerCase();
    const lowerLabel = itemLabel.toLowerCase();
    const index = lowerLabel.indexOf(lowerQuery);

    if (index === -1) return itemLabel;

    const beforeMatch = itemLabel.substring(0, index);
    const match = itemLabel.substring(index, index + query.length);
    const afterMatch = itemLabel.substring(index + query.length);

    return (
      <>
        {beforeMatch}
        {match}
        <strong>{afterMatch}</strong>
      </>
    );
  };

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

  const getOptionId = (index: number) => `${listboxId}-option-${index}`;

  return (
    <div className={`${searchContainer}`}>
      <Input
        nativeLabelProps={{
          id: labelId,
          ...(id ? { htmlFor: id } : {}),
        }}
        hideLabel={hideLabel}
        addon={
          <>
            <div className={addonBlock}>
              {!loading && (selectedItem || inputValue) && (
                <Button
                  data-testid={`${dataTestId ? dataTestId + "-" : ""}autocomplete-close`}
                  iconId="fr-icon-close-circle-fill"
                  className={`${fr.cx("fr-p-0")} ${buttonClose}`}
                  onClick={clearSelection}
                  priority="tertiary no outline"
                  title="Effacer la sélection"
                  type="button"
                >
                  <span className={"fr-sr-only"}>Effacer la sélection</span>
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
          autoComplete: "off",
          // @ts-ignore
          "data-testid": dataTestId,
          placeholder,
          ref: (el: HTMLInputElement | null) => {
            internalInputRef.current = el;
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
          value: inputValue,
          onChange: (e) => handleInputChange(e.target.value),
          onKeyDown: handleKeyDown,
          onFocus: handleFocus,
          onBlur: handleBlur,
          ...(id ? { id } : {}),
          role: "combobox",
          "aria-expanded": isOpen,
          "aria-controls": listboxId,
          "aria-haspopup": "listbox",
          "aria-autocomplete": "list" as const,
          "aria-activedescendant":
            highlightedIndex >= 0 ? getOptionId(highlightedIndex) : undefined,
          ...(ariaDescribedby ? { "aria-describedby": ariaDescribedby } : {}),
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

      {/*
        Live region for screen reader announcements.
        Important: This div must ALWAYS be present in the DOM (even when empty).
        Screen readers only announce changes that occur within an existing live region.
        Using aria-live="polite" + aria-atomic="true" (better screen reader support than role="status")
      */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className={fr.cx("fr-sr-only")}
        lang="fr"
      >
        {liveRegionMessage}
      </div>

      <ul
        ref={listRef}
        id={listboxId}
        role="listbox"
        aria-labelledby={labelId}
        onMouseEnter={() => {
          isMouseOverListRef.current = true;
        }}
        onMouseLeave={() => {
          isMouseOverListRef.current = false;
        }}
        className={`${fr.cx("fr-p-0", "fr-m-0")} ${autocompleteListContainer} ${isSearch ? listSearch : ""}`}
      >
        {isOpen && suggestions.length
          ? suggestions.map((item, index) => (
              <li
                key={`${displayLabel(item)}${index}`}
                id={getOptionId(index)}
                role="option"
                aria-selected={highlightedIndex === index}
                className={`${fr.cx("fr-p-3v")} ${suggestion} ${highlightedIndex === index ? isHighlightedStyle : ""}`}
                onClick={() => handleSelectItem(item)}
                onMouseEnter={() => setHighlightedIndex(index)}
              >
                {lineAsLink ? (
                  <Link href={lineAsLink(item)} className={link}>
                    {highlightQuery
                      ? renderHighlightedLabel(item, inputValue || "")
                      : displayLabel(item)}
                  </Link>
                ) : (
                  <>
                    {highlightQuery
                      ? renderHighlightedLabel(item, inputValue || "")
                      : displayLabel(item)}
                  </>
                )}
              </li>
            ))
          : isOpen &&
            displayNoResult &&
            !selectedItem && (
              <li className={fr.cx("fr-p-3v")} lang="fr" role="option">
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
  padding: "0.75rem 3rem 0.75rem 1rem!",
  width: "100%!",
  boxSizing: "border-box!",
  fontSize: "1rem!",
  lineHeight: "1.5!",
  marginBottom: "0!",
  borderColor: "var(--border-default-grey)!",
  minHeight: {
    md: "76px!",
    base: "40px!",
  },
});

const suggestion = css({
  cursor: "pointer",
  color: "var(--text-default-grey)",
  transition: "all 0.2s ease",
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
  height: "100%!",
  color: "var(--text-default-grey)!",
  _hover: {
    backgroundColor: "transparent!",
  },
});

const isHighlightedStyle = css({
  bg: "var(--background-contrast-grey)",
  fontWeight: "bold",
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
