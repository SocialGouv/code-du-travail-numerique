"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { AutocompleteV2 } from "../../common/Autocomplete/AutocompleteV2";
import { css } from "@styled-system/css";
import {
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";
import { fetchSuggestResults } from "../../layout/header/fetchSuggestResults";
import { SUGGEST_MAX_RESULTS, SITE_URL } from "../../../config";
import { useRouter } from "next/navigation";
import { useSearchTracking } from "../tracking";
import * as Sentry from "@sentry/nextjs";
import { SearchFeedback } from "./SearchFeedback";
import { SearchResults } from "./SearchResults";
import { SearchResult, DocumentType } from "./types";

interface ModalSearchProps {
  onClose?: () => void;
  initialQuery?: string;
}

// Fonction pour formater les résultats de l'API vers le format SearchResult
const formatSearchResults = (apiResults: any): SearchResult[] => {
  const results: SearchResult[] = [];

  // Fonction helper pour mapper le type de document
  const getDocumentType = (source: string): DocumentType => {
    const typeMap: Record<string, DocumentType> = {
      modeles_de_courriers: "MODELE DE DOCUMENT",
      themes: "THEME",
      code_du_travail: "ARTICLE DU DROIT DU TRAVAIL",
      contribution: "ARTICLE DU DROIT DU TRAVAIL",
      conventions_collectives: "CONVENTION COLLECTIVE",
    };
    return typeMap[source] || "CONTENU";
  };

  // Ajouter les documents
  if (apiResults.documents) {
    apiResults.documents.slice(0, 2).forEach((doc: any) => {
      results.push({
        id: doc.id || doc.slug,
        type: getDocumentType(doc.source),
        title: doc.title,
        slug: doc.slug,
      });
    });
  }

  // Ajouter les articles
  if (apiResults.articles) {
    apiResults.articles.slice(0, 1).forEach((article: any) => {
      results.push({
        id: article.id || article.slug,
        type: "ARTICLE DU DROIT DU TRAVAIL",
        title: article.title,
        slug: article.slug,
      });
    });
  }

  // Ajouter les thèmes
  if (apiResults.themes) {
    apiResults.themes.slice(0, 1).forEach((theme: any) => {
      results.push({
        id: theme.id || theme.slug,
        type: "THEME",
        title: theme.title,
        slug: theme.slug,
      });
    });
  }

  return results.slice(0, 4); // Max 4 résultats
};

export interface ModalSearchHandle {
  focusInput: () => void;
}

const MIN_SEARCH_LENGTH = 3;

export const ModalSearch = forwardRef<ModalSearchHandle, ModalSearchProps>(
  ({ onClose, initialQuery }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [query, setQuery] = useState(initialQuery || "");
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [hasSearched, setHasSearched] = useState(false);
    const [isLoadingResults, setIsLoadingResults] = useState(false);
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const router = useRouter();
    const { emitSearchEvent, emitSuggestionSelectionEvent } =
      useSearchTracking();

    useImperativeHandle(ref, () => ({
      focusInput: () => {
        inputRef.current?.focus();
      },
    }));

    // Charger les résultats au montage si une query initiale existe
    useEffect(() => {
      if (initialQuery && initialQuery.trim().length >= MIN_SEARCH_LENGTH) {
        const loadInitialResults = async () => {
          setIsLoadingResults(true);
          setHasSearched(true);

          try {
            const results = await fetchSearchResults(initialQuery.trim());
            setSearchResults(results);
          } catch (error) {
            Sentry.captureMessage(
              "Échec lors du chargement des résultats initiaux - " + error
            );
          } finally {
            setIsLoadingResults(false);
          }
        };

        loadInitialResults();
      }
    }, [initialQuery]);

    const handleSearch = (searchTerm: string) => {
      emitSearchEvent(searchTerm.trim());
      router.push(`/recherche?query=${encodeURIComponent(searchTerm.trim())}`);
      onClose?.();
    };

    const fetchSearchResults = async (searchQuery: string) => {
      try {
        const url = `${SITE_URL}/api/search?q=${encodeURIComponent(searchQuery)}`;
        console.log("Fetching search results from:", url);
        const response = await fetch(url);

        if (!response.ok) {
          console.error(
            "Search API error:",
            response.status,
            response.statusText
          );
          throw new Error("Erreur lors de la recherche");
        }

        const data = await response.json();
        console.log("Search API response:", data);
        // Formater et prendre les 4 premiers résultats
        const formattedResults = formatSearchResults(data);
        console.log("Final search results:", formattedResults);
        return formattedResults;
      } catch (error) {
        console.error("fetchSearchResults error:", error);
        Sentry.captureMessage(
          "Échec lors de la recherche des résultats - " + error
        );
        return [];
      }
    };

    const handleButtonClick = async () => {
      if (!query.trim()) return;

      if (hasSearched) {
        // Deuxième clic : aller sur la page de recherche
        handleSearch(query);
      } else {
        // Premier clic : lancer la recherche sur place
        setIsLoadingResults(true);
        setHasSearched(true);

        try {
          const results = await fetchSearchResults(query.trim());
          setSearchResults(results);
        } catch (error) {
          Sentry.captureMessage(
            "Échec lors de la recherche des résultats - " + error
          );
        } finally {
          setIsLoadingResults(false);
        }
      }
    };

    const onSubmit = (e?: React.FormEvent) => {
      e?.preventDefault();
      handleButtonClick();
    };

    const search = async (inputValue: string) => {
      if (inputValue.length < MIN_SEARCH_LENGTH) {
        setSuggestions([]);
        return [];
      }

      try {
        const results = await fetchSuggestResults(inputValue).then((items) =>
          items.slice(0, SUGGEST_MAX_RESULTS)
        );
        setSuggestions(results);
        return results;
      } catch (error) {
        Sentry.captureMessage(
          "Échec lors de la récupération des suggestions - " + error
        );
        return [];
      }
    };

    const onError = (error: any) => {
      Sentry.captureMessage(
        "Échec lors de la récupération des suggestions - " + error
      );
    };

    const onSelectedItemChange = async (value: string | undefined) => {
      if (value) {
        emitSuggestionSelectionEvent(query, value, suggestions);

        // Charger les résultats au lieu de rediriger directement
        setQuery(value);
        setIsLoadingResults(true);
        setHasSearched(true);

        try {
          const results = await fetchSearchResults(value);
          setSearchResults(results);
        } catch (error) {
          Sentry.captureMessage(
            "Échec lors de la recherche des résultats - " + error
          );
        } finally {
          setIsLoadingResults(false);
        }
      }
    };

    const renderSuggestionLabel = (item: string | null): React.ReactNode => {
      if (!item) return "";

      // Always return the item, don't try to highlight if query doesn't match
      if (!query) return item;

      const lowerQuery = query.toLowerCase();
      const lowerItem = item.toLowerCase();
      const index = lowerItem.indexOf(lowerQuery);

      // If query is not found in the suggestion, just return the suggestion as-is
      if (index === -1) return item;

      const beforeMatch = item.substring(0, index);
      const match = item.substring(index, index + query.length);
      const afterMatch = item.substring(index + query.length);

      return (
        <>
          {beforeMatch}
          {match}
          <strong>{afterMatch}</strong>
        </>
      );
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
                renderSuggestion={renderSuggestionLabel}
                label="Recherche"
                hideLabel={true}
                placeholder="Prendre un congé paternité"
                isSearch={false}
                displayNoResult={false}
                inputRef={inputRef}
                onInputValueChange={(value) => {
                  if (value) {
                    setQuery(value);
                    setHasSearched(false);
                  }
                }}
                onChange={onSelectedItemChange}
                onError={onError}
                dataTestId="modal-search-input"
                defaultHighlightedIndex={0}
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

        {!isLoadingResults && hasSearched && (
          <SearchResults results={searchResults} />
        )}
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
