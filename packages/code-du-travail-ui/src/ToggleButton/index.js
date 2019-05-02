import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { animations, box, colors, fonts, spacing } from "../theme";
import { darken, lighten, transparentize } from "polished";

// We don't want the kind prop to be passed down to the button
// eslint-disable-next-line
const Button = ({ pressed, kind, onClick, ...props }) => {
  return <button aria-pressed={pressed} {...props} onClick={onClick} />;
};

Button.propTypes = {
  kind: PropTypes.oneOf([
    "",
    "primary",
    "secondary",
    "info",
    "warning",
    "danger",
    "success",
    "icon"
  ]),
  onClick: PropTypes.func,
  pressed: PropTypes.bool
};

Button.defaultProps = {
  kind: "",
  onClick: () => {},
  pressed: false
};

const StyledButton = styled(Button)`
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
    let backgroundColor = colors.blueLight;
    let color = colors.primaryText;

    if (props.kind) {
      backgroundColor = colors[`${props.kind}Background`];
      color = colors[`${props.kind}Text`];
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

export default StyledButton;
