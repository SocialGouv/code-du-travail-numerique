import React from "react";
import styled from "styled-components";
import * as Components from "./components";

export const childrenBuilder = element => {
  if (!Array.isArray(element.$)) return null;
  return element.$.map(child => elementBuilder(child));
};

// Beware, this one is recursive
function elementBuilder(element) {
  if (element.type === "text") {
    return element.$;
  }
  // Complex elements, we don't immediately parse their children
  switch (element.name) {
    case "Tableau":
      return <Components.Table data={element} />;
    case "Liste":
      return <Components.List data={element} />;
    case "ServiceEnLigne":
      return <Components.ServiceEnLigne data={element} />;
  }

  // "Standard" elements, we can immediately parse their children
  const children = childrenBuilder(element);
  switch (element.name) {
    case "Paragraphe":
      return <p>{children}</p>;
    case "Texte":
      return children;
    default:
      return children;
  }
}

export default elementBuilder;
