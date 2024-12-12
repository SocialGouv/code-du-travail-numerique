"use client";
import React from "react";
import { useUIDSeed } from "react-uid";
import { getText, ignoreParagraph } from "../utils";
import { LienExterne, LienExterneCommente } from "./LienExterne";
import List from "./List";

import Title from "./Title";
import Avertissement from "./Avertissement";
import Table from "./Table";
import ANoter from "./ANoter";
import ServiceEnLigne from "./ServiceEnLigne";
import OuSAdresser from "./OuSAdresser";
import Tabulator from "./Tabulator";
import { ImageComponent as ImageElement } from "./ImageComponent";
import {
  FicheSPData,
  FicheSPDataTextWithChapitre,
  isFicheSPDataChapitre,
} from "../type";
import AccordionWrapper from "./Accordion";
import SectionWithTitle from "./SectionWithTitle";
import TitreFlottant from "./TitreFlottant";
import Exemple from "./Exemple";
import Video from "./Video";

export const ElementBuilder = ({
  data,
  headingLevel = 0,
}: {
  data: FicheSPData | FicheSPData[];
  headingLevel?: number;
}) => {
  const seedId = useUIDSeed();
  // in cases where the parent's "$"/children is undefined while it should not
  // e.g. in a "Texte" element.
  if (!data) return <></>;

  if (Array.isArray(data)) {
    return data.map((child) => (
      <ElementBuilder
        key={seedId(child)}
        data={child}
        headingLevel={headingLevel}
      />
    ));
  }
  if (data.type === "text") {
    return data.text;
  }

  switch (data.name) {
    case "BlocCas":
      if (data.attributes.affichage === "onglet") {
        return <Tabulator data={data} headingLevel={headingLevel} />;
      }
      return (
        <ElementBuilder data={data.children} headingLevel={headingLevel} />
      );

    case "Image":
      return <ImageElement data={data} headingLevel={headingLevel} />;
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
      return <Tabulator data={data} headingLevel={headingLevel} />;
    case "OuSAdresser":
      return <OuSAdresser data={data} headingLevel={headingLevel} />;
    case "ServiceEnLigne":
    case "PourEnSavoirPlus":
      return <ServiceEnLigne data={data} />;
    case "Tableau":
      return <Table data={data} headingLevel={headingLevel} />;
    case "Titre":
      return <Title level={headingLevel}>{getText(data)}</Title>;
    case "TitreFlottant":
      return <TitreFlottant level={headingLevel} data={data} />;
    case "Avertissement":
    case "Attention":
      return <Avertissement data={data} headingLevel={headingLevel} />;
    case "ANoter":
    case "ASavoir":
    case "Rappel":
      return <ANoter data={data} headingLevel={headingLevel} />;
    case "Exemple":
      return <Exemple data={data} headingLevel={headingLevel} />;
    case "Cas":
      return <SectionWithTitle data={data} headingLevel={headingLevel} />;
    case "Video":
      return <Video data={data} />;
    case "Texte":
      if (data.children.find((child) => isFicheSPDataChapitre(child))) {
        return (
          <AccordionWrapper
            data={data as FicheSPDataTextWithChapitre}
            headingLevel={headingLevel}
          />
        );
      }
      return (
        <ElementBuilder data={data.children} headingLevel={headingLevel} />
      );
    case "Description":
    case "FragmentConditionne":
    case "SousChapitre":
    case "LienIntra":
    case "LienInterne":
    case "Complement":
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
    case "Exposant":
      return (
        <sup>
          <ElementBuilder data={data.children} headingLevel={headingLevel} />
        </sup>
      );
    // Otherwise we simply ignore the element
    default:
      return null;
  }
};
