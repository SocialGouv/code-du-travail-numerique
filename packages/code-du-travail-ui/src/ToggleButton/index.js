import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { colors, box, spacing } from "../theme";
import { darken, lighten } from "polished";

const ToggleButton = ({ pressed, onClick, ...props }) => {
  const [press, setPressed] = useState(pressed);

  useEffect(() => {
    setPressed(pressed);
  });

  const onPress = value => {
    setPressed(value);
    if (onClick) {
      onClick(value);
    }
  };

  return (
    <Button
      type="button"
      aria-pressed={press}
      {...props}
      onClick={() => onPress(!press)}
    />
  );
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
  user-select: none;
  appearance: none;
  cursor: pointer;
  display: inline-block;
  margin: 0;
  text-align: center;
  white-space: nowrap;
  line-height: inherit;
  font-size: inherit;
  font-weight: 600;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;

  text-decoration: none;

  padding: ${spacing.small} ${spacing.base};
  border-radius: ${box.borderRadius};
  border: 1px solid transparent;
  border-bottom-width: 2px;
  border-top-width: 1px;

  color: ${colors.primaryText};
  background-color: ${colors.blueLight};
  border-bottom-color: ${darken(0.1, colors.blueLight)};

  transition: background 250ms ease;

  &:focus {
    outline: none;
  }
  &:focus:not(:focus-visible) {
    border: 1px solid ${colors.focus};
  }
  &:focus:not(:-moz-focusring) {
    border: 1px solid ${colors.focus};
  }
  &[disabled] {
    cursor: not-allowed;
    opacity: 0.8;
    box-shadow: none;
    pointer-events: none;
  }

  &:active {
    border-bottom-color: transparent;
    border-top-color: transparent;
    position: relative;
    top: 1px;
  }
  &:disabled {
  }
  ${props => {
    let backgroundColor = props["aria-pressed"]
      ? darken(0.05, colors.blueLight)
      : colors.blueLight;
    let color = (color = props["aria-pressed"]
      ? darken(0.02, colors.primaryText)
      : colors.primaryText);

    if (props.primary) {
      backgroundColor = props["aria-pressed"]
        ? darken(0.05, colors.primaryBackground)
        : colors.primaryBackground;
      color = props["aria-pressed"]
        ? darken(0.02, colors.primaryText)
        : colors.primaryText;
    }
    if (props.secondary) {
      backgroundColor = props["aria-pressed"]
        ? darken(0.05, colors.secondaryBackground)
        : colors.secondaryBackground;
      color = props["aria-pressed"]
        ? darken(0.02, colors.secondaryText)
        : colors.secondaryText;
    }
    if (props.info) {
      backgroundColor = props["aria-pressed"]
        ? darken(0.05, colors.infoBackground)
        : colors.infoBackground;
      color = props["aria-pressed"]
        ? darken(0.02, colors.infoText)
        : colors.infoText;
    }
    if (props.warning) {
      backgroundColor = props["aria-pressed"]
        ? darken(0.05, colors.warningBackground)
        : colors.warningBackground;
      color = props["aria-pressed"]
        ? darken(0.02, colors.warningText)
        : colors.warningText;
    }
    if (props.danger) {
      backgroundColor = props["aria-pressed"]
        ? darken(0.05, colors.dangerBackground)
        : colors.dangerBackground;
      color = props["aria-pressed"]
        ? darken(0.02, colors.dangerText)
        : colors.dangerText;
    }
    if (props.success) {
      backgroundColor = props["aria-pressed"]
        ? darken(0.05, colors.successBackground)
        : colors.successBackground;
      color = props["aria-pressed"]
        ? darken(0.02, colors.successText)
        : colors.successText;
    }

    let borderTopColor = props["aria-pressed"]
      ? darken(0.15, backgroundColor)
      : "transparent";
    let borderBottomColor = props["aria-pressed"]
      ? "transparent"
      : darken(0.1, backgroundColor);

    return css`
      background: ${backgroundColor};
      border-bottom-color: ${borderBottomColor};
      border-top-color: ${borderTopColor};
      color: ${color};
      &:hover {
        background: ${darken(0.1, backgroundColor)};
        color: ${color};
      }
      &:active {
        background: ${lighten(0.025, backgroundColor)};
      }
    `;
  }}
`;
