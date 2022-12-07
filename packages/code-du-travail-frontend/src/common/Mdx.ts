import React, { createElement } from "react";
import raw from "rehype-raw";
import rehype2react from "rehype-react";
import markdownParser from "remark-parse";
import remark2rehype from "remark-rehype";
import unified from "unified";

type Props = {
  markdown: string;
  components?: any[];
};

const Mdx: React.FC<Props> = ({ markdown, components = {} }) => {
  // @lionelb: we wrapped the <Content /> tag with a div to avoid have it wrapped with a paragraph
  const wrappedMarkdown = markdown.replace(
    /(<Content [^>]+><\/Content>)/,
    "<div>$1</div>"
  );

  // add "as any" : https://github.com/orgs/rehypejs/discussions/63
  return unified()
    .use(markdownParser)
    .use(remark2rehype as any, { allowDangerousHtml: true })
    .use(raw as any)
    .use(rehype2react as any, {
      components,
      createElement,
    })
    .processSync(wrappedMarkdown).result as JSX.Element;
};

export default Mdx;
