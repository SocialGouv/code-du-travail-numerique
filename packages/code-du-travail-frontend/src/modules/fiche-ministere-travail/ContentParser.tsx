import parse, { Element, HTMLReactParserOptions } from "html-react-parser";
import { xssWrapper } from "../../lib";

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
