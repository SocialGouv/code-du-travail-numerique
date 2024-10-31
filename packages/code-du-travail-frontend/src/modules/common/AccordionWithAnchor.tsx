"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { slugify } from "@socialgouv/cdtn-utils";
import Accordion from "@codegouvfr/react-dsfr/Accordion";
import { fr } from "@codegouvfr/react-dsfr";

export type Props = {
  titleAs?: `h${2 | 3 | 4 | 5 | 6}`;
  items: {
    id?: string;
    title: string;
    content: React.ReactElement;
  }[];
};

export const AccordionWithAnchor = ({
  items,
  titleAs = "h2",
}: Props): React.ReactElement => {
  const path = useRouter();
  const [anchor, setAnchor] = useState<string | null>();
  const [expandedIds, setExpandedIds] = React.useState<string[]>([]);
  const refs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const hash = window.location.hash?.substring(1);
    if (hash) {
      setExpandedIds([hash]);
      setAnchor(hash);
    }
  }, [path]);

  useEffect(() => {
    if (anchor) {
      const anchorElement = document?.querySelector(`#${anchor}__toggle-btn`);
      if (anchorElement) {
        anchorElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
  }, [anchor]);

  const itemsWithId = items.map(({ id, ...item }) => {
    return {
      ...item,
      id: id ?? slugify(item.title),
    };
  });

  const onExpandedChange = (id: string, expanded: boolean) => {
    let value: string[];
    if (expanded) {
      value = expandedIds.concat([id]);
    } else {
      value = expandedIds.filter((item) => item !== id);
    }
    setExpandedIds([...new Set(value)]);
  };

  if (items.length === 0) {
    return <></>;
  }

  return (
    <div className={fr.cx("fr-accordions-group")} data-fr-group="false">
      {itemsWithId.map((item) => (
        <Accordion
          titleAs={titleAs}
          id={item.id}
          key={item.id}
          label={item.title}
          onExpandedChange={(expanded) => {
            onExpandedChange(item.id, expanded);
          }}
          expanded={expandedIds.includes(item.id)}
          ref={(el) => (refs.current[item.id] = el)}
        >
          {item.content}
        </Accordion>
      ))}
    </div>
  );
};
