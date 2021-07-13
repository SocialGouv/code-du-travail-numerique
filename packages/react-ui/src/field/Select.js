import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import { ArrowDown } from "../icons/index.js";
import { animations, box, breakpoints, fonts, spacings } from "../theme.js";

export const Select = ({ children, disabled, className, ...props }) => (
  <StyledWrapper className={className}>
    <StyledSelect disabled={disabled} {...props}>
      {children}
    </StyledSelect>
    <StyledArrowDown aria-hidden="true" isDisabled={disabled}>
      <ArrowDown />
    </StyledArrowDown>
  </StyledWrapper>
);

Select.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

Select.defaultProps = {
  disabled: false,
};

const INPUT_HEIGHT = "5.4rem";

const StyledWrapper = styled.div`
  position: relative;
  display: inline-flex;
  flex: 1 1 auto;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
  }
`;

const StyledArrowDown = styled.div`
  position: absolute;
  top: ${spacings.base};
  right: ${spacings.base};
  width: 1.6rem;
  height: 1.6rem;
  color: ${({ isDisabled, theme }) =>
    isDisabled ? theme.placeholder : theme.primary};
  pointer-events: none;
`;

const StyledSelect = styled.select`
  width: 100%;
  height: ${INPUT_HEIGHT};
  padding: 0 ${spacings.medium} 0;
  padding-right: 5rem;
  color: ${({ theme }) => theme.paragraph};
  font-size: ${fonts.sizes.default};
  font-family: "Open Sans", sans-serif;
  vertical-align: middle;
  background-color: ${({ theme }) => theme.white};
  border: none;
  border-radius: ${box.borderRadius};
  box-shadow: ${({ theme }) => box.shadow.default(theme.secondary)};
  cursor: pointer;
  transition: border-color ${animations.transitionTiming} ease;
  appearance: none;
  /* Internet Explorer 11 specifics rules */
  &::-ms-expand {
    background-color: transparent;
    border: 0 transparent;
  }
  *::-ms-backdrop,
  & {
    padding-right: ${spacings.base};
  }
  &:invalid {
    border-color: ${({ theme }) => theme.error};
  }
  &:disabled {
    background-color: ${({ theme }) => theme.bgTertiary};
  }
`;
