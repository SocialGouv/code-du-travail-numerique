"use client";

import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@styled-system/css";
import { Button } from "@codegouvfr/react-dsfr/Button";
import Input from "@codegouvfr/react-dsfr/Input";
import { SearchResultsByCategory } from "./types";
import { SearchResultCard } from "./SearchResultCard";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  results: SearchResultsByCategory;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
}

const modal = createModal({
  id: "search-modal-v2",
  isOpenedByDefault: false,
});

export const SearchModal = ({
  isOpen,
  onClose,
  searchQuery,
  results,
  onSearchChange,
  onClearSearch,
}: SearchModalProps) => {
  return (
    <modal.Component
      title=""
      size="large"
      className={modalCustom}
      concealingBackdrop={false}
    >
      <div className={modalContent}>
        {/* Search input section */}
        <div className={searchSection}>
          <div className={fr.cx("fr-container")}>
            <h2 className={fr.cx("fr-text--md", "fr-mb-2w")}>
              Que souhaitez-vous savoir ?
            </h2>
            <p className={fr.cx("fr-text--sm", "fr-mb-2w", "fr-text--regular")}>
              par exemple : Comment sont comptés les congés pendant les arrêts
              maladies ?
            </p>
            <div className={inputContainer}>
              <div className={inputWrapper}>
                <Input
                  label=""
                  hideLabel
                  nativeInputProps={{
                    type: "text",
                    value: searchQuery,
                    onChange: (e) => onSearchChange(e.target.value),
                    placeholder: "Prendre un congé paternité",
                  }}
                  className={fr.cx("fr-mb-0")}
                />
                {searchQuery && (
                  <button
                    className={clearButton}
                    onClick={onClearSearch}
                    type="button"
                    aria-label="Effacer"
                  >
                    <span
                      className={fr.cx("fr-icon-close-circle-fill")}
                      aria-hidden="true"
                    />
                  </button>
                )}
              </div>
              <Button
                iconId="fr-icon-search-line"
                iconPosition="right"
                priority="primary"
                className={searchButton}
              >
                Voir tous les résultats
              </Button>
            </div>
          </div>
        </div>

        {/* Hint text */}
        <div className={fr.cx("fr-container", "fr-mt-4w")}>
          <p className={hintText}>
            Tapez 3 caractères ou plus pour lancer une recherche
          </p>
        </div>

        {/* Results sections */}
        <div className={fr.cx("fr-container", "fr-mt-4w", "fr-pb-6w")}>
          {/* Actualité section */}
          {results.actualites.length > 0 && (
            <div className={fr.cx("fr-mb-6w")}>
              <div className={sectionHeader}>
                <span
                  className={fr.cx("fr-icon-newspaper-line")}
                  aria-hidden="true"
                />
                <h3
                  className={fr.cx("fr-text--md", "fr-mb-0", "fr-text--bold")}
                >
                  ACTUALITÉ
                </h3>
              </div>
              <div
                className={fr.cx(
                  "fr-grid-row",
                  "fr-grid-row--gutters",
                  "fr-mt-3w"
                )}
              >
                {results.actualites.map((result) => (
                  <div
                    key={result.id}
                    className={fr.cx("fr-col-12", "fr-col-sm-6", "fr-col-lg-3")}
                  >
                    <SearchResultCard result={result} onClick={onClose} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Suggestions section */}
          {results.suggestions.length > 0 && (
            <div className={fr.cx("fr-mb-6w")}>
              <div className={sectionHeader}>
                <span
                  className={fr.cx("fr-icon-lightbulb-line")}
                  aria-hidden="true"
                />
                <h3
                  className={fr.cx("fr-text--md", "fr-mb-0", "fr-text--bold")}
                >
                  SUGGESTIONS
                </h3>
              </div>
              <div
                className={fr.cx(
                  "fr-grid-row",
                  "fr-grid-row--gutters",
                  "fr-mt-3w"
                )}
              >
                {results.suggestions.map((result) => (
                  <div
                    key={result.id}
                    className={fr.cx("fr-col-12", "fr-col-sm-6", "fr-col-lg-3")}
                  >
                    <SearchResultCard result={result} onClick={onClose} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </modal.Component>
  );
};

// Export modal control methods
export const openSearchModal = () => modal.open();
export const closeSearchModal = () => modal.close();

const modalCustom = css({
  "& .fr-modal__body": {
    maxHeight: "90vh",
    overflowY: "auto",
  },
});

const modalContent = css({
  width: "100%",
});

const searchSection = css({
  paddingTop: "2rem",
  paddingBottom: "2rem",
  backgroundColor: "var(--background-alt-grey)",
});

const inputContainer = css({
  display: "flex",
  gap: "1rem",
  alignItems: "flex-start",
  mdDown: {
    flexDirection: "column",
  },
});

const inputWrapper = css({
  position: "relative",
  flex: 1,
  width: "100%",
});

const clearButton = css({
  position: "absolute",
  right: "0.75rem",
  top: "50%",
  transform: "translateY(-50%)",
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
  padding: "0.5rem",
  display: "flex",
  alignItems: "center",
  color: "var(--text-default-grey)",
  fontSize: "1.25rem",
  zIndex: 1,
  _hover: {
    color: "var(--text-action-high-blue-france)",
  },
});

const searchButton = css({
  whiteSpace: "nowrap",
  mdDown: {
    width: "100%!",
  },
});

const hintText = css({
  fontSize: "0.875rem",
  color: "var(--text-mention-grey)",
  textAlign: "center",
  margin: "0",
});

const sectionHeader = css({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  color: "var(--text-action-high-blue-france)",
});
