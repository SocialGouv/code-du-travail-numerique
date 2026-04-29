"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { css } from "@styled-system/css";
import { ModalSearchHandle, SearchInput } from "./SearchInput";
import { SearchResults } from "./SearchResults";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { HintList } from "./HintList";
import { useSearchResults } from "../hooks/useSearchResults";
import { useHints } from "../hooks/useHints";
import useScrollBlock from "../../utils/useScrollBlock";
import { useBreakpoints } from "src/modules/common/useBreakpoints";
import { SearchResult } from "src/api";
import {
  consumeSearchSnapshot,
  saveSearchSnapshot,
  SearchSnapshotFocusTarget,
} from "../hooks/searchSnapshot";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MODAL_SEE_ALL_BUTTON_ID = "search-see-all-button-modal";
const modalResultCardId = (cdtnId: string) =>
  `search-result-card-modal-${cdtnId}`;

export const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const modalSearchRef = useRef<ModalSearchHandle>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const resultsTitleRef = useRef<HTMLHeadingElement>(null);
  const noResultMessageRef = useRef<HTMLParagraphElement>(null);
  const [blockScroll, allowScroll] = useScrollBlock();
  const { isBelow } = useBreakpoints();
  const [pendingFocus, setPendingFocus] = useState(false);
  const [initialQuery, setInitialQuery] = useState<string | undefined>();
  const [pendingRestoreFocus, setPendingRestoreFocus] =
    useState<SearchSnapshotFocusTarget | null>(null);
  const pathname = usePathname();

  const {
    definition,
    results,
    queryClass,
    lastPresearchQuery,
    isLoading,
    hasSearched,
    triggerSearch,
    resetSearch,
    hydrate,
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

  // Handle focus after a fresh (non-restored) search completes.
  useEffect(() => {
    if (pendingRestoreFocus) return;
    if (pendingFocus && hasSearched && !isLoading) {
      setPendingFocus(false);
      if (results.length > 0) {
        setTimeout(() => {
          resultsTitleRef.current?.focus();
        }, 100);
      } else {
        setTimeout(() => {
          modalSearchRef.current?.focusInput();
        }, 100);
      }
    }
  }, [
    pendingFocus,
    hasSearched,
    isLoading,
    results.length,
    pendingRestoreFocus,
  ]);

  // Move focus to the previously-selected target after restored content renders.
  useEffect(() => {
    if (!pendingRestoreFocus) return;
    if (!hasSearched || isLoading) return;

    const focusTimer = window.setTimeout(() => {
      const target =
        pendingRestoreFocus.kind === "see-all"
          ? document.getElementById(MODAL_SEE_ALL_BUTTON_ID)
          : document.getElementById(
              modalResultCardId(pendingRestoreFocus.cdtnId)
            );
      target?.focus();
      setPendingRestoreFocus(null);
    }, 150);

    return () => window.clearTimeout(focusTimer);
  }, [pendingRestoreFocus, hasSearched, isLoading, results.length]);

  const handleClose = useCallback(
    (shouldFocusSearchButton = true) => {
      onClose();

      if (shouldFocusSearchButton) {
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
      }
    },
    [isBelow, onClose]
  );

  useEffect(() => {
    if (isOpen) {
      fetchHintsData();
      blockScroll();
    } else {
      allowScroll();
    }
  }, [isOpen, fetchHintsData, blockScroll, allowScroll]);

  // When the modal opens, either hydrate from a matching snapshot (back
  // navigation) or reset to a fresh search and focus the input.
  useEffect(() => {
    if (!isOpen) return;

    const snapshot = consumeSearchSnapshot(
      (s) =>
        s.origin === "modal" &&
        s.originPath === pathname &&
        s.results.length > 0
    );

    if (snapshot) {
      hydrate({
        query: snapshot.query,
        definition: snapshot.definition,
        results: snapshot.results,
        queryClass: snapshot.queryClass,
        lastPresearchQuery: snapshot.lastPresearchQuery,
      });
      setInitialQuery(snapshot.query);
      setPendingRestoreFocus(snapshot.focusTarget);
      return;
    }

    resetSearch();
    setInitialQuery(undefined);
    const focusTimer = setTimeout(() => {
      modalSearchRef.current?.focusInput();
    }, 100);

    return () => {
      clearTimeout(focusTimer);
    };
  }, [isOpen, pathname, resetSearch, hydrate]);

  // Handle Escape key - only close modal if autocomplete dropdown is not open
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (modalSearchRef.current?.isAutocompleteOpen()) {
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

  const buildSnapshotBase = (normalizedQuery: string) => ({
    origin: "modal" as const,
    originPath: pathname ?? undefined,
    query: normalizedQuery,
    definition,
    results,
    queryClass,
    lastPresearchQuery,
  });

  const handleBeforeSeeAllNavigation = (normalizedQuery: string) => {
    if (results.length === 0) return;
    saveSearchSnapshot({
      ...buildSnapshotBase(normalizedQuery),
      focusTarget: { kind: "see-all" },
    });
  };

  const handleResultClick = (result: SearchResult) => {
    if (!result.cdtnId) {
      handleClose(false);
      return;
    }
    saveSearchSnapshot({
      ...buildSnapshotBase(lastPresearchQuery ?? ""),
      focusTarget: { kind: "result", cdtnId: result.cdtnId },
    });
    handleClose(false);
  };

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
              onClick={() => handleClose()}
              priority="tertiary no outline"
              className={closeButton}
              ref={closeButtonRef}
              type="button"
            >
              Fermer
            </Button>
          </div>

          <SearchInput
            key={`modal-${initialQuery ?? "__fresh__"}`}
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
            initialQuery={initialQuery}
            onBeforeSeeAllNavigation={handleBeforeSeeAllNavigation}
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
              definition={definition}
              results={results}
              queryClass={queryClass}
              onResultClick={handleResultClick}
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
  pointerEvents: "auto",
  overflowY: "auto",
  zIndex: 1000,
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
