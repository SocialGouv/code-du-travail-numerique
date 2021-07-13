import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import { fonts } from "../theme.js";

export const Text = styled.span`
  ${({ variant, fontSize, fontWeight, theme }) => {
    const color = variant ? theme[variant] : theme.paragraph;
    const fontSizeTheme = fontSize.startsWith("h")
      ? fonts.sizes.headings[fontSize.replace("h", "")]
      : fonts.sizes[fontSize];

    return css`
      color: ${color};
      line-height: ${fonts.lineHeightTitle};
      font-size: ${fontSizeTheme};
      font-weight: ${fontWeight};
    `;
  }}
`;

Text.propTypes = {
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
  variant: PropTypes.oneOf(["primary", "secondary"]),
};
Text.defaultProps = {
  fontSize: "default",
  fontWeight: "400",
};
