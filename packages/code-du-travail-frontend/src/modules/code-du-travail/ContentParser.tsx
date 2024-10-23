import parse from "html-react-parser";

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
        const trimmedText = domNode.children[0].data.trim();
        domNode.children[0].data = trimmedText;
        return (
          <>
            <a {...domNode.attribs}>{trimmedText}</a>{" "}
          </>
        );
      }
    },
  };
  return <>{parse(children, options)}</>;
};
