"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { AutocompleteV2 } from "../../common/Autocomplete/AutocompleteV2";
import { css } from "@styled-system/css";
import { useRef, forwardRef, useImperativeHandle, useState } from "react";
import { SUGGEST_MAX_RESULTS } from "../../../config";
import { useRouter } from "next/navigation";
import { useSearchTracking } from "../tracking";
import { SearchFeedback } from "./SearchFeedback";
import { useSuggestions } from "../hooks/useSuggestions";

interface ModalSearchProps {
  onClose?: () => void;
  initialQuery?: string;
  onSearchTriggered?: () => void;
  onQueryClear?: () => void;
  isLoadingResults?: boolean;
  hasSearched?: boolean;
}

export interface ModalSearchHandle {
  focusInput: () => void;
}

const MIN_SEARCH_LENGTH = 3;

export const ModalSearch = forwardRef<ModalSearchHandle, ModalSearchProps>(
  (
    {
      onClose,
      initialQuery,
      onSearchTriggered,
      onQueryClear,
      isLoadingResults = false,
      hasSearched = false,
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [query, setQuery] = useState(initialQuery || "");
    const [displayedResultsQuery, setDisplayedResultsQuery] = useState<
      string | null
    >(null);
    const router = useRouter();
    const { emitSearchEvent, emitSuggestionSelectionEvent } =
      useSearchTracking();
    const { suggestions, fetchSuggestions, clearSuggestions } =
      useSuggestions();

    useImperativeHandle(ref, () => ({
      focusInput: () => {
        inputRef.current?.focus();
      },
    }));

    const handleSearch = (searchTerm: string) => {
      emitSearchEvent(searchTerm.trim());
      router.push(`/recherche?query=${encodeURIComponent(searchTerm.trim())}`);
      onClose?.();
    };

    const handleButtonClick = () => {
      if (!query.trim()) return;

      if (hasSearched && displayedResultsQuery === query.trim()) {
        handleSearch(query);
      } else {
        setDisplayedResultsQuery(query.trim());
        onSearchTriggered?.();
      }
    };

    const onSubmit = (e?: React.FormEvent) => {
      e?.preventDefault();
      if (!query.trim()) return;
      setDisplayedResultsQuery(query.trim());
      onSearchTriggered?.();
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
        emitSuggestionSelectionEvent(query, value, suggestions);

        setQuery(value);
        setDisplayedResultsQuery(value);
        onSearchTriggered?.();
      } else {
        setQuery("");
        setDisplayedResultsQuery(null);
        onQueryClear?.();
      }
    };

    return (
      <div className={fr.cx("fr-mt-2w")}>
        <h1 className={fr.cx("fr-text--md", "fr-mb-1w")}>
          Que souhaitez-vous savoir ?
        </h1>
        <p className={fr.cx("fr-text--sm", "fr-mb-2w", "fr-hint-text")}>
          par exemple : Comment sont comptés les congés pendant les arrêts
          maladies ?
        </p>
        <form onSubmit={onSubmit}>
          <div className={searchContainerStyle}>
            <div className={autocompleteWrapper}>
              <AutocompleteV2<string>
                search={search}
                displayLabel={(item: string | null) => item ?? ""}
                highlightQuery={true}
                label="Recherche"
                hideLabel={true}
                isSearch={false}
                displayNoResult={false}
                inputRef={inputRef}
                onInputValueChange={(value) => {
                  setQuery(value || "");
                  if (!value || value.trim() === "") {
                    setDisplayedResultsQuery(null);
                    onQueryClear?.();
                  }
                }}
                onChange={onSelectedItemChange}
                onError={onError}
                dataTestId="modal-search-input"
              />
            </div>
            <Button
              iconId="fr-icon-search-line"
              iconPosition="right"
              priority="primary"
              type="button"
              onClick={handleButtonClick}
              className={searchButton}
            >
              Voir tous les résultats
            </Button>
          </div>
        </form>

        <SearchFeedback
          isSearching={isLoadingResults}
          query={query}
          minSearchLength={MIN_SEARCH_LENGTH}
        />
      </div>
    );
  }
);

ModalSearch.displayName = "ModalSearch";

const autocompleteWrapper = css({
  flex: 1,
  width: "100%",
  "& .fr-input-group": {
    marginBottom: "0!",
    width: "100%!",
  },
  "& .fr-label": {
    display: "none!",
  },
  "& .fr-input-wrap": {
    marginTop: "0!",
    width: "100%!",
  },
  "& input.fr-input": {
    height: "76px!",
    padding: "0.75rem 3rem 0.75rem 1rem!",
    width: "100%!",
    boxSizing: "border-box!",
    minHeight: "76px!",
    maxHeight: "76px!",
  },
});

const searchButton = css({
  height: "76px",
  flexShrink: 0,
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
