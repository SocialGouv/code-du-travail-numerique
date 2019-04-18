import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { animations, colors, box, spacing } from "../theme";
import { darken, lighten, transparentize } from "polished";

// OK it is a simple button in fact, on which you can provid a pressed prop...
const ToggleButton = ({ pressed, onClick, ...props }) => {
  return <Button aria-pressed={pressed} {...props} onClick={onClick} />;
};

ToggleButton.propTypes = {
  pressed: PropTypes.bool,
  onClick: PropTypes.func
};

ToggleButton.defaultProps = {
  pressed: false,
  onClick: () => {}
};

export default ToggleButton;

const Button = styled.button`
  padding: ${spacing.small} ${spacing.base};
  appearance: none;
  text-align: center;
  line-height: inherit;
  font-size: inherit;
  font-weight: 600;
  white-space: nowrap;
  border-width: 1px 1px 2px 1px;
  border-radius: ${box.borderRadius};
  cursor: pointer;
  transition: background-color ${animations.transitionTiming} ease;

  ${props => {
    let backgroundColor = colors.blueLight;
    let color = colors.primaryText;

    const expectedButtonTypes = [
      "primary",
      "secondary",
      "info",
      "warning",
      "danger",
      "success"
    ];

    let buttonType =
      Object.keys(props).find(prop => expectedButtonTypes.includes(prop)) ||
      false;

    if (buttonType) {
      backgroundColor = colors[`${buttonType}Background`];
      color = colors[`${buttonType}Text`];
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
          position: relative;
          top: 1px;
          color: ${lighten(0.1, color)};
          background: ${lighten(0.1, backgroundColor)};
          border-style: solid;
          border-width: 1px;
          border-color: ${backgroundColor};
        }
      }
      &[aria-pressed="true"] {
        position: relative;
        top: 1px;
        color: ${lighten(0.05, color)};
        background: ${lighten(0.05, backgroundColor)};
        border-width: 1px;
        border-color: ${backgroundColor};
        border-top-color: ${darken(0.1, backgroundColor)};
        box-shadow: inset 0 1px 2px 0 ${darken(0.1, backgroundColor)};
        :not([disabled]) {
          &:hover,
          &:focus {
            background-color: ${backgroundColor};
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
