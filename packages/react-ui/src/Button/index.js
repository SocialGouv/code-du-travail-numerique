import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { ArrowRight } from "react-feather";
import { lighten, transparentize } from "polished";

import { animations, box, fonts, spacings } from "../theme";

export const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  box-sizing: content-box;
  font-weight: 500;
  font-size: ${fonts.sizes.default};
  line-height: 1.125em;
  text-align: center;
  vertical-align: middle;
  border: 1px solid;
  border-radius: ${box.borderRadius};
  cursor: pointer;
  transition: background-color ${animations.transitionTiming} linear,
    border-color ${animations.transitionTiming} linear, transform 100ms linear;
  appearance: none;

  ${({ narrow, theme, small, variant }) => {
    if (variant === "link") {
      return css`
        padding: 0;
        color: ${theme.primary};
        font-weight: 400;
        font-size: ${fonts.sizes.default};
        line-height: ${fonts.lineHeight};
        text-align: left;
        background: none;
        border: none;
        border-radius: 0;
        &:focus,
        &:hover,
        &:active {
          text-decoration: underline;
        }
      `;
    }

    let height = "5.2rem";
    let backgroundColor = theme[`${variant}`];
    let borderColor = theme[`${variant}`];
    let color = theme[`${variant}Text`];
    let boxShadow =
      "0px 10px 30px rgba(52, 77, 122, 0.26), 0px 4px 5px rgba(117, 152, 214, 0.35)";
    let opacity = "1";

    let padding = "0 4.4rem";

    if (small) {
      height = "4rem";
      padding = "0 3rem";
    }

    if (narrow) {
      padding = small ? "0 1rem" : "0 1.9rem";
    }

    if (variant === "flat") {
      color = theme.paragraph;
      backgroundColor = theme.white;
      borderColor = theme.border;
      boxShadow = "none";
    }

    if (variant === "naked") {
      color = theme.paragraph;
      backgroundColor = "transparent";
      borderColor = "transparent";
      boxShadow = "none";
      opacity = "0.6";
    }

    return css`
      height: ${height};
      padding: ${padding};
      color: ${color};
      background: ${backgroundColor};
      border-color: ${borderColor};
      box-shadow: ${boxShadow};
      opacity: 1;

      &:link,
      &:visited {
        text-decoration: none;
        color: ${color};
      }
      :not([disabled]) {
        &:hover,
        &:active,
        &:focus {
          opacity: ${opacity};
          transform: translateY(-2px);
          background: ${lighten(0.1, backgroundColor)};
          border-color: ${lighten(0.1, borderColor)};
        }
      }
      /* keep it last so it overrides other styles */
      &[disabled] {
        color: ${transparentize(0.6, color)};
        box-shadow: none;
        cursor: not-allowed;
      }
    `;
  }}
`;

const StyledArrowRight = styled(ArrowRight)`
  height: 1.4rem;
  margin-left: ${spacings.tiny};
  transition: transform ${animations.transitionTiming} linear;
  /* stylelint-disable-next-line */
  ${StyledButton}:hover & {
    transform: translateX(5px);
  }
`;

export const Button = React.forwardRef(({ children, ...props }, ref) => (
  <StyledButton {...props} ref={ref}>
    {children}
    {props.variant === "link" && <StyledArrowRight />}
  </StyledButton>
));
Button.displayName = "Button";

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  small: PropTypes.bool,
  narrow: PropTypes.bool,
  variant: PropTypes.oneOf(["link", "flat", "naked", "primary", "secondary"])
};

Button.defaultProps = {
  onClick: () => {},
  narrow: false,
  small: false,
  variant: "secondary"
};
