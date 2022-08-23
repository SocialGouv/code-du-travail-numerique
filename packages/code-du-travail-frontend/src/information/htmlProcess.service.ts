import unified from "unified";
import React from "react";
import { InfoLink } from "./Components";
import htmlToHtmlAst from "rehype-parse";
import htmlAstToReact from "rehype-react";

const processor = unified()
  // @ts-ignore
  .use(htmlToHtmlAst, { fragment: true })
  // @ts-ignore
  .use(htmlAstToReact, {
    Fragment: React.Fragment,
    components: {
      a: InfoLink,
    },
    createElement: React.createElement,
  });

export const processToHtml = (html: string) => {
  return processor.processSync(html).result;
};
