import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { colors, box, spacing } from "../theme";
import { darken, lighten } from "polished";

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
  text-align: center;
  line-height: inherit;
  font-size: inherit;
  font-weight: 600;
  border: 1px solid transparent;
  border-bottom-width: 2px;
  border-top-width: 1px;
  border-radius: ${box.borderRadius};
  cursor: pointer;
  transition: all 250ms ease;

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
      border-top-color: transparent;
      border-bottom-color: ${darken(0.1, backgroundColor)};

      &[disabled] {
        cursor: not-allowed;
      }
      :not([disabled]) {
        &:hover,
        &:focus {
          background: ${lighten(0.05, backgroundColor)};
          color: ${color};
        }
        &:active {
          position: relative;
          top: 1px;
          background: ${lighten(0.1, backgroundColor)};
          border-bottom-color: transparent;
          border-top-color: transparent;
        }
      }

      &[aria-pressed="true"] {
        background: ${darken(0.1, backgroundColor)};
        color: ${darken(0.1, color)};
        border-top-color: ${darken(0.15, backgroundColor)};
        border-bottom-color: transparent;
      }
    `;
  }}
`;
