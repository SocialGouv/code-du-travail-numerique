import PropTypes from "prop-types";
import React from "react";
import styled, { css } from "styled-components";

import { box, breakpoints, fonts, spacings } from "../theme";

export const Input = React.forwardRef(function Input(
  { icon: Icon, text, className, updateOnScrollDisabled, ...props },
  ref
) {
  const onWheel = updateOnScrollDisabled
    ? { onWheel: (e) => e.target.blur() }
    : {};
  return (
    <StyledWrapper className={className}>
      <StyledInput
        ref={ref}
        hasIcon={Boolean(Icon)}
        text={text}
        {...onWheel}
        {...props}
      />
      {Icon && (
        <StyledIcon text={text}>
          <Icon />
        </StyledIcon>
      )}
      {text && (
        <StyledIcon text={text}>
          <span>{text}</span>
        </StyledIcon>
      )}
    </StyledWrapper>
  );
});

export const DefaultInputProps = {
  className: PropTypes.string,
  icon: PropTypes.elementType,
  id: PropTypes.string,
  invalid: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  ref: PropTypes.any,
  text: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
  updateOnScrollDisabled: PropTypes.bool,
  value: PropTypes.any,
};

Input.propTypes = DefaultInputProps;

Input.defaultProps = {
  icon: null,
};

export const INPUT_HEIGHT = "5.4rem";

const StyledWrapper = styled.div`
  position: relative;
  display: inline-block;
  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  height: ${INPUT_HEIGHT};
  padding: 0 ${spacings.medium};
  padding-right: ${(props) => {
    if (props.hasIcon) {
      return "5rem";
    }
    if (props.text) {
      return "6rem";
    }
    return spacings.medium;
  }};
  color: ${({ theme }) => theme.paragraph};
  font-weight: normal;
  font-size: ${fonts.sizes.default};
  font-family: "Open Sans", sans-serif;
  font-style: normal;
  line-height: inherit;
  text-align: ${(props) => (props.type === "number" ? "right" : "left")};
  background: ${({ theme }) => theme.white};
  border: 1px solid;
  border-color: ${({ invalid, theme }) =>
    invalid ? theme.error : "transparent"};
  border-radius: ${box.borderRadius};
  box-shadow: ${({ theme }) => box.shadow.default(theme.secondary)};
  outline: none;

  /* stylelint-disable */
  &[type="number"] {
    -moz-appearance: textfield;
  }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  /* stylelint-enable */

  &:invalid {
    border-color: ${({ theme }) => theme.error};
  }

  &::placeholder {
    color: ${({ theme }) => theme.placeholder};
  }

  &:focus {
    border-color: ${({ theme }) => theme.secondary};
  }

  &:focus::placeholder {
    color: transparent;
  }

  appearance: none;
  @media (max-width: ${breakpoints.mobile}) {
    padding: 0 ${spacings.small};
    padding-right: ${(props) => {
      if (props.text) {
        return "6rem";
      }
      return props.hasIcon ? "5rem" : spacings.medium;
    }};
  }
`;

const StyledIcon = styled.div`
  position: absolute;
  top: 1rem;
  right: ${spacings.small};
  width: 100%;
  max-width: ${({ text }) => (text ? spacings.base : spacings.large)};
  height: 100%;
  max-height: ${spacings.large};
  color: ${({ theme }) => theme.placeholder};
  font-size: 1.6rem;
  ${({ text }) =>
    text &&
    css`
      display: flex;
      align-items: center;
      justify-content: center;
      right: ${spacings.medium};
      top: ${spacings.small};
      user-select: none;
    `};
`;
