"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@styled-system/css";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import useScrollBlock from "src/modules/utils/useScrollBlock";
import { AgreementSelectionModalContent } from "src/modules/convention-collective/AgreementSelectionModal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const AgreementModal = ({ isOpen, onClose }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [blockScroll, allowScroll] = useScrollBlock();
  const [mounted, setMounted] = useState(false);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClose = useCallback(() => {
    onClose();

    // Restore focus to the trigger button that opened the modal
    setTimeout(() => {
      if (previousActiveElementRef.current) {
        previousActiveElementRef.current.focus();
        previousActiveElementRef.current = null;
        return;
      }

      const desktopBtn = document.getElementById(
        "fr-header-agreement-button-desktop"
      ) as HTMLButtonElement | null;
      const mobileBtn = document.getElementById(
        "fr-header-agreement-button"
      ) as HTMLButtonElement | null;

      (desktopBtn ?? mobileBtn)?.focus();
    }, 100);
  }, [onClose]);

  // Store the element that had focus before the modal opened
  useEffect(() => {
    if (isOpen) {
      previousActiveElementRef.current =
        document.activeElement as HTMLElement | null;
      blockScroll();
    } else {
      allowScroll();
    }
  }, [isOpen, blockScroll, allowScroll]);

  // Focus the close button when the modal opens
  useEffect(() => {
    if (!isOpen) return;
    const focusTimer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 100);
    return () => clearTimeout(focusTimer);
  }, [isOpen]);

  // Handle Escape key - check if an autocomplete dropdown is open first
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        // Check if any autocomplete dropdown is open inside the modal
        const openListboxes = modalRef.current?.querySelectorAll(
          '[role="listbox"] [role="option"]'
        );
        if (openListboxes && openListboxes.length > 0) {
          // Let the autocomplete component handle this Escape first
          return;
        }
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, handleClose]);

  // Focus trap: keep Tab cycling within the modal
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    const modal = modalRef.current;

    const handleTab = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;

      const focusableElements = modal.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements.length === 0) return;

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
  }, [isOpen]);

  if (!mounted) return null;

  const modalContent = (
    <div
      ref={modalRef}
      id="agreement-modal"
      className={modalContainer}
      role="dialog"
      aria-modal="true"
      aria-labelledby="agreement-modal-title"
      hidden={!isOpen}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className={content} role="document">
        <div className={modalInner}>
          <div className={closeButtonContainer}>
            <button
              className={`${fr.cx("fr-btn", "fr-btn--tertiary-no-outline", "fr-icon-close-line", "fr-btn--sm")} ${closeButton}`}
              title="Fermer la fenêtre de sélection de convention collective"
              aria-label="Fermer la fenêtre de sélection de convention collective"
              onClick={handleClose}
              ref={closeButtonRef}
              type="button"
            />
          </div>

          <p
            id="agreement-modal-title"
            role="heading"
            aria-level={1}
            className={`${fr.cx("fr-mb-2w", "fr-h4")} ${modalTitle}`}
          >
            Personnaliser mes réponses avec ma convention collective
          </p>

          <AgreementSelectionModalContent
            onClose={handleClose}
            isOpen={isOpen}
          />
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

const modalContainer = css({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "1rem",
  paddingTop: "calc(1rem + env(safe-area-inset-top))",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: 1000,
  md: {
    padding: "2rem",
  },
  "&[hidden]": {
    display: "none",
  },
});

const content = css({
  backgroundColor: "var(--background-default-grey)",
  boxShadow: "0 16px 48px rgba(0, 0, 0, 0.2)",
  position: "relative",
  width: "100%",
  maxWidth: "792px",
  maxHeight: "100%",
  overflowY: "auto",
});

const modalInner = css({
  padding: "1.5rem",
  paddingTop: "3rem",
  md: {
    padding: "2rem",
    paddingTop: "3.5rem",
  },
});

const closeButtonContainer = css({
  position: "absolute",
  top: "0.75rem",
  right: "0.75rem",
  zIndex: 1,
});

const closeButton = css({
  _hover: {
    backgroundColor: "var(--background-default-grey-hover)!",
  },
});

const modalTitle = css({
  fontSize: "18px!",
  lineHeight: "1.4!",
  paddingRight: "2.5rem",
});
