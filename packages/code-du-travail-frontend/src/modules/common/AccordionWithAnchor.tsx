"use client";

import React, { useEffect, useRef, useState } from "react";
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
  const [anchor, setAnchor] = useState<string | null>(null);
  const refs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    setAnchor(window.location.hash?.substring(1) || null);
  }, []);

  useEffect(() => {
    if (anchor && refs.current[anchor]) {
      refs.current[anchor]?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [anchor]);

  return (
    <div
      className={`${fr.cx("fr-accordions-group")}${className ? ` ${className}` : ""}`}
      data-fr-group="false"
    >
      {items.map((item) => {
        const itemId = item.id ?? slugify(item.title);
        return (
          <Accordion
            titleAs={titleAs}
            id={item.id}
            key={item.id}
            label={item.title}
            defaultExpanded={itemId === anchor}
            ref={(el) => {
              if (el) {
                refs.current[itemId] = el;
              }
            }}
          >
            {item.content}
          </Accordion>
        );
      })}
    </div>
  );
};
