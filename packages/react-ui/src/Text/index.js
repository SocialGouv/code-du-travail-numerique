import PropTypes from "prop-types";
import React from "react";
import styled, { css } from "styled-components";

import { fonts } from "../theme.js";

const sharedStyle = css`
  ${({ theme }) => {
    return css`
      color: ${(props) =>
        props.$variant ? theme[props.$variant] : theme.paragraph};
      line-height: ${fonts.lineHeightTitle};
      font-size: ${(props) =>
        props.$fontSize && props.$fontSize.startsWith("h")
          ? fonts.sizes.headings[props.$fontSize.replace("h", "")]
          : fonts.sizes[props.$fontSize]};
      font-weight: ${(props) => props.$fontWeight};
    `;
  }}
`;

const spanPropTypes = {
  children: PropTypes.node,
  fontSize: PropTypes.oneOf([
    "default",
    "tiny",
    "small",
    "medium",
    "hsmall",
    "hmedium",
    "hmobileMedium",
    "hlarge",
  ]),
  fontWeight: PropTypes.oneOf(["300", "400", "500", "600", "700"]),
  variant: PropTypes.oneOf(["primary", "secondary", "error", "placeholder"]),
};

const defaultSpanPropTypes = {
  fontSize: "default",
  fontWeight: "400",
};

const paragraphPropTypes = {
  ...spanPropTypes,
  isLikeSpan: PropTypes.bool,
};

const defaultParagraphPropTypes = {
  ...defaultSpanPropTypes,
  isLikeSpan: false,
};

Text.propTypes = spanPropTypes;
Text.defaultProps = defaultSpanPropTypes;
Paragraph.propTypes = paragraphPropTypes;
Paragraph.defaultProps = defaultParagraphPropTypes;

export function Text({ children, fontSize, fontWeight, variant, ...props }) {
  return (
    <Span
      {...props}
      $fontWeight={fontWeight}
      $fontSize={fontSize}
      $variant={variant}
    >
      {children}
    </Span>
  );
}
export function Paragraph({
  children,
  fontSize,
  fontWeight,
  variant,
  isLikeSpan,
  ...props
}) {
  return (
    <P
      {...props}
      $fontWeight={fontWeight}
      $fontSize={fontSize}
      $variant={variant}
      $isLikeSpan={isLikeSpan}
    >
      {children}
    </P>
  );
}

const Span = styled.span`
  ${sharedStyle}
`;
const P = styled.p`
  ${sharedStyle}
  ${({ $isLikeSpan }) =>
    $isLikeSpan &&
    css`
      all: revert;
      margin: 0;
    `}
`;
