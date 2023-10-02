import PropTypes from "prop-types";
import React from "react";
import styled, { css } from "styled-components";

import { fonts } from "../theme";

const sharedStyle = css`
  ${({ theme }) => {
    return css`
      color: ${(props) =>
        props.$variant
          ? theme[props.$variant]
          : props.disabled
          ? theme.placeholder
          : theme.paragraph};
      font-size: ${(props) =>
        props.$fontSize && props.$fontSize.startsWith("h")
          ? fonts.sizes.headings[props.$fontSize.replace("h", "")]
          : fonts.sizes[props.$fontSize]};
      font-weight: ${(props) => props.$fontWeight};
      ${(props) => (props.$fontStyle ? `font-style: ${props.$fontStyle}` : "")};
    `;
  }}
`;

const spanPropTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
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
  fontStyle: PropTypes.oneOf(["italic"]),
  fontWeight: PropTypes.oneOf(["300", "400", "500", "600", "700"]),
  role: PropTypes.string,
  variant: PropTypes.oneOf(["primary", "secondary", "error", "placeholder"]),
};

const defaultSpanPropTypes = {
  fontSize: "default",
  fontWeight: "400",
};

const paragraphPropTypes = {
  ...spanPropTypes,
  noMargin: PropTypes.bool,
};

const defaultParagraphPropTypes = {
  ...defaultSpanPropTypes,
  noMargin: false,
};

Text.propTypes = spanPropTypes;
Text.defaultProps = defaultSpanPropTypes;
Paragraph.propTypes = paragraphPropTypes;
Paragraph.defaultProps = defaultParagraphPropTypes;

export function Text({
  children,
  fontSize,
  fontStyle,
  fontWeight,
  variant,
  ...props
}) {
  return (
    <Span
      {...props}
      $fontSize={fontSize}
      $fontStyle={fontStyle}
      $fontWeight={fontWeight}
      $variant={variant}
    >
      {children}
    </Span>
  );
}

export function Paragraph({
  children,
  fontSize,
  fontStyle,
  fontWeight,
  noMargin,
  variant,
  ...props
}) {
  return (
    <P
      {...props}
      $fontSize={fontSize}
      $fontStyle={fontStyle}
      $fontWeight={fontWeight}
      $noMargin={noMargin}
      $variant={variant}
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
  ${({ $noMargin }) =>
    $noMargin &&
    css`
      margin: 0;
    `}
`;
