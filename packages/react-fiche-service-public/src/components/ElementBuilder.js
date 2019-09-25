import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { theme } from "@cdt/ui-old";

import { getText, ignoreParagraph } from "../utils";
import Accordion from "./Accordion";
import { LienExterne, LienExterneCommente } from "./LienExterne";
import List from "./List";
import OuSAdresser from "./OuSAdresser";
import ServiceEnLigne from "./ServiceEnLigne";
import Table from "./Table";
import Tabulator from "./Tabulator";
import Title from "./Title";

const { box, colors, spacing } = theme;

const parseChildren = (children, headingLevel) => (
  <ElementBuilder data={children} headingLevel={headingLevel} />
);

// Beware, this one is recursive
export function ElementBuilder({ data, headingLevel }) {
  // in cases where the parent's "$"/children is undefined while it should not
  // e.g. in a "Texte" element. It occurs sometimes.
  if (!data) return null;
  // In case we get children
  if (Array.isArray(data)) {
    return data.map((child, index) => (
      <ElementBuilder key={index} data={child} headingLevel={headingLevel} />
    ));
  }
  if (data.type === "text") {
    return data.text;
  }
  switch (data.name) {
    // Complex elements, we don't immediately parse their children
    case "BlocCas":
      if (data.attributes.affichage === "onglet") {
        return <Tabulator data={data} headingLevel={headingLevel} />;
      } else {
        return <Accordion data={data} headingLevel={headingLevel} />;
      }
    case "Introduction":
      if (ignoreParagraph(data)) {
        return (
          <Introduction>
            <ElementBuilder data={ignoreParagraph(data)} />
          </Introduction>
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
    case "Texte":
      if (data.children.find(child => child.name === "Chapitre")) {
        return <Accordion data={data} headingLevel={headingLevel} />;
      }
      return parseChildren(data.children, headingLevel);
    case "Titre":
      return <Title level={headingLevel}>{getText(data)}</Title>;
    // "Simple" elements, we can immediately parse their children
    case "ANoter":
    case "ASavoir":
    case "Attention":
    case "Rappel":
      return <ANoter>{parseChildren(data.children, headingLevel)}</ANoter>;
    case "Chapitre":
    case "SousChapitre":
      return parseChildren(data.children, headingLevel);
    case "Expression":
      return <i>{parseChildren(data.children, headingLevel)}</i>;
    case "MiseEnEvidence":
    case "Valeur":
      return <strong>{parseChildren(data.children, headingLevel)}</strong>;
    case "Paragraphe":
      return <p>{parseChildren(data.children, headingLevel)}</p>;
    case "Exposant":
      return <sup>{parseChildren(data.children, headingLevel)}</sup>;
    // These ones are still to be defined
    case "LienIntra":
    case "LienInterne":
      return parseChildren(data.children, headingLevel);
    // Otherwise we simply ignore the element
    default:
      return null;
  }
}

ElementBuilder.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  headingLevel: PropTypes.number
};

ElementBuilder.defaultProps = {
  headingLevel: 0
};

const ANoter = styled.div`
  margin-bottom: ${spacing.base};
  padding: ${spacing.base};
  background-color: ${colors.elementBackground};
  border-radius: ${box.borderRadius};
  & > *:first-child {
    margin-top: 0;
  }
  & > *:last-child {
    margin-bottom: 0;
  }
`;

const Introduction = styled.p`
  margin-bottom: ${spacing.large};
`;
