"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { css } from "@styled-system/css";
import { ModalSearch, ModalSearchHandle } from "./ModalSearch";
import { SearchResults } from "./SearchResults";
import { useEffect, useRef, useState } from "react";
import { HintList } from "./HintList";
import { useSearchResults } from "../hooks/useSearchResults";
import { useHints } from "../hooks/useHints";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const modalSearchRef = useRef<ModalSearchHandle>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

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
    }
  }, [isOpen, fetchHintsData]);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      resetSearch();
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 10);

      const focusTimer = setTimeout(() => {
        modalSearchRef.current?.focusInput();
      }, 350);

      return () => {
        clearTimeout(timer);
        clearTimeout(focusTimer);
      };
    } else if (shouldRender) {
      setIsVisible(false);

      const unmountTimer = setTimeout(() => {
        setShouldRender(false);
        const searchButtonDesktop = document.getElementById(
          "fr-header-search-button-desktop"
        ) as HTMLButtonElement;
        const searchButtonMobile = document.getElementById(
          "fr-header-search-button"
        ) as HTMLButtonElement;

        if (searchButtonDesktop) {
          searchButtonDesktop.focus();
        }
        if (searchButtonMobile) {
          searchButtonMobile.focus();
        }
      }, 300);

      return () => {
        clearTimeout(unmountTimer);
      };
    }
  }, [isOpen, shouldRender]);

  const handleClose = () => {
    onClose();
  };

  if (!shouldRender) return null;

  return (
    <>
      <div
        className={`${backdropOverlay} ${isVisible ? backdropVisible : ""}`}
        onClick={handleClose}
        aria-hidden="true"
      />
      <div className={`${overlayContainer} ${isVisible ? overlayVisible : ""}`}>
        <div className={modalContent} onClick={(e) => e.stopPropagation()}>
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

            <ModalSearch
              ref={modalSearchRef}
              onClose={handleClose}
              onSearchTriggered={triggerSearch}
              onQueryClear={resetSearch}
              isLoadingResults={isLoading}
              hasSearched={hasSearched}
              setQuery={setQuery}
            />

            {!hasSearched && (
              <HintList
                actualites={actualites}
                suggestions={suggestions}
                isLoading={isHintsLoading}
              />
            )}

            {hasSearched && <SearchResults results={results} />}
          </div>
        </div>
      </div>
    </>
  );
};

const backdropOverlay = css({
  position: "fixed",
  top: "var(--header-height)",
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: 99,
  opacity: 0,
  transition: "opacity 0.3s ease",
  pointerEvents: "none",
});

const backdropVisible = css({
  opacity: 1,
  pointerEvents: "auto",
});

const overlayContainer = css({
  position: "absolute",
  width: "100%",
  minHeight: "calc(100vh - var(--header-height))",
  zIndex: 100,
  opacity: 0,
  transition: "opacity 0.3s ease, transform 0.3s ease",
  pointerEvents: "none",
});

const modalContent = css({
  backgroundColor: "var(--background-default-grey)",
  minHeight: "400px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  pointerEvents: "auto",
  marginTop: "1px",
});

const overlayVisible = css({
  opacity: 1,
  transform: "translateY(0)",
});

const closeButtonContainer = css({
  position: "absolute",
  top: "1rem",
  right: "1rem",
  zIndex: 10,
});

const closeButton = css({
  _hover: {
    backgroundColor: "var(--background-default-grey-hover)!",
  },
});
