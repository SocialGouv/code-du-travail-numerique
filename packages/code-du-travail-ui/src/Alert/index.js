import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { darken } from "polished";
import { box, colors, spacing, variants } from "../theme";

const Alert = ({ children, variant, ...props }) => (
  <StyledAlert variant={variant} {...props}>
    {children}
  </StyledAlert>
);

Alert.propTypes = {
  variant: PropTypes.oneOf(["default"].concat(variants)),
  children: PropTypes.node.isRequired
};

Alert.defaultProps = {
  variant: "default"
};

export default Alert;

const StyledAlert = styled.div`
  margin-bottom: ${spacing.base};
  padding: ${spacing.small} ${spacing.medium};
  border: 1px solid transparent;
  border-radius: ${box.borderRadius};
  ${props => {
    let color = colors.darkText;
    let backgroundColor = colors.darkBackground;
    let borderColor = darken(0.1, backgroundColor);
    if (props.variant !== "default") {
      color = colors[`${props.variant}Text`];
      backgroundColor = colors[`${props.variant}Background`];
      borderColor = darken(0.1, backgroundColor);
    }
    return css`
      color: ${color};
      background: ${backgroundColor};
      border-color: ${borderColor};
    `;
  }}
  &> *:last-child {
    margin-bottom: 0;
  }
`;
