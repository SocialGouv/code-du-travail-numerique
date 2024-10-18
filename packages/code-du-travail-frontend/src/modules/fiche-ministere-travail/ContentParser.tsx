import parse, {
  DOMNode,
  domToReact,
  Element,
  HTMLReactParserOptions,
} from "html-react-parser";
import { xssWrapper } from "../../lib";
import { CallOut } from "@codegouvfr/react-dsfr/CallOut";
import { fr } from "@codegouvfr/react-dsfr";

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
            <CallOut className={fr.cx("fr-icon-information-line")}>
              {domToReact(domNode.children as DOMNode[], { trim: true })}
            </CallOut>
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
