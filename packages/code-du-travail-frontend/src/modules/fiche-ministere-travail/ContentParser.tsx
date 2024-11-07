import parse, {
  DOMNode,
  domToReact,
  Element,
  HTMLReactParserOptions,
} from "html-react-parser";
import { fr } from "@codegouvfr/react-dsfr";
import xss, { escapeAttrValue, getDefaultWhiteList } from "xss";

const xssWrapper = (text: string): string => {
  return xss(text, {
    stripIgnoreTag: true,
    whiteList: {
      ...getDefaultWhiteList(),
      button: [
        "aria-expanded",
        "aria-controls",
        "type",
        "data-fr-js-collapse-button",
      ],
      div: ["data-src"],
    },
    /*
    Keep this attribute for all HTML tag. Use it safely.
     */
    onTagAttr: function (_tag, name, value, _isWhiteAttr) {
      switch (name) {
        case "id":
        case "class":
          return name + '="' + escapeAttrValue(value) + '"';
        default:
          return undefined;
      }
    },
  });
};

const options = (): HTMLReactParserOptions => {
  return {
    replace(domNode) {
      if (domNode instanceof Element) {
        if (
          domNode.name === "div" &&
          domNode.attribs.class?.includes("youtube_player")
        ) {
          return (
            <p>
              <a href={domNode.attribs["data-src"]} target={"_blank"}>
                Cliquez ici pour voir la vidéo
              </a>
            </p>
          );
        }
        if (
          domNode.name === "div" &&
          domNode.attribs.class?.includes("fr-callout") &&
          // We replace all icon by the information-line to avoid complexity
          domNode.attribs.class?.includes("fr-icon-")
        ) {
          return (
            <div className={fr.cx("fr-callout", "fr-icon-information-line")}>
              {domToReact(domNode.children as DOMNode[], { trim: true })}
            </div>
          );
        }
      }
    },
    trim: true,
  };
};

type Props = {
  children: string;
};

export const ContentParser = ({
  children,
}: Props): string | JSX.Element | JSX.Element[] => {
  return <>{parse(xssWrapper(children), options())}</>;
};
