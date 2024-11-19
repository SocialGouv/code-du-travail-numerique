import React from "react";

import { getInChildrenByName, getTitleInChildren } from "../utils";
import { ElementBuilder } from "./ElementBuilder";
import Title from "./Title";
import { fr } from "@codegouvfr/react-dsfr";
import Link from "next/link";
import { OuSAdresserType, RessourceWebType } from "../type";

export const OuSAdresser = ({
  data,
  headingLevel,
}: {
  data: OuSAdresserType;
  headingLevel: number;
}) => {
  const label = getTitleInChildren(data);
  let content;
  const ressourceWeb = getInChildrenByName(
    data,
    "RessourceWeb"
  ) as RessourceWebType;
  if (ressourceWeb) {
    const url = ressourceWeb.attributes.URL;
    content = (
      <Link href={url} rel="noopener noreferrer" target="_blank">
        {label}
      </Link>
    );
  } else {
    const text = getInChildrenByName(data, "Texte")!;

    content = (
      <>
        <Title level={headingLevel}>{label}</Title>
        <ElementBuilder data={text} headingLevel={headingLevel} />
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
