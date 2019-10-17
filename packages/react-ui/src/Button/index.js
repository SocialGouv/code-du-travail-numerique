import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { lighten, transparentize } from "polished";

import { animations, fonts, spacing, variants } from "../theme";

export const StyledButton = styled.button`
  display: inline-block;
  padding: ${spacing.small} ${spacing.xmedium};
  font-weight: 600;
  font-size: ${fonts.sizeBase};
  line-height: inherit;
  text-align: center;
  vertical-align: middle;
  border: 1px solid;
  border-radius: ${spacing.xmedium};
  cursor: pointer;
  transition: background-color ${animations.transitionTiming} ease;
  appearance: none;

  ${props => {
    let color = props.theme.primaryText;
    let backgroundColor = props.theme.blueLight;

    if (props.variant === "link") {
      return css`
        padding: 0;
        color: ${props.theme.blueDark};
        font-weight: normal;
        font-size: inherit;
        line-height: initial;
        text-align: left;
        text-decoration: underline;
        vertical-align: initial;
        background: none;
        border: none;
        border-radius: 0;
        &:focus,
        &:hover,
        &:active {
          text-decoration: none;
        }
      `;
    }
    if (props.variant === "icon") {
      return css`
        padding: ${spacing.base};
        color: ${props.theme.darkText};
        line-height: 0;
        background-color: transparent;
        border: none;
        &:hover {
          color: ${lighten(0.3, props.theme.darkText)};
        }
      `;
    }

    if (props.variant !== "default") {
      backgroundColor = props.theme[`${props.variant}Background`];
      color = props.theme[`${props.variant}Text`];
    }

    return css`
      color: ${color};
      background: ${backgroundColor};
      border-color: ${backgroundColor};
      :not([disabled]) {
        &:hover,
        &:active,
        &:focus {
          color: ${lighten(0.05, color)};
          background: ${lighten(0.05, backgroundColor)};
        }
      }
      /* keep it last so it overrides other styles */
      &[disabled] {
        color: ${transparentize(0.6, color)};
        cursor: not-allowed;
      }
    `;
  }}
`;

export const Button = ({ noButton, ...props }) => (
  <StyledButton as={noButton ? "div" : "button"} {...props} />
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  noButton: PropTypes.bool,
  variant: PropTypes.oneOf(["default", "icon", "link"].concat(variants)),
  onClick: PropTypes.func
};

Button.defaultProps = {
  noButton: false,
  onClick: () => {},
  variant: "default"
};
