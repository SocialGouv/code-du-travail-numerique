import React from "react";
// import { useUIDSeed } from "react-uid";
import { getText, ignoreParagraph } from "../utils"; // import { LienExterne, LienExterneCommente } from "./LienExterne.js";
import { fr } from "@codegouvfr/react-dsfr";
import { LienExterne, LienExterneCommente } from "./LienExterne";
import List from "./List";
import Accordion from "./Accordion";
import Title from "./Title";
import Avertissement from "./Avertissement"; // Beware, this one is recursive

export type FicheSPDataText = { type: "text"; text: string };
export type FicheSPDataElement = {
  type: "element";
  children: FicheSPData[];
  name: string;
};
export type FicheSPData = {
  name?: string;
  attributes?: Record<string, string>;
} & (FicheSPDataElement | FicheSPDataText);

// Beware, this one is recursive
export const ElementBuilder = ({
  data,
  headingLevel = 0,
}: {
  data: FicheSPData | FicheSPData[];
  headingLevel?: number;
}) => {
  // const seedId = useUIDSeed();
  // in cases where the parent's "$"/children is undefined while it should not
  // e.g. in a "Texte" element. It occurs sometimes.
  if (!data) return <></>;
  // In case we get children

  if (Array.isArray(data)) {
    return data.map((child) => (
      <ElementBuilder key={"abc"} data={child} headingLevel={headingLevel} />
    ));
  }
  if (data.type === "text") {
    return data.text;
  }

  switch (data.name) {
    case "BlocCas":
      if (data.attributes?.affichage === "onglet") {
        return "Tabulator"; // <Tabulator data={data} headingLevel={headingLevel} />;
      } else {
        return <Accordion data={data} headingLevel={headingLevel} />;
      }
    case "Image":
      return "ImageElement"; //<ImageElement data={data} />;
    case "Introduction":
      if (ignoreParagraph(data)) {
        return (
          <p>
            <ElementBuilder data={ignoreParagraph(data)} />
          </p>
        );
      }
      break;
    case "LienExterne":
      return <LienExterne data={data} />;
    case "LienExterneCommente":
      return <LienExterneCommente data={data} />;
    case "Liste":
      return <List data={data} headingLevel={headingLevel} />;
    case "ListeSituations":
      return "ListeSituations"; // <Tabulator data={data} headingLevel={headingLevel} />;
    case "OuSAdresser":
      return "OuSAdresser"; // <OuSAdresser data={data} headingLevel={headingLevel} />;
    case "ServiceEnLigne":
    case "PourEnSavoirPlus":
      return "ServiceEnLigne"; // <ServiceEnLigne data={data} />;
    case "Tableau":
      return "Table"; // <Table data={data} headingLevel={headingLevel} />;
    case "Texte":
      if (data.children.find((child) => child.name === "Chapitre")) {
        return <Accordion data={data} headingLevel={headingLevel} />;
      }
      return (
        <ElementBuilder data={data.children} headingLevel={headingLevel} />
      );
    case "Titre":
      return <Title level={headingLevel}>{getText(data)}</Title>;
    // "Simple" elements, we can immediately parse their children
    case "Avertissement":
      return <Avertissement data={data} headingLevel={headingLevel} />;
    case "ANoter":
    case "ASavoir":
    case "Attention":
    case "Rappel":
      return (
        <div className={fr.cx("fr-callout", "fr-p-4w")}>
          <ElementBuilder data={data.children} headingLevel={headingLevel} />
        </div>
      );
    case "Chapitre":
    case "Description":
    case "FragmentConditionne":
    case "SousChapitre":
      return (
        <ElementBuilder data={data.children} headingLevel={headingLevel} />
      );
    case "Expression":
      return (
        <i>
          <ElementBuilder data={data.children} headingLevel={headingLevel} />
        </i>
      );
    case "MiseEnEvidence":
    case "Valeur":
      return (
        <strong>
          <ElementBuilder data={data.children} headingLevel={headingLevel} />
        </strong>
      );
    case "Paragraphe":
      return (
        <p>
          <ElementBuilder data={data.children} headingLevel={headingLevel} />
        </p>
      );
    // // TODO : check if exists These ones are still to be defined

    case "Exposant":
      return (
        <sup>
          <ElementBuilder data={data.children} headingLevel={headingLevel} />
        </sup>
      );
    case "LienIntra":
    case "LienInterne":
      return (
        <ElementBuilder data={data.children} headingLevel={headingLevel} />
      );
    // Otherwise we simply ignore the element
    default:
      return null;
  }
};
