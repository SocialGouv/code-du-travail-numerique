import React from "react";
import styled from "styled-components";
import * as Components from "./components";
import { getText } from "./utils";

// Beware, this one is recursive
function elementBuilder(element, headingLevel = 0) {
  if (element.type === "text") {
    return element.$;
  }
  // In case we get children
  if (Array.isArray(element)) {
    return element.map(child => elementBuilder(child, headingLevel));
  }
  // Complex elements, we don't immediately parse their children
  switch (element.name) {
    case "ListeSituations":
      return (
        <Components.Tabulator data={element} headingLevel={headingLevel} />
      );
    case "BlocCas":
      if (element._.affichage === "onglet") {
        return (
          <Components.Tabulator
            data={element}
            headingLevel={headingLevel + 1}
          />
        );
      }
      break;
    case "Texte":
      if (element.$.find(child => child.name === "Chapitre")) {
        return (
          <Components.Accordion data={element} headingLevel={headingLevel} />
        );
      }
      break;
    case "Tableau":
      return <Components.Table data={element} headingLevel={headingLevel} />;
    case "Liste":
      return <Components.List data={element} headingLevel={headingLevel} />;
    case "ServiceEnLigne":
      return (
        <Components.ServiceEnLigne data={element} headingLevel={headingLevel} />
      );
    case "Titre":
      return (
        <Components.Title level={headingLevel}>
          {getText(element)}
        </Components.Title>
      );
  }

  // "Standard" elements, we can immediately parse their children
  const children = elementBuilder(element.$, headingLevel);
  switch (element.name) {
    case "Paragraphe":
      return <p>{children}</p>;
    case "Texte":
      return children;
    // Elements restants à traiter :o
    case "Introduction":
      return children;
    case "Chapitre":
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

export default elementBuilder;
