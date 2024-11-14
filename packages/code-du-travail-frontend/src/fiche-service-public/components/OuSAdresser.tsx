import React from "react";

import { getInChildrenByName, getTitleInChildren } from "../utils";
import {ElementBuilder, FicheSPDataElement} from "./ElementBuilder";
import Title from "./Title";
import { fr } from "@codegouvfr/react-dsfr";

export const OuSAdresser = ({
  data,
  headingLevel,
}: {
  data: any;
  headingLevel: number;
}) => {
  const label = getTitleInChildren(data);
  let content;
  const ressourceWeb = getInChildrenByName(data, "RessourceWeb");
  if (ressourceWeb) {
    const url = ressourceWeb.attributes?.URL;
    content = (
      <a
        href={url}
        rel="noopener noreferrer"
        target="_blank"
        aria-label={`${label} (nouvelle fenêtre)`}
      >
        {label}
      </a>
    );
  } else {
    content = (
      <>
        <Title level={headingLevel}>{label}</Title>
        <ElementBuilder
          data={data.children.find((child) => child.name === "Texte")}
          headingLevel={headingLevel}
        />
      </>
    );
  }
  return (
    <div className={fr.cx("fr-callout")}>
      <p className={fr.cx("fr-text--bold")}>{"Où s'adresser ?"}</p>
      {content}
    </div>
  );
};

export default OuSAdresser;
