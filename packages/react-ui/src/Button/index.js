import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { lighten, transparentize } from "polished";

import { animations, fonts, spacing, variants } from "../theme";

// We don't want the variant prop to be passed down to the button
// eslint-disable-next-line
const RootButton = ({ variant, onClick, ...props }) => {
  return <button {...props} onClick={onClick} />;
};

const StyledButton = styled(RootButton)`
  padding: ${spacing.small} ${spacing.xmedium};
  appearance: none;
  text-align: center;
  line-height: inherit;
  font-size: ${fonts.sizeBase};
  font-weight: 600;
  vertical-align: middle;
  border: 1px solid;
  border-radius: ${spacing.xmedium};
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
        color: ${props.theme.blueDark};
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
          background: ${lighten(0.05, backgroundColor)};
          color: ${lighten(0.05, color)};
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
  onClick: PropTypes.func
};

Button.defaultProps = {
  variant: "default",
  onClick: () => {}
};
