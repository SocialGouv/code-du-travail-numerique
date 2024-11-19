import React from "react";
import { ElementBuilder } from "./ElementBuilder";
import { fr } from "@codegouvfr/react-dsfr";
import { filterOutTitle, getTitleInChildren } from "../utils";
import { FicheSPDataElementWithElementChildren } from "../type";

export const ANoter = ({
  data,
  headingLevel,
}: {
  data: FicheSPDataElementWithElementChildren;
  headingLevel: number;
}) => {
  const title = getTitleInChildren(data);
  return (
    <div className={fr.cx("fr-highlight")}>
      {title && <p className={fr.cx("fr-text--bold")}>{title}</p>}
      <ElementBuilder data={filterOutTitle(data)} headingLevel={headingLevel} />
    </div>
  );
};

export default ANoter;
