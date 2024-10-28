import parse, { domToReact } from "html-react-parser";
import { ReactHTMLElement } from "react";

export const ContentParser = ({
  children,
}): string | JSX.Element | JSX.Element[] => {
  const options = {
    replace: (domNode) => {
      if (
        domNode.name === "a" &&
        domNode.children &&
        domNode.children.length > 0
      ) {
        let tagElement = domNode.children[0];
        while (tagElement.type !== "text") {
          tagElement = tagElement.children[0];
        }
        const text = tagElement.data;
        tagElement.data = text.trim();
        const textToTrim = text[text.length - 1] === " ";
        return (
          <>
            <a {...domNode.attribs}>{domToReact(domNode.children)}</a>

            {textToTrim ? " " : ""}
          </>
        );
      }
    },
  };
  return <>{parse(children, options)}</>;
};
