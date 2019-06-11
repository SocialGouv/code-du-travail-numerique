import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { box, colors, fonts, spacing, variants } from "../theme";

const Tag = ({ children, variant, ...props }) => (
  <StyledTag variant={variant} {...props}>
    {children}
  </StyledTag>
);

Tag.propTypes = {
  variant: PropTypes.oneOf(["default"].concat(variants)),
  size: PropTypes.oneOf(["default", "small"]),
  children: PropTypes.node.isRequired
};

Tag.defaultProps = {
  variant: "default",
  size: "default"
};

export default Tag;

const StyledTag = styled.div`
  display: inline-block;
  ${({ size }) => {
    let verticalPadding = spacing.xsmall;
    let horizontalPadding = spacing.small;
    if (size === "small") {
      verticalPadding = spacing.tiny;
      horizontalPadding = spacing.xsmall;
    }
    return css`
      padding: ${verticalPadding} ${horizontalPadding};
    `;
  }}
  font-size: ${fonts.sizeXsmall};
  font-weight: bold;
  text-align: center;
  white-space: nowrap;
  line-height: ${fonts.sizeBase};
  border-radius: ${box.borderRadius};
  ${props => {
    let color = colors.darkText;
    let backgroundColor = colors.darkBackground;
    if (props.variant !== "default") {
      color = colors[`${props.variant}Text`];
      backgroundColor = colors[`${props.variant}Background`];
    }
    return css`
      color: ${color};
      background: ${backgroundColor};
    `;
  }}
`;
