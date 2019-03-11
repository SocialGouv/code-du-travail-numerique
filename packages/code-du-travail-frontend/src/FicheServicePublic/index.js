import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import * as Components from "./components";
import { getText } from "./utils";

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
  // Complex elements, we don't immediately parse their children
  switch (data.name) {
    case "BlocCas":
      if (data._.affichage === "onglet") {
        return (
          <Components.Tabulator data={data} headingLevel={headingLevel + 1} />
        );
      }
      break;
    case "Liste":
      return <Components.List data={data} headingLevel={headingLevel} />;
    case "ListeSituations":
      return <Components.Tabulator data={data} headingLevel={headingLevel} />;
    case "OuSAdresser":
      return <Components.OuSAdresser data={data} />;
    case "ServiceEnLigne":
      return <Components.ServiceEnLigne data={data} />;
    case "Tableau":
      return <Components.Table data={data} headingLevel={headingLevel} />;
    case "Texte":
      if (data.$.find(child => child.name === "Chapitre")) {
        return <Components.Accordion data={data} headingLevel={headingLevel} />;
      }
      break;
    case "Titre":
      return (
        <Components.Title level={headingLevel}>
          {getText(data)}
        </Components.Title>
      );
  }

  // "Standard" elements, we can immediately parse their children
  const children = <ElementBuilder data={data.$} headingLevel={headingLevel} />;
  switch (data.name) {
    case "Paragraphe":
      return <p>{children}</p>;
    case "Texte":
      return children;
    // Elements restants à traiter :o
    case "Introduction":
      return children;
    case "SousChapitre":
      return children;
    case "MiseEnEvidence":
      return <strong>{children}</strong>;
    case "ANoter":
      return children;
    case "ASavoir":
      return children;
    case "LienIntra":
      return children;
    case "LienInterne":
      return children;
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
  data: PropTypes.object.isRequired
};

export default FicheServicePublic;

const StyledElementBuilder = styled.div`
  * > p:last-child {
    margin-bottom: 0;
  }
`;
