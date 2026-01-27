"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { css } from "@styled-system/css";
import { SearchInput, ModalSearchHandle } from "./SearchInput";
import { SearchResults } from "./SearchResults";
import { useEffect, useRef, useCallback, useState } from "react";
import { HintList } from "./HintList";
import { useSearchResults } from "../hooks/useSearchResults";
import { useHints } from "../hooks/useHints";
import useScrollBlock from "../../utils/useScrollBlock";
import { useBreakpoints } from "src/modules/common/useBreakpoints";
import { PresearchClass } from "src/api";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const modalSearchRef = useRef<ModalSearchHandle>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const resultsTitleRef = useRef<HTMLHeadingElement>(null);
  const noResultMessageRef = useRef<HTMLParagraphElement>(null);
  const [blockScroll, allowScroll] = useScrollBlock();
  const { isBelow } = useBreakpoints();
  const [pendingFocus, setPendingFocus] = useState(false);

  const {
    results,
    queryClass,
    lastPresearchQuery,
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

  const handleFocusRequest = () => {
    setPendingFocus(true);
  };

  // Handle focus after search completes
  useEffect(() => {
    if (pendingFocus && hasSearched && !isLoading) {
      setPendingFocus(false);
      if (results.length > 0) {
        // Focus on results title if there are results
        setTimeout(() => {
          resultsTitleRef.current?.focus();
        }, 100);
      } else {
        // Keep focus on input when there are no results
        setTimeout(() => {
          modalSearchRef.current?.focusInput();
        }, 100);
      }
    }
  }, [pendingFocus, hasSearched, isLoading, results.length]);

  const handleClose = useCallback(() => {
    onClose();

    setTimeout(() => {
      const searchButton = document.getElementById(
        isBelow("lg")
          ? "fr-header-search-button"
          : "fr-header-search-button-desktop"
      ) as HTMLButtonElement;

      if (searchButton) {
        searchButton.focus();
      }
    }, 100);
  }, [isBelow, onClose]);

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
  }, [isOpen, resetSearch]);

  // Handle Escape key - only close modal if autocomplete dropdown is not open
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        // Check if autocomplete dropdown is open
        if (modalSearchRef.current?.isAutocompleteOpen()) {
          // Let the autocomplete handle this escape first
          return;
        }
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, handleClose]);

  // Implement focus trap
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    const modal = modalRef.current;

    const handleTab = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;

      const focusableElements = modal.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];

      if (event.shiftKey) {
        if (document.activeElement === firstFocusable) {
          event.preventDefault();
          lastFocusable?.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          event.preventDefault();
          firstFocusable?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, [isOpen, hasSearched, results.length]);

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      id="search-modal"
      className={overlayContainer}
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-modal-title"
      hidden={!isOpen}
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
              type="button"
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
            onChangeQuery={setQuery}
            hasSearched={hasSearched}
            resultsCount={results.length}
            contextType="modal"
            onFocusRequest={handleFocusRequest}
            noResultMessageRef={noResultMessageRef}
            queryClass={queryClass}
            lastPresearchQuery={lastPresearchQuery}
          />

          {!hasSearched && (
            <HintList
              actualites={actualites}
              suggestions={suggestions}
              isLoading={isHintsLoading}
            />
          )}

          {hasSearched && !isLoading && (
            <SearchResults
              results={results}
              queryClass={queryClass as PresearchClass}
              onResultClick={handleClose}
              contextType="modal"
              titleRef={resultsTitleRef}
            />
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
  marginTop: "1px",
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
