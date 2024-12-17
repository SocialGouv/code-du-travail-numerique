import parse, {
  DOMNode,
  domToReact,
  Element,
  HTMLReactParserOptions,
} from "html-react-parser";
import { fr } from "@codegouvfr/react-dsfr";
import xss, { escapeAttrValue, getDefaultWhiteList } from "xss";
import Link from "../common/Link";

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
      div: ["data-src", "data-title"],
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
              <Link
                href={domNode.attribs["data-src"]}
                target={"_blank"}
                title={`Cliquez ici pour voir la vidéo ${ldomNode.attribs["data-title"]}`}
              >
                Cliquez ici pour voir la vidéo
              </Link>
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
              {domToReact(domNode.children as DOMNode[])}
            </div>
          );
        }
      }
    },
    trim: false,
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
