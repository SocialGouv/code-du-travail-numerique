"use client";

import { ReactNode } from "react";
import { css } from "@styled-system/css";
import { PolyfillComponent } from "../config/PolyfillComponent";
import { Footer } from "./footer";
import { Header } from "./header";
import { SkipLinks } from "./SkipLinks";

type Props = {
  children: ReactNode;
  container?: "fr-container" | "fr-container--fluid";
};

export const DsfrLayout = ({ children, container = "fr-container" }: Props) => {
  return (
    <>
      <PolyfillComponent />
      <SkipLinks />
      <Header />
      <main className={`${container} ${printStyle}`} id="main" role="main">
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
