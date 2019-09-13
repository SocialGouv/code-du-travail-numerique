import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { darken, lighten, transparentize } from "polished";

import { animations, box, fonts, spacing, variants } from "../theme";

// We don't want the variant prop to be passed down to the button
// eslint-disable-next-line
const RootButton = ({ children, pressed, variant, onClick, ...props }) => {
  return (
    <button aria-pressed={pressed} {...props} onClick={onClick}>
      {children}
    </button>
  );
};

const StyledButton = styled(RootButton)`
  padding: ${spacing.small} ${spacing.base};
  appearance: none;
  text-align: center;
  line-height: inherit;
  font-size: ${fonts.sizeBase};
  font-weight: 600;
  vertical-align: middle;
  border-style: solid;
  border-width: 1px 1px 2px 1px;
  border-radius: ${box.borderRadius};
  cursor: pointer;
  transition: background-color ${animations.transitionTiming} ease;

  ${props => {
    let color = props.theme.primaryText;
    let backgroundColor = props.theme.blueLight;
    if (props.variant === "link") {
      return css`
        padding: 0;
        vertical-align: initial;
        text-align: left;
        line-height: initial;
        color: ${props.theme.blue};
        font-weight: normal;
        font-size: inherit;
        background: none;
        border: none;
        border-radius: 0;
        text-decoration: underline;
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
        border: none;
        &:hover {
          color: ${lighten(0.3, props.theme.darkText)};
        }
        &:active {
          position: relative;
          top: 1px;
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
      border-bottom-color: ${darken(0.1, backgroundColor)};
      :not([disabled]) {
        &:hover,
        &:focus {
          background: ${lighten(0.05, backgroundColor)};
          color: ${lighten(0.05, color)};
        }
        &:active {
          color: ${lighten(0.1, color)};
          background: ${lighten(0.1, backgroundColor)};
          border-width: 2px 1px 1px 1px;
          border-color: ${backgroundColor};
          outline: none;
        }
      }
      &[aria-pressed="true"] {
        color: ${lighten(0.05, color)};
        background: ${lighten(0.05, backgroundColor)};
        border-width: 2px 1px 1px 1px;
        border-color: ${backgroundColor};
        border-top-color: ${darken(0.1, backgroundColor)};
        box-shadow: inset 0 1px 2px 0 ${darken(0.1, backgroundColor)};
        :not([disabled]) {
          &:hover,
          &:focus {
            background-color: ${backgroundColor};
          }
          &:active {
            border-top-color: ${darken(0.1, backgroundColor)};
          }
        }
      }
      /* keep it last so it overrides other styles */
      &[disabled] {
        cursor: not-allowed;
        color: ${transparentize(0.6, color)};
      }
    `;
  }}
`;

export const Button = ({ children, ...props }) => (
  <StyledButton {...props}>{children}</StyledButton>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["default", "icon", "link"].concat(variants)),
  onClick: PropTypes.func,
  pressed: PropTypes.bool
};

Button.defaultProps = {
  variant: "default",
  onClick: () => {},
  pressed: false
};
