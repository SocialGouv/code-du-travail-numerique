import React from "react";
import * as runtime from "react/jsx-runtime.js";
import { evaluateSync } from "xdm";

const Mdx = ({ markdown, components }) => {
  const wrappedMarkdown = markdown.replace(
    /(<Content [^>]+><\/Content>)/,
    "<div>$1</div>"
  );

  const { default: Content } = evaluateSync(wrappedMarkdown, {
    ...runtime,
  });

  return <Content components={components} />;
};

export default Mdx;
