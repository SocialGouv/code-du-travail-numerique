"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { css } from "@styled-system/css";
import { SearchInput, ModalSearchHandle } from "./SearchInput";
import { SearchResults } from "./SearchResults";
import { useEffect, useRef, useCallback } from "react";
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
  const modalRef = useRef<HTMLDivElement>(null);
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

  const handleClose = useCallback(() => {
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
  }, [onClose]);

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

  // Handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
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
    const focusableElements = modal.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    const handleTab = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;

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

  // Set aria-hidden on main content when modal is open
  useEffect(() => {
    if (!isOpen) return;

    const mainContent = document.querySelector("main");
    const header = document.querySelector("header");
    const footer = document.querySelector("footer");

    if (mainContent) mainContent.setAttribute("aria-hidden", "true");
    if (header) header.setAttribute("aria-hidden", "true");
    if (footer) footer.setAttribute("aria-hidden", "true");

    return () => {
      if (mainContent) mainContent.removeAttribute("aria-hidden");
      if (header) header.removeAttribute("aria-hidden");
      if (footer) footer.removeAttribute("aria-hidden");
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
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
