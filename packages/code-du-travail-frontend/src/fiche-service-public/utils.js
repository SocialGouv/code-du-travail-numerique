// beware, this one is recursive
export function getText(element = { text: "" }, separator = " ") {
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
