import React from "react";
import unified from "unified";
import markdownParser from "remark-parse";
import remark2rehype from "remark-rehype";
import rehype2react from "rehype-react";
import raw from "rehype-raw";

const Mdx = ({ markdown, components = {} }) => {
  return unified()
    .use(markdownParser)
    .use(remark2rehype, { allowDangerousHTML: true })
    .use(raw)
    .use(rehype2react, {
      createElement: React.createElement,
      components: components
    })
    .processSync(markdown).contents;
};

export default Mdx;

