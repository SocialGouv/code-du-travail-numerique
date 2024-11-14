import React from "react";
import { ElementBuilder, FicheSPDataElement } from "./ElementBuilder";
import { fr } from "@codegouvfr/react-dsfr";
import { filterOutTitle, getTitleInChildren } from "../utils";

export const ANoter = ({
  data,
  headingLevel,
}: {
  data: FicheSPDataElement;
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
