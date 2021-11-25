import React from "react";
import styled from "styled-components";
import xss, { getDefaultWhiteList } from "xss";

import { htmlParser } from "../lib";

type Props = {
  children: string;
  inline?: boolean;
};

/**
 * List of tags that are allowed in the HTML
 * @type {string[]}
 * webcomponent-tooltip is used as an overlay for the definition of the words`
 */
const whiteListTags = ["webcomponent-tooltip"];

const Html = ({ children, inline = false, ...props }: Props): JSX.Element => {
  return (
    <Div
      {...props}
      isInline={inline}
      dangerouslySetInnerHTML={{
        __html: xss(htmlParser(children), {
          onIgnoreTag: function (tag, html) {
            for (let i = 0; i < whiteListTags.length; i++) {
              if (tag.startsWith(whiteListTags[i])) {
                return html;
              }
            }
          },
          // Use for modeles-de-courrier
          whiteList: {
            ...getDefaultWhiteList(),
            ...{
              div: ["class"],
              h3: ["class"],
              li: ["class"],
              p: ["class"],
              span: ["class"],
            },
          },
        }),
      }}
    />
  );
};

export default Html;

const Div = styled.div`
  ${({ isInline }: { isInline: boolean }) =>
    isInline && "display: inline-block;"};
`;
