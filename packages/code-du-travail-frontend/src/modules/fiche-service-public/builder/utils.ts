import { FicheSPData, FicheSPDataElementWithElementChildren } from "./type";

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

export const getInChildrenByName = (
  element: FicheSPDataElementWithElementChildren,
  name: string
): FicheSPData | undefined =>
  element.children.find((child) => child.name === name);

export const getTitleInChildren = (
  element: FicheSPDataElementWithElementChildren
): string => {
  return getText(getInChildrenByName(element, "Titre")!);
};

export const filterOutTitle = (
  element: FicheSPDataElementWithElementChildren
) => element.children.filter((child) => child.name !== "Titre");
