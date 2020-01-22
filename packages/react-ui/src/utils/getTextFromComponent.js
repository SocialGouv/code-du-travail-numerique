import { Children, isValidElement } from "react";

const hasChildren = element =>
  isValidElement(element) && Boolean(element.props.children);

const childToString = child => {
  if (
    typeof child === "undefined" ||
    child === null ||
    typeof child === "boolean"
  ) {
    return "";
  }
  return child.toString();
};

// Beware, this one is recursive
export const getTextFromComponent = children => {
  if (!(children instanceof Array) && !isValidElement(children)) {
    return childToString(children);
  }
  return Children.toArray(children).reduce((text, child) => {
    let newText;
    if (isValidElement(child) && hasChildren(child)) {
      newText = getTextFromComponent(child.props.children);
    } else {
      newText = childToString(child);
    }
    return text.concat(newText);
  }, "");
};
