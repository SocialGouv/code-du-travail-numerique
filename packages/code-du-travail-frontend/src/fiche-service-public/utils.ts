// beware, this one is recursive
import { FicheSPData } from "./components/ElementBuilder";

export function getText(element: FicheSPData, separator = " "): string {
  if (element.type === "text") {
    return element.text.trim();
  }
  if (element.children) {
    return element.children
      .map((child) => getText(child, separator))
      .join(separator);
  }
  if (Array.isArray(element)) {
    return element.map((child) => getText(child, separator)).join(separator);
  }
  return "";
}

export const ignoreParagraph = (element) =>
  element.children.map((child) => {
    if (child.name === "Texte") {
      return ignoreParagraph(child);
    }
    if (child.name === "Paragraphe") {
      return child.children;
    }
    return child;
  });

export const getTitleInChildren = (element: FicheSPData): string => {
  const elementTitle = element.children.find(
    (child: FicheSPData) => child.name === "Titre"
  );
  return getText(elementTitle!);
}

export const filterOutTitle = (element: FicheSPData) =>
  element.children.filter(
    (child) => child.name !== "Titre"
  )

