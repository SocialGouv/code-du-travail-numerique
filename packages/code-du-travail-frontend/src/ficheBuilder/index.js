import React from "react";
import styled from "styled-components";
import { List, LI } from "./components";

function mapChildren(children) {
  if (children) return children.map(child => buildStructure(child));
  return null;
}

// Beware, this one is recursive
function buildStructure(element) {
  if (element.type === "text") {
    return element.$;
  }

  if (!element.$) return null;

  const children = element.$.map(child => buildStructure(child));

  switch (element.name) {
    case "List":
      return <List>{children}</List>;
    case "Item":
      return <LI>{children}</LI>;
    case "Paragraphe":
      return <p>{children}</p>;
    default:
      return <span>{children}</span>;
  }
}

export default buildStructure;
