"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { css } from "@styled-system/css";
import { SearchInput, ModalSearchHandle } from "./SearchInput";
import { SearchResults } from "./SearchResults";
import { useEffect, useRef } from "react";
import { HintList } from "./HintList";
import { useSearchResults } from "../hooks/useSearchResults";
import { useHints } from "../hooks/useHints";
import useScrollBlock from "../../utils/useScrollBlock";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const modalSearchRef = useRef<ModalSearchHandle>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [blockScroll, allowScroll] = useScrollBlock();

  const {
    results,
    isLoading,
    hasSearched,
    triggerSearch,
    resetSearch,
    setQuery,
  } = useSearchResults();

  const {
    actualites,
    suggestions,
    fetchHintsData,
    isLoading: isHintsLoading,
  } = useHints();

  useEffect(() => {
    if (isOpen) {
      fetchHintsData();
      blockScroll();
    } else {
      allowScroll();
    }
  }, [isOpen, fetchHintsData, blockScroll, allowScroll]);

  useEffect(() => {
    if (isOpen) {
      resetSearch();
      const focusTimer = setTimeout(() => {
        modalSearchRef.current?.focusInput();
      }, 100);

      return () => {
        clearTimeout(focusTimer);
      };
    }
  }, [isOpen]);

  const handleClose = () => {
    onClose();

    setTimeout(() => {
      const searchButtonDesktop = document.getElementById(
        "fr-header-search-button-desktop"
      ) as HTMLButtonElement;
      const searchButtonMobile = document.getElementById(
        "fr-header-search-button"
      ) as HTMLButtonElement;

      if (searchButtonDesktop) {
        searchButtonDesktop.focus();
      } else if (searchButtonMobile) {
        searchButtonMobile.focus();
      }
    }, 100);
  };

  if (!isOpen) return null;

  return (
    <div
      className={overlayContainer}
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-modal-title"
      hidden={!isOpen}
      inert={!isOpen}
    >
      <div className={modalContent}>
        <div className={fr.cx("fr-container", "fr-pb-8w", "fr-pt-4w")}>
          <div className={closeButtonContainer}>
            <Button
              iconId="fr-icon-close-line"
              iconPosition="right"
              title="Fermer"
              onClick={handleClose}
              priority="tertiary no outline"
              className={closeButton}
              ref={closeButtonRef}
            >
              Fermer
            </Button>
          </div>

          <SearchInput
            ref={modalSearchRef}
            onClose={handleClose}
            onSearchTriggered={triggerSearch}
            onQueryClear={resetSearch}
            isLoadingResults={isLoading}
            hasSearched={hasSearched}
            onChangeQuery={setQuery}
          />

          {!hasSearched && (
            <HintList
              actualites={actualites}
              suggestions={suggestions}
              isLoading={isHintsLoading}
            />
          )}

          {hasSearched && !isLoading && (
            <SearchResults results={results} onResultClick={handleClose} />
          )}
        </div>
      </div>
    </div>
  );
};

const overlayContainer = css({
  position: "fixed",
  left: 0,
  right: 0,
  width: "100%",
  maxHeight: {
    md: "calc(100vh - 116.5px - 56px)",
    base: "calc(100vh - 92.5px)",
  },
  zIndex: 100,
  pointerEvents: "auto",
  overflowY: "auto",
});

const modalContent = css({
  backgroundColor: "var(--background-default-grey)",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  marginTop: "0.4px",
  overflowY: "auto",
  height: "100%",
});

const closeButtonContainer = css({
  position: "absolute",
  top: "1rem",
  right: "1rem",
});

const closeButton = css({
  _hover: {
    backgroundColor: "var(--background-default-grey-hover)!",
  },
});
