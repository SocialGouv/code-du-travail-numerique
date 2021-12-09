import React from "react";
import styled from "styled-components";
import xss, { escapeAttrValue } from "xss";

import { htmlParser } from "../lib/html";

type Props = {
  children: string;
  inline?: boolean;
};

/**
 * List of tags that are allowed in the HTML
 * @type {string[]}
 * webcomponent-tooltip is used as an overlay for the definition of the words
 */
const whiteListTags = ["webcomponent-tooltip", "webcomponent-tooltip-cc"];

/**
 * List of attributes that are allowed for the tags scan in the HTML
 * @type {string[]}
 * class is used for modeles-de-courrier
 */
const whiteListAttr = ["class", "rel", "href", "target"];

const Html = ({ children, inline = false, ...props }: Props): JSX.Element => {
  return (
    <Div
      {...props}
      isInline={inline}
      dangerouslySetInnerHTML={{
        __html: xss(htmlParser(children), {
          onIgnoreTag: function (tag, html, _options) {
            if (whiteListTags.some((whiteTag) => whiteTag === tag)) {
              return html;
            }
          },
          onTagAttr: function (_tag, name, value, _isWhiteAttr) {
            if (whiteListAttr.some((whiteAttr) => whiteAttr === name)) {
              return name + '="' + escapeAttrValue(value) + '"';
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
