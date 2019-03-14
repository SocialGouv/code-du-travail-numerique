import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { theme } from "@cdt/ui";
import { getText, ignoreParagraph } from "./utils";
import Accordion from "./components/Accordion";
import LienExterne from "./components/LienExterne";
import List from "./components/List";
import OuSAdresser from "./components/OuSAdresser";
import ServiceEnLigne from "./components/ServiceEnLigne";
import Table from "./components/Table";
import Tabulator from "./components/Tabulator";
import Title from "./components/Title";

const { box, colors, fonts, spacing } = theme;

const parseChildren = (children, headingLevel) => (
  <ElementBuilder data={children} headingLevel={headingLevel} />
);

// Beware, this one is recursive
export function ElementBuilder({ data, headingLevel = 0 }) {
  // In case we get children
  if (Array.isArray(data)) {
    return data.map((child, index) => (
      <ElementBuilder key={index} data={child} headingLevel={headingLevel} />
    ));
  }
  if (data.type === "text") {
    return data.$;
  }
  switch (data.name) {
    // Complex elements, we don't immediately parse their children
    case "BlocCas":
      if (data._.affichage === "onglet") {
        return <Tabulator data={data} headingLevel={headingLevel} />;
      }
      return parseChildren(data.$, headingLevel);
    case "Introduction":
      return (
        <Introduction>
          <ElementBuilder data={ignoreParagraph(data.$)} />
        </Introduction>
      );
    case "LienExterne":
      return <LienExterne data={data} />;
    case "Liste":
      return <List data={data} headingLevel={headingLevel} />;
    case "ListeSituations":
      return <Tabulator data={data} headingLevel={headingLevel} />;
    case "OuSAdresser":
      return <OuSAdresser data={data} headingLevel={headingLevel} />;
    case "ServiceEnLigne":
      return <ServiceEnLigne data={data} />;
    case "Tableau":
      return <Table data={data} headingLevel={headingLevel} />;
    case "Texte":
      if (data.$.find(child => child.name === "Chapitre")) {
        return <Accordion data={data} headingLevel={headingLevel} />;
      }
      return parseChildren(data.$, headingLevel);
    case "Titre":
      return <Title level={headingLevel}>{getText(data)}</Title>;
    // "Simple" elements, we can immediately parse their children
    case "ANoter":
    case "ASavoir":
    case "Attention":
    case "Rappel":
      return <ANoter>{parseChildren(data.$, headingLevel)}</ANoter>;
    case "Cas":
      return parseChildren(data.$, headingLevel);
    case "MiseEnEvidence":
      return <strong>{parseChildren(data.$, headingLevel)}</strong>;
    case "Paragraphe":
      return <p>{parseChildren(data.$, headingLevel)}</p>;
    case "SousChapitre":
      return parseChildren(data.$, headingLevel);
    // These ones are still to be defined
    case "LienIntra":
      return parseChildren(data.$, headingLevel);
    case "LienInterne":
      return parseChildren(data.$, headingLevel);
    // Otherwise we simply ignore the element
    default:
      return null;
  }
}

const FicheServicePublic = props => (
  <StyledElementBuilder>
    <ElementBuilder {...props} />
  </StyledElementBuilder>
);

FicheServicePublic.propTypes = {
  data: PropTypes.array.isRequired
};

export default FicheServicePublic;

const StyledElementBuilder = styled.div`
  * > *:last-child {
    margin-bottom: 0;
  }
`;

const ANoter = styled.div`
  padding: ${spacing.base};
  background-color: ${colors.elementBackground};
  border-radius: ${box.borderRadius};
  & > *:first-child {
    margin-top: 0;
  }
`;

const Introduction = styled.p`
  margin-bottom: ${spacing.large};
  font-size: ${fonts.sizeH6};
`;
