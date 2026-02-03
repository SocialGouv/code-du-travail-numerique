"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { css } from "@styled-system/css";
import { useCallback, useEffect, useRef } from "react";
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

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      id="agreement-modal"
      className={modalContainer}
      role="dialog"
      aria-modal="true"
      aria-labelledby="agreement-modal-title"
      hidden={!isOpen}
    >
      <div className={content}>
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

          <h1 id="agreement-modal-title" className={fr.cx("fr-h3", "fr-mb-2w")}>
            Sélectionner ma convention collective
          </h1>

          <AgreementSelectionModalContent onClose={handleClose} />
        </div>
      </div>
    </div>
  );
};

const modalContainer = css({
  position: "fixed",
  top: "calc(50% + 40px)",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 1000,
  width: "calc(100% - 2rem)",
  maxWidth: "792px",
  maxHeight: "calc(100vh - 4rem)",
  overflowY: "auto",
  paddingTop: "env(safe-area-inset-top)",
});

const content = css({
  backgroundColor: "var(--background-default-grey)",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: "0.25rem",
  position: "relative",
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
