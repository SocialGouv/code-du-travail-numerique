"use client";

import {
  useRef,
  useEffect,
  type ReactNode,
  type ReactElement,
  Children,
} from "react";
import { css } from "@styled-system/css";

type MasonryGridProps = {
  children: ReactNode;
  gap?: number;
  id?: string;
};

const getColumnCount = (width: number) => {
  if (width >= 768) return 3;
  if (width >= 576) return 2;
  return 1;
};

export const MasonryGrid = ({ children, gap = 24, id }: MasonryGridProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const layout = () => {
      const items = Array.from(
        container.querySelectorAll<HTMLElement>(":scope > div")
      );
      if (items.length === 0) return;

      const containerWidth = container.offsetWidth;
      const colCount = getColumnCount(containerWidth);

      if (colCount <= 1) {
        container.style.height = "";
        items.forEach((el) => {
          el.style.position = "";
          el.style.left = "";
          el.style.top = "";
          el.style.width = "";
        });
        return;
      }

      const colWidth = (containerWidth - gap * (colCount - 1)) / colCount;
      const colHeights = Array(colCount).fill(0);

      items.forEach((el) => {
        el.style.position = "absolute";
        el.style.width = `${colWidth}px`;
      });

      items.forEach((el) => {
        const h = el.offsetHeight;
        const col = colHeights.indexOf(Math.min(...colHeights));
        el.style.left = `${col * (colWidth + gap)}px`;
        el.style.top = `${colHeights[col]}px`;
        colHeights[col] += h + gap;
      });

      container.style.height = `${Math.max(0, Math.max(...colHeights) - gap)}px`;
    };

    layout();

    const ro = new ResizeObserver(() => layout());
    ro.observe(container);
    return () => ro.disconnect();
  }, [children, gap]);

  const items = Children.toArray(children) as ReactElement[];

  return (
    <div ref={containerRef} id={id} className={masonryContainer}>
      {items.map((child, i) => (
        <div key={(child as ReactElement).key ?? i}>{child}</div>
      ))}
    </div>
  );
};

const masonryContainer = css({
  position: "relative",
  // CSS Grid fallback for SSR before JS hydration
  display: "grid",
  gridTemplateColumns: {
    base: "1fr",
    sm: "repeat(2, 1fr)",
    md: "repeat(3, 1fr)",
  },
  gap: "24px",
  alignItems: "start",
});
