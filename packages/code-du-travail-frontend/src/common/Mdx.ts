import React, { createElement } from "react";
import raw from "rehype-raw";
import rehype2react from "rehype-react";
import markdownParser from "remark-parse";
import remark2rehype from "remark-rehype";
import unified from "unified";

type Props = {
  markdown: string;
  components: any;
};

const Mdx: React.FC<Props> = ({ markdown, components = {} }) => {
  // @lionelb: we wrapped the <Content /> tag with a div to avoid have it wrapped with a paragraph
  const wrappedMarkdown = markdown.replace(
    /(<Content [^>]+><\/Content>)/,
    "<div>$1</div>"
  );
  return unified()
    .use(markdownParser)
    .use(remark2rehype, { allowDangerousHtml: true })
    .use(raw)
    .use(rehype2react, {
      components,
      createElement,
    })
    .processSync(wrappedMarkdown).result as JSX.Element;
};

export default Mdx;
