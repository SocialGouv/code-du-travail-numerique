import React from "react";
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
  return (
    <div className={fr.cx("fr-alert", "fr-alert--info", "fr-mb-4w")}>
      {title && <p className={fr.cx("fr-text--bold")}>{getText(title)}</p>}
      <ElementBuilder data={filterOutTitle(data)} headingLevel={headingLevel} />
    </div>
  );
};

export default ANoter;
