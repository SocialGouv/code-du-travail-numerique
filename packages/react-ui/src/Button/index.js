import { lighten, rgba } from "polished";
import PropTypes from "prop-types";
import React from "react";
import styled, { css } from "styled-components";

import { DirectionRight } from "../icons/index.js";
import { animations, box, breakpoints, fonts, spacings } from "../theme.js";

export const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
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
  @media (max-width: ${breakpoints.mobile}) {
    font-size: ${fonts.sizes.small};
  }
  @media print {
    display: none;
  }
  ${({ narrow, theme, small, variant }) => {
    if (variant === "link") {
      return css`
        padding: 0;
        color: ${theme.primary};
        font-weight: 600;
        font-size: ${fonts.sizes.default};
        line-height: ${fonts.lineHeight};
        vertical-align: baseline;
        text-align: left;
        background: none;
        border: none;
        border-radius: 0;
        overflow: visible;
        &:focus,
        &:hover,
        &:active {
          text-decoration: underline;
        }
      `;
    }
    if (variant === "navLink") {
      return css`
        padding: 0;
        color: ${theme.paragraph};
        font-weight: normal;
        font-size: ${fonts.sizes.default};
        line-height: ${fonts.lineHeight};
        vertical-align: baseline;
        text-decoration: none;
        text-align: left;
        background: none;
        border: none;
        border-radius: 0;
        overflow: visible;
        transition: color ${animations.transitionTiming} linear,
          text-decoration ${animations.transitionTiming} linear;
        &:focus,
        &:hover,
        &:active {
          color: ${({ theme }) => theme.primary};
        }
      `;
    }

    let height = "5.2rem";
    let backgroundColor = theme[variant];
    let borderColor = theme[variant];
    let color = theme[variant + "Text"];
    const largeShadow = "0px 10px 20px";
    const smallShadow = "0px 5px 7px";
    let boxShadow = `${largeShadow} ${rgba(
      theme.secondary,
      0.26
    )}, ${smallShadow} ${rgba(theme.secondary, 0.35)}`;
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

    if (variant === "primary") {
      boxShadow = `${largeShadow} ${rgba(
        theme.primary,
        0.26
      )}, ${smallShadow} ${rgba(theme.primary, 0.35)}`;
    }

    return css`
      height: ${height};
      padding: ${padding};
      color: ${color};
      background: ${backgroundColor};
      border-color: ${borderColor};
      box-shadow: ${boxShadow};
      opacity: 1;
      will-change: transform;

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
        background-color: ${theme.bgTertiary};
        border-color: ${theme.bgTertiary};
        color: ${theme.placeholder};
        box-shadow: none;
        cursor: not-allowed;
      }
      ${({ narrow, small, variant }) => {
        if (variant !== "link" && !small && !narrow) {
          return css`
            @media (max-width: ${breakpoints.mobile}) {
              padding: 0 3rem;
            }
          `;
        }
      }}
    `;
  }}
`;

// eslint-disable-next-line no-unused-vars
const StyledArrowRight = styled(({ hasText, ...props }) => (
  <DirectionRight {...props} />
))`
  width: 2.6rem;
  height: 1.4rem;
  margin: ${({ hasText }) =>
    hasText ? `0 ${spacings.tiny} 0 ${spacings.small}` : "0"};
  transition: transform ${animations.transitionTiming} linear;
  /* stylelint-disable-next-line */
  ${StyledButton}:hover & {
    transform: translateX(4px);
  }
`;

export const Button = React.forwardRef(({ children, ...props }, ref) => (
  <StyledButton {...props} ref={ref}>
    {children}
    {props.variant === "link" && (
      <StyledArrowRight hasText={Boolean(children)} />
    )}
  </StyledButton>
));
Button.displayName = "Button";

Button.propTypes = {
  children: PropTypes.node,
  narrow: PropTypes.bool,
  onClick: PropTypes.func,
  small: PropTypes.bool,
  variant: PropTypes.oneOf([
    "link",
    "navLink",
    "flat",
    "naked",
    "primary",
    "secondary",
  ]),
};

Button.defaultProps = {
  children: "",
  narrow: false,
  onClick: () => {},
  small: false,
  variant: "secondary",
};
