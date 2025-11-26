"use client";

import { ReactNode } from "react";
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
  const { isOpen, closeModal } = useSearchModal();

  return (
    <>
      <PolyfillComponent />
      <SkipLinks />
      <Header />
      <main className={`${container} ${printStyle}`} id="main" role="main">
        {isOpen && (
          <div
            className={overlayStyle}
            aria-hidden="true"
            onClick={closeModal}
          />
        )}
        {children}
      </main>
      <Footer />
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
  zIndex: 100,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
});
