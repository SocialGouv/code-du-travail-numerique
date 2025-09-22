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
  const [anchor, setAnchor] = useState<string | null>();
  const [itemsWithId, setItemsToDisplay] = useState<
    {
      id: string;
      expended: boolean;
      title: string;
      content: React.ReactElement;
    }[]
  >([]);
  const refs = useRef<Record<string, HTMLDivElement | null>>({});

  const setRef = useCallback(
    (id: string) => (el: HTMLDivElement | null) => {
      refs.current[id] = el;
    },
    []
  );

  useEffect(() => {
    const hash = window.location.hash?.substring(1);
    setAnchor(hash);
    if (items.length && !itemsWithId.length) {
      const itemsWithId = items.map(({ id, ...item }) => {
        const idDefaulted = id ?? slugify(item.title);
        return {
          ...item,
          id: idDefaulted,
          expended: hash === idDefaulted,
        };
      });

      setItemsToDisplay(itemsWithId);
    }
  }, [path]);

  useEffect(() => {
    if (anchor && refs.current[anchor]) {
      refs.current[anchor]?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [refs.current, anchor]);

  if (items.length === 0) {
    return <></>;
  }

  return (
    <div
      className={`${fr.cx("fr-accordions-group")}${className ? ` ${className}` : ""}`}
      data-fr-group="false"
    >
      {itemsWithId.map((item) => (
        <p key={item.id}>{item.content}</p>
      ))}
    </div>
  );
};
