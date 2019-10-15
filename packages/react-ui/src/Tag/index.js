import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { box, fonts, spacing, variants } from "../theme";

export const Tag = styled.div`
  display: inline-block;
  padding: ${spacing.xsmall} ${spacing.small};
  font-size: ${fonts.sizeSmall};
  ${({ size }) => {
    if (size === "small") {
      return css`
        padding: ${spacing.tiny} ${spacing.xsmall};
        font-size: ${fonts.sizeXsmall};
      `;
    }
  }}
  font-weight: bold;
  text-align: center;
  white-space: nowrap;
  line-height: ${fonts.sizeBase};
  border-radius: ${box.borderRadius};
  ${({ theme, variant }) => {
    let color = theme.darkText;
    let backgroundColor = theme.darkBackground;
    if (variant !== "default") {
      color = theme[`${variant}Text`];
      backgroundColor = theme[`${variant}Background`];
    }
    return css`
      color: ${color};
      background: ${backgroundColor};
    `;
  }}
`;

Tag.propTypes = {
  variant: PropTypes.oneOf(["default"].concat(variants)),
  size: PropTypes.oneOf(["default", "small"]),
  children: PropTypes.node.isRequired
};

Tag.defaultProps = {
  variant: "default",
  size: "default"
};
