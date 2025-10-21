import React, { JSX } from "react";
import { ElementBuilder } from "./ElementBuilder";
import { fr } from "@codegouvfr/react-dsfr";
import { filterOutTitle, getInChildrenByName, getText } from "../utils";
import { FicheSPDataElementWithElementChildren } from "../type";

export const ANoter = ({
  data,
  headingLevel,
}: {
  data: FicheSPDataElementWithElementChildren;
  headingLevel: number;
}) => {
  const title = getInChildrenByName(data, "Titre");
  const Heading = `h${headingLevel + 2}` as keyof JSX.IntrinsicElements;
  return (
    <div className={fr.cx("fr-alert", "fr-alert--info", "fr-mb-4w")}>
      {title && <Heading>{getText(title)}</Heading>}
      <ElementBuilder
        data={filterOutTitle(data)}
        headingLevel={headingLevel + 1}
      />
    </div>
  );
};

export default ANoter;
