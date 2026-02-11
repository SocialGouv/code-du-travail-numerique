"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { Button } from "@codegouvfr/react-dsfr/Button";
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

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClose = useCallback(() => {
    onClose();

    setTimeout(() => {
      const desktopBtn = document.getElementById(
        "fr-header-agreement-button-desktop"
      ) as HTMLButtonElement | null;
      const mobileBtn = document.getElementById(
        "fr-header-agreement-button"
      ) as HTMLButtonElement | null;

      (desktopBtn ?? mobileBtn)?.focus();
    }, 100);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      blockScroll();
    } else {
      allowScroll();
    }
  }, [isOpen, blockScroll, allowScroll]);

  useEffect(() => {
    if (!isOpen) return;
    const focusTimer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 100);
    return () => clearTimeout(focusTimer);
  }, [isOpen]);

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

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <div
      ref={modalRef}
      id="agreement-modal"
      className={modalContainer}
      role="dialog"
      aria-modal="true"
      aria-labelledby="agreement-modal-title"
      style={{ zIndex: 2147483647 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className={content}>
        <div className={modalInner}>
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

          <h1
            id="agreement-modal-title"
            className={`${fr.cx("fr-h3", "fr-mb-2w")} ${modalTitle}`}
          >
            Personnaliser mes réponses avec ma convention collective
          </h1>

          <AgreementSelectionModalContent onClose={handleClose} />
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
  zIndex: 2147483647,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "1rem",
  paddingTop: "calc(1rem + env(safe-area-inset-top))",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  md: {
    padding: "2rem",
  },
});

const content = css({
  backgroundColor: "var(--background-default-grey)",
  boxShadow: "0 16px 48px rgba(0, 0, 0, 0.2)",
  borderRadius: "0.5rem",
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
  paddingRight: "4rem",
});
