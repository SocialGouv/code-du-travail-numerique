import React from "react";
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
  if (items.length === 0) {
    return <></>;
  }

  // Calculer directement les items avec ID
  const itemsWithId = items.map(({ id, ...item }) => {
    const idDefaulted = id ?? slugify(item.title);
    return {
      ...item,
      id: idDefaulted,
    };
  });

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
        >
          {item.content}
        </Accordion>
      ))}
    </div>
  );
};
