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

const propTypes = {
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

const defaultProps = {
  fontSize: "default",
  fontWeight: "400",
};

Text.propTypes = propTypes;
Text.defaultProps = defaultProps;
Paragraph.propTypes = propTypes;
Paragraph.defaultProps = defaultProps;

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

export function Paragraph({ children }) {
  return <P>{children}</P>;
}

const Span = styled.span`
  ${sharedStyle}
`;
const P = styled.p`
  ${sharedStyle}
`;
