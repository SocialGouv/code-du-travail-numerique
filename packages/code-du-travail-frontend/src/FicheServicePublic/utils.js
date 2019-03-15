// beware, this one is recursive
export function getText(element = { text: "" }, separator = " ") {
  if (element.type === "text") {
    return element.$.trim();
  }
  if (element.$) {
    return element.$.map(child => getText(child, separator)).join(separator);
  }
  return "";
}

export const ignoreParagraph = children =>
  children.map(child => {
    if (child.name === "Texte") {
      return ignoreParagraph(child.$);
    }
    if (child.name === "Paragraphe") {
      return child.$;
    }
    return child;
  });
