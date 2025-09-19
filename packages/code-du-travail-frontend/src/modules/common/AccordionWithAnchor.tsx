"use client";

import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { slugify } from "@socialgouv/cdtn-utils";
import Accordion from "@codegouvfr/react-dsfr/Accordion";
import { fr } from "@codegouvfr/react-dsfr";

export type Props = {
  className?: string;
  titleAs?: `h${2 | 3 | 4 | 5 | 6}`;
  items: {
    id?: string;
    title: string;
    content: React.ReactElement;
  }[];
};

export const AccordionWithAnchor = ({
  className,
  items,
  titleAs = "h2",
}: Props): React.ReactElement => {
  const path = useRouter();
  const [anchor, setAnchor] = useState<string | null>(null);
  const [itemsWithId, setItemsToDisplay] = useState<
    {
      id: string;
      expended: boolean;
      title: string;
      content: React.ReactElement;
    }[]
  >([]);
  const [isClient, setIsClient] = useState(false);
  const refs = useRef<Record<string, HTMLDivElement | null>>({});

  const setRef = useCallback(
    (id: string) => (el: HTMLDivElement | null) => {
      refs.current[id] = el;
    },
    []
  );

  // Initialize items with consistent state for SSR/SSG
  useEffect(() => {
    setIsClient(true);

    if (items.length && !itemsWithId.length) {
      // First, initialize items with no expanded state to match SSR
      const initialItems = items.map(({ id, ...item }) => {
        const idDefaulted = id ?? slugify(item.title);
        return {
          ...item,
          id: idDefaulted,
          expended: false, // Always false initially for SSR consistency
        };
      });

      setItemsToDisplay(initialItems);
    }
  }, [items.length]);

  // Handle hash-based expansion only after client-side hydration
  useEffect(() => {
    if (!isClient || !itemsWithId.length) return;

    const hash = window.location.hash?.substring(1);
    if (hash) {
      setAnchor(hash);

      // Update items to expand the one matching the hash
      setItemsToDisplay((prevItems) =>
        prevItems.map((item) => ({
          ...item,
          expended: item.id === hash,
        }))
      );
    }
  }, [isClient, itemsWithId.length, path]);

  // Handle scrolling to anchor
  useEffect(() => {
    if (anchor && refs.current[anchor]) {
      // Small delay to ensure DOM is updated after expansion
      setTimeout(() => {
        refs.current[anchor]?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    }
  }, [anchor]);

  if (items.length === 0) {
    return <></>;
  }

  return (
    <div
      className={`${fr.cx("fr-accordions-group")}${className ? ` ${className}` : ""}`}
      data-fr-group="false"
    >
      {itemsWithId.map((item) => (
        <Accordion
          titleAs={titleAs}
          id={item.id}
          key={item.id}
          label={item.title}
          defaultExpanded={item.expended}
          ref={setRef(item.id)}
        >
          {item.content}
        </Accordion>
      ))}
    </div>
  );
};
