"use client";

import { ReactNode, useEffect } from "react";
import { css } from "@styled-system/css";
import { PolyfillComponent } from "../config/PolyfillComponent";
import { Footer } from "./footer";
import { Header } from "./header";
import { SkipLinks } from "./SkipLinks";
import { useSearchModal } from "../recherche/modal/SearchModalContext";
import { useAgreementModal } from "../convention-collective/AgreementSelectionModal";
import { AgreementModal } from "./header/AgreementModal";
import { usePathname } from "next/navigation";

type Props = {
  children: ReactNode;
  container?: "fr-container" | "fr-container--fluid";
};

export const DsfrLayout = ({ children, container = "fr-container" }: Props) => {
  const { isOpen, closeModal, openModal } = useSearchModal();
  const { isOpen: isAgreementOpen, closeModal: closeAgreementModal } =
    useAgreementModal();

  const isAnyModalOpen = isOpen || isAgreementOpen;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();

        // Keep search + agreement mutually exclusive
        if (isAgreementOpen) {
          closeAgreementModal();
        }
        if (!isOpen) openModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, openModal, isAgreementOpen, closeAgreementModal]);

  return (
    <>
      <PolyfillComponent />
      <div inert={isAnyModalOpen}>
        <SkipLinks />
      </div>
      {isOpen && (
        <div
          className={overlayStyle}
          aria-hidden="true"
          onClick={() => {
            closeModal();
          }}
        />
      )}
      <div
        style={
          isAgreementOpen
            ? { position: "relative", zIndex: 0 }
            : isOpen
              ? { position: "relative", zIndex: 1000 }
              : undefined
        }
        inert={isAgreementOpen}
      >
        <Header />
      </div>
      <AgreementModal isOpen={isAgreementOpen} onClose={closeAgreementModal} />
      <main
        className={`${container} ${printStyle}`}
        id="main"
        role="main"
        inert={isAnyModalOpen}
      >
        {children}
      </main>
      <Footer inert={isAnyModalOpen} />
    </>
  );
};

const printStyle = css({
  "@media print": {
    "& *": {
      "-webkit-print-color-adjust":
        "exact !important" /* Chrome, Safari 6 – 15.3, Edge */,
      "color-adjust": "exact !important" /* Firefox 48 – 96 */,
      "print-color-adjust": "exact !important" /* Firefox 97+, Safari 15.4+ */,
    } as any,
    forcedColorAdjust: "auto !important",
  },
});

const overlayStyle = css({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: 999,
});
