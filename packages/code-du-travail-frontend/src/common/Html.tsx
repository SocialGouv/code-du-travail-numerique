import React from "react";
import styled from "styled-components";
import xss from "xss";

import { htmlParser } from "../lib";

type Props = {
  children: string;
  inline?: boolean;
};

/**
 * List of tags that are allowed in the HTML
 * @type {string[]}
 * webcomponent-tooltip is used as an overlay for the definition of the words
 */
const whiteListTags = ["webcomponent-tooltip"];

/**
 * List of attributes that are allowed for the tags scan in the HTML
 * @type {string[]}
 * class is used for modeles-de-courrier
 */
const whiteListAttr = ["class"];

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
          onTagAttr: function (tag, name, value) {
            for (let i = 0; i < whiteListAttr.length; i++) {
              if (name.startsWith(whiteListAttr[i])) {
                return `${name}=${value}`;
              }
            }
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
