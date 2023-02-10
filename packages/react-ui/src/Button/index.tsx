import { lighten, rgba } from "polished";
import React from "react";
import styled, { css } from "styled-components";

import { DirectionRight } from "../icons/index.js";
import { animations, box, breakpoints, fonts, spacings } from "../theme.js";

export const StyledButton = styled.button<ButtonProps>`
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
  ${({ narrow, theme, small, variant, xsmall }) => {
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

        &:hover {
          text-decoration: underline;

          svg {
            transform: translateX(4px);
          }
        }

        svg {
          width: 2.6rem;
          height: 1.4rem;
          margin: ${({ hasText }: any) =>
            hasText ? `0 ${spacings.tiny} 0 ${spacings.small}` : "0"};
          transition: transform ${animations.transitionTiming} linear;
          /* stylelint-disable-next-line */
          fill: ${theme.primary};
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

        &:focus {
          color: ${({ theme }) => theme.primary};
        }
      `;
    }

    let height = "5.2rem";
    let backgroundColor = theme[variant ?? "primary"];
    let borderColor = theme[variant ?? "primary"];
    let color = theme[variant + "Text"];
    const largeShadow = "0px 10px 20px";
    const smallShadow = "0px 5px 7px";
    let boxShadow: any = `${largeShadow} ${rgba(
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

    if (xsmall) {
      height = "2.8rem";
      padding = "0 3rem";
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
        &:hover {
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

      ${({ narrow, small, variant }: any) => {
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

type ButtonProps = {
  children?: React.ReactNode;
  hasText?: boolean;
  icon?: React.ElementType;
  narrow?: boolean;
  onClick?: () => void;
  small?: boolean;
  variant?: "link" | "navLink" | "flat" | "naked" | "primary" | "secondary";
  xsmall?: boolean;
  as?: React.ElementType;
};

const defaultProps: ButtonProps = {
  children: "",
  narrow: false,
  onClick: () => {},
  small: false,
  variant: "secondary",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const StyledCustomIcon = props.icon || DirectionRight;
    return (
      <StyledButton {...props} ref={ref}>
        {props.children}
        {props.variant && props.variant === "link" && (
          <StyledCustomIcon hasText={Boolean(props.children)} />
        )}
      </StyledButton>
    );
  }
);

Button.defaultProps = defaultProps;

Button.displayName = "Button";
