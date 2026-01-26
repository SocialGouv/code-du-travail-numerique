"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { css } from "@styled-system/css";
import { useRef, forwardRef, useImperativeHandle, useState } from "react";
import { SUGGEST_MAX_RESULTS } from "../../../config";
import { useRouter } from "next/navigation";
import { useSearchTracking } from "../tracking";
import { SearchFeedback } from "./SearchFeedback";
import { useSuggestions } from "../hooks/useSuggestions";
import { MinSearchLengthHint } from "./MinSearchLengthHint";
import { HomemadeAutocomplete } from "src/modules/common/Autocomplete";
import { PresearchClass } from "src/api";

interface ModalSearchProps {
  onClose?: () => void;
  initialQuery?: string;
  onSearchTriggered?: (searchQuery?: string) => void;
  onQueryClear?: () => void;
  isLoadingResults?: boolean;
  onChangeQuery: (s: string) => void;
  hasSearched: boolean;
  resultsCount: number;
  contextType: "modal" | "home";
  onSearchSubmit?: (hasResults: boolean) => void;
  onFocusRequest?: () => void;
  noResultMessageRef?: React.RefObject<HTMLParagraphElement | null>;
  queryClass?: PresearchClass;
}

export interface ModalSearchHandle {
  focusInput: () => void;
  isAutocompleteOpen: () => boolean;
}

const MIN_SEARCH_LENGTH = 3;

export const SearchInput = forwardRef<ModalSearchHandle, ModalSearchProps>(
  (
    {
      onClose,
      initialQuery,
      onSearchTriggered,
      onQueryClear,
      isLoadingResults = false,
      onChangeQuery,
      hasSearched = false,
      resultsCount = 0,
      contextType,
      onSearchSubmit,
      onFocusRequest,
      noResultMessageRef,
      queryClass = undefined,
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [query, setQuery] = useState(initialQuery || "");
    const [isAutocompleteOpen, setIsAutocompleteOpen] = useState(false);
    const router = useRouter();
    const { emitClickSeeAllResultsEvent, emitSuggestionSelectionEvent } =
      useSearchTracking();
    const { suggestions, fetchSuggestions, clearSuggestions } =
      useSuggestions();

    useImperativeHandle(ref, () => ({
      focusInput: () => {
        inputRef.current?.focus();
      },
      isAutocompleteOpen: () => isAutocompleteOpen,
    }));

    const handleSearch = () => {
      if (!query.trim()) return;
      emitClickSeeAllResultsEvent(query.trim(), queryClass);
      router.push(`/recherche?query=${encodeURIComponent(query.trim())}`);
      onClose?.();
    };

    const onSubmit = (e?: React.FormEvent) => {
      e?.preventDefault();
      if (!query.trim() || query.trim().length < MIN_SEARCH_LENGTH) return;
      clearSuggestions();
      inputRef.current?.blur();
      onSearchTriggered?.(query.trim());
      onFocusRequest?.();
    };

    const handleEnterPress = () => {
      if (!query.trim() || query.trim().length < MIN_SEARCH_LENGTH) return;
      clearSuggestions();
      onSearchTriggered?.(query.trim());
      onFocusRequest?.();
    };

    const search = async (inputValue: string) => {
      if (inputValue.length < MIN_SEARCH_LENGTH) {
        clearSuggestions();
        return [];
      }

      return await fetchSuggestions(inputValue, SUGGEST_MAX_RESULTS);
    };

    const onError = (error: any) => {
      console.error("Autocomplete error:", error);
    };

    const onSelectedItemChange = async (value: string | undefined) => {
      if (value) {
        emitSuggestionSelectionEvent(query, value);

        onChangeQuery(value);
        setQuery(value);
        onSearchTriggered?.(value);
        onFocusRequest?.();
      } else {
        onChangeQuery("");
        setQuery("");
        onQueryClear?.();
      }
    };

    const inputId = `${contextType}-search-autocomplete`;
    const labelId = `${contextType}-search-label`;
    const feedbackId = `${contextType}-search-feedback`;
    const minSearchHintId = `${contextType}-min-search-length-hint`;
    const noResultParagraphId = `${contextType}-no-result-message`;
    const ariaDescribedbyIds = `${minSearchHintId} ${noResultParagraphId}`;

    return (
      <div className={fr.cx("fr-mt-2w")}>
        <form onSubmit={onSubmit} role="search" aria-label="Recherche">
          <div className={searchContainerStyle}>
            <div className={autocompleteWrapper}>
              <label
                htmlFor={inputId}
                id={labelId}
                className={fr.cx("fr-label")}
              >
                {contextType === "home" ? (
                  <h2 className={fr.cx("fr-text--md", "fr-mb-1w")}>
                    Que souhaitez-vous savoir ?
                  </h2>
                ) : (
                  <h1 className={fr.cx("fr-text--md", "fr-mb-1w")}>
                    Que souhaitez-vous savoir ?
                  </h1>
                )}
                <p className={fr.cx("fr-text--sm", "fr-mb-2w", "fr-hint-text")}>
                  par exemple : Comment sont comptés les congés pendant les
                  arrêts maladies ?
                </p>
              </label>
              <HomemadeAutocomplete<string>
                id={inputId}
                search={search}
                displayLabel={(item: string | null) => item ?? ""}
                highlightQuery={true}
                label="Recherche"
                hideLabel={true}
                isSearch={false}
                displayNoResult={false}
                inputRef={inputRef}
                ariaDescribedby={ariaDescribedbyIds}
                onInputValueChange={(value) => {
                  setQuery(value || "");
                  onChangeQuery(value || "");
                  if (!value || value.trim() === "") {
                    onQueryClear?.();
                  }
                }}
                onChange={onSelectedItemChange}
                onError={onError}
                dataTestId={`search-${contextType}-input`}
                onDropdownOpenChange={setIsAutocompleteOpen}
                onEnterPress={handleEnterPress}
              />
            </div>
            <MinSearchLengthHint
              paragraphId={minSearchHintId}
              isVisible={!isLoadingResults && query.length < MIN_SEARCH_LENGTH}
              minSearchLength={MIN_SEARCH_LENGTH}
              variant="mobile"
            />
            <Button
              iconId="fr-icon-search-line"
              iconPosition="right"
              priority="primary"
              type="button"
              onClick={handleSearch}
              className={searchButton}
            >
              Voir tous les résultats
            </Button>
          </div>
        </form>

        <SearchFeedback
          id={feedbackId}
          isSearching={isLoadingResults}
          query={query}
          minSearchLength={MIN_SEARCH_LENGTH}
          hasSearched={hasSearched}
          resultsCount={resultsCount}
          noResultMessageRef={noResultMessageRef}
          noResultParagraphId={noResultParagraphId}
        />
      </div>
    );
  }
);

SearchInput.displayName = "ModalSearch";

const autocompleteWrapper = css({
  flex: 1,
  width: "100%",
});

const searchButton = css({
  minHeight: {
    md: "76px!",
    base: "40px!",
  },
  flexShrink: 0,
  alignSelf: {
    md: "flex-end",
  },
  mdDown: {
    width: "100%!",
    justifyContent: "center!",
  },
});

const searchContainerStyle = css({
  display: "flex",
  flexDirection: {
    base: "column",
    md: "row",
  },
  alignItems: {
    base: "stretch",
    md: "flex-start",
  },
  "& > *:not(:last-child)": {
    marginBottom: {
      base: "8px",
      md: "0",
    },
    marginRight: {
      base: "0",
      md: "16px",
    },
  },
});
