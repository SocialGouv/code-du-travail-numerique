import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { transparentize } from "polished";
import { animation, box, font, space, variants } from "../theme";

// We don't want the children, variant props to be passed down to the button
// eslint-disable-next-line
const RootButton = ({ children, variant, onClick, ...props }) => {
  return (
    <button {...props} onClick={onClick}>
      {children}
    </button>
  );
};

const StyledButton = styled(RootButton)`
  padding: ${space.small} ${space.large};
  appearance: none;
  text-align: center;
  line-height: inherit;
  font-size: ${font.sizes.default};
  font-weight: ${font.weights.bold};
  vertical-align: middle;
  border-radius: 1.375rem;
  box-shadow: none;
  cursor: pointer;
  transition: box-shadow ${animation.timings.transition} ease;
  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }
  ${props => {
    let color, backgroundColor, border;
    if (props.variant === "outlined") {
      color = props.theme.colors.text.dark;
      backgroundColor = props.theme.colors.white;
      border = props.theme.colors.primary.default;
    } else {
      color = props.theme.colors[props.variant].textOnDefault;
      backgroundColor = props.theme.colors[props.variant].default;
      border = props.theme.colors[props.variant].default;
    }
    const shadowColor = transparentize(0.3, border);
    return css`
      color: ${color};
      background-color: ${backgroundColor};
      border: 1px solid ${border};
      :not([disabled]) {
        &:hover,
        &:focus,
        &:active {
          box-shadow: ${box.shadow} ${shadowColor};
        }
      }
    `;
  }}
`;

export const Button = ({ children, ...props }) => (
  <StyledButton {...props}>{children}</StyledButton>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(variants.concat(["outlined"]))
};

Button.defaultProps = {
  onClick: () => {},
  disabled: false,
  variant: "primary"
};
