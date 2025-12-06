"use client";

import { ReactNode, useEffect } from "react";
import { css } from "@styled-system/css";
import { PolyfillComponent } from "../config/PolyfillComponent";
import { Footer } from "./footer";
import { Header } from "./header";
import { SkipLinks } from "./SkipLinks";
import { useSearchModal } from "../recherche/modal/SearchModalContext";

type Props = {
  children: ReactNode;
  container?: "fr-container" | "fr-container--fluid";
};

export const DsfrLayout = ({ children, container = "fr-container" }: Props) => {
  const { isOpen, closeModal, openModal } = useSearchModal();

  // Add keyboard shortcut (Cmd+K / Ctrl+K) to open search modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for Cmd+K (Mac) or Ctrl+K (Windows/Linux)
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        if (!isOpen) {
          openModal();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, openModal]);

  return (
    <>
      <PolyfillComponent />
      <div inert={isOpen}>
        <SkipLinks />
      </div>
      {isOpen && (
        <div className={overlayStyle} aria-hidden="true" onClick={closeModal} />
      )}
      <Header />
      <main
        className={`${container} ${printStyle}`}
        id="main"
        role="main"
        inert={isOpen}
      >
        {children}
      </main>
      <Footer inert={isOpen} />
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
  zIndex: 99,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
});
