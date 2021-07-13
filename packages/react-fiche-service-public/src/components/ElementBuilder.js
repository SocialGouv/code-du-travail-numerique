import { theme, Wrapper } from "@socialgouv/cdtn-ui";
import PropTypes from "prop-types";
import React from "react";
import { useUIDSeed } from "react-uid";
import styled from "styled-components";

import { getText, ignoreParagraph } from "../utils.js";
import Accordion from "./Accordion.js";
import { LienExterne, LienExterneCommente } from "./LienExterne.js";
import List from "./List.js";
import OuSAdresser from "./OuSAdresser.js";
import ServiceEnLigne from "./ServiceEnLigne.js";
import Table from "./Table.js";
import Tabulator from "./Tabulator.js";
import Title from "./Title.js";

const { spacings } = theme;

// Beware, this one is recursive
// parentAttributes only purpose for now is to pass a date to the title element
// from the parent level (Avertissement element), we might remove it later
export function ElementBuilder({ data, headingLevel, parentAttributes }) {
  const seedId = useUIDSeed();
  // in cases where the parent's "$"/children is undefined while it should not
  // e.g. in a "Texte" element. It occurs sometimes.
  if (!data) return null;
  // In case we get children
  if (Array.isArray(data)) {
    return data.map((child) => (
      <ElementBuilder
        key={seedId(child)}
        data={child}
        headingLevel={headingLevel}
        parentAttributes={parentAttributes}
      />
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
      if (data.children.find((child) => child.name === "Chapitre")) {
        return <Accordion data={data} headingLevel={headingLevel} />;
      }
      return (
        <ElementBuilder data={data.children} headingLevel={headingLevel} />
      );
    case "Titre":
      return (
        <Title level={headingLevel} date={parentAttributes.date}>
          {getText(data)}
        </Title>
      );
    // "Simple" elements, we can immediately parse their children
    case "ANoter":
    case "ASavoir":
    case "Attention":
    case "Avertissement":
    case "Rappel":
      return (
        <ANoter variant="dark">
          <ElementBuilder
            data={data.children}
            headingLevel={headingLevel + 1}
            parentAttributes={data.attributes}
          />
        </ANoter>
      );
    case "Chapitre":
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
    case "Exposant":
      return (
        <sup>
          <ElementBuilder data={data.children} headingLevel={headingLevel} />
        </sup>
      );
    // These ones are still to be defined
    case "LienIntra":
    case "LienInterne":
      return (
        <ElementBuilder data={data.children} headingLevel={headingLevel} />
      );
    // Otherwise we simply ignore the element
    default:
      return null;
  }
}

ElementBuilder.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  headingLevel: PropTypes.number,
  parentAttributes: PropTypes.object,
};

ElementBuilder.defaultProps = {
  headingLevel: 0,
  parentAttributes: {},
};

const ANoter = styled(Wrapper)`
  margin-bottom: ${spacings.base};
`;

const Introduction = styled.p`
  margin-bottom: ${spacings.large};
`;
