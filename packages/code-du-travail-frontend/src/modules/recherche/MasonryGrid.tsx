"use client";

import { Children, type ReactNode, useEffect, useRef } from "react";
import { css } from "@styled-system/css";
import { fr } from "@codegouvfr/react-dsfr";
import { useBreakpoints } from "../common/useBreakpoints";

type MasonryGridProps = {
  children: ReactNode;
  key: string;
  id?: string;
};

const GAP_REM = parseFloat(fr.spacing("3w")); // 1.5rem (DSFR 3w token)

export const MasonryGrid = ({ children, id, key }: MasonryGridProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isMd, isSm } = useBreakpoints();
  const colCount = isMd ? 3 : isSm ? 2 : 1;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const layout = () => {
      const items = Array.from(
        container.querySelectorAll<HTMLElement>(":scope > div")
      );
      if (items.length === 0) return;

      if (colCount <= 1) {
        container.removeAttribute("data-js-layout");
        container.style.height = "";
        items.forEach((el) => {
          el.style.position = "";
          el.style.left = "";
          el.style.top = "";
          el.style.width = "";
        });
        return;
      }

      const rootFontSize = parseFloat(
        getComputedStyle(document.documentElement).fontSize
      );
      const gap = GAP_REM * rootFontSize;
      const containerWidth = container.offsetWidth;
      const colWidth = (containerWidth - gap * (colCount - 1)) / colCount;
      const colHeights = Array(colCount).fill(0);

      // First pass: set widths (writes) then read all heights (single reflow)
      items.forEach((el) => {
        el.style.position = "absolute";
        el.style.width = `${colWidth}px`;
      });
      const heights = items.map((el) => el.offsetHeight);

      // Second pass: write positions only (no reads)
      items.forEach((el, idx) => {
        const col = colHeights.indexOf(Math.min(...colHeights));
        el.style.left = `${col * (colWidth + gap)}px`;
        el.style.top = `${colHeights[col]}px`;
        colHeights[col] += heights[idx] + gap;
      });

      container.style.height = `${Math.max(0, Math.max(...colHeights) - gap)}px`;
      container.dataset.jsLayout = "true";
    };

    layout();

    const ro = new ResizeObserver(() => layout());
    ro.observe(container);
    return () => ro.disconnect();
  }, [colCount, key]);

  return (
    <div ref={containerRef} id={id} className={masonryContainer}>
      {Children.map(children, (child, i) => (
        <div key={i}>{child}</div>
      ))}
    </div>
  );
};

const masonryContainer = css({
  position: "relative",
  // CSS Grid fallback for SSR / before JS hydration
  "&:not([data-js-layout])": {
    display: "grid",
    gridTemplateColumns: {
      base: "1fr",
      sm: "repeat(2, 1fr)",
      md: "repeat(3, 1fr)",
    },
    gap: "1.5rem", // DSFR 3w token
    alignItems: "start",
  },
});
