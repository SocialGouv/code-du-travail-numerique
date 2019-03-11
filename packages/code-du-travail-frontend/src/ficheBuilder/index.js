import React from "react";
import styled from "styled-components";
import * as Components from "./components";

// Beware, this one is recursive
function elementBuilder(element) {
  if (element.type === "text") {
    return element.$;
  }
  // In case we get children
  if (Array.isArray(element)) {
    return element.map(child => elementBuilder(child));
  }
  // Complex elements, we don't immediately parse their children
  switch (element.name) {
    case "ListeSituations":
      return <Components.Tabulator data={element} />;
    case "Tableau":
      return <Components.Table data={element} />;
    case "Liste":
      return <Components.List data={element} />;
    case "ServiceEnLigne":
      return <Components.ServiceEnLigne data={element} />;
  }

  // "Standard" elements, we can immediately parse their children
  const children = elementBuilder(element.$);
  switch (element.name) {
    case "Paragraphe":
      return <p>{children}</p>;
    case "Texte":
      return children;
    // Elements restants à traiter :o
    case "Titre":
      return <h2>{children}</h2>;
    case "Introduction":
      return children;
    case "Chapitre":
      return children;
    case "SousChapitre":
      return children;
    case "BlocCas":
      return children;
    case "Cas":
      return children;
    case "MiseEnEvidence":
      return children;
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
