import unified from "unified";
import React from "react";
import { Link } from "../information/Components";
import htmlToHtmlAst from "rehype-parse";
import htmlAstToReact from "rehype-react";

const processor = unified()
  // @ts-ignore
  .use(htmlToHtmlAst, { fragment: true })
  // @ts-ignore
  .use(htmlAstToReact, {
    Fragment: React.Fragment,
    components: {
      a: Link,
    },
    createElement: React.createElement,
  });

export const processToHtml = (html: string): string => {
  return processor.processSync(html).result as string;
};
