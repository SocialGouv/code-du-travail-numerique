import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { animations, box, fonts, spacings } from "../theme";

export const Select = ({ children, ...props }) => (
  <StyledSelect {...props}>{children}</StyledSelect>
);

Select.propTypes = {
  children: PropTypes.node.isRequired
};

const INPUT_HEIGHT = "5.4rem";

const iconArrowDownSvg = `<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><g clip-path="url(#clip0)"><path d="M8.425 11.573l7.11-6.072a.709.709 0 00.26-.537.709.709 0 00-.26-.537.973.973 0 00-.629-.223.973.973 0 00-.63.223l-6.48 5.536-6.481-5.536a.973.973 0 00-.63-.223.973.973 0 00-.628.223.708.708 0 00-.261.537c0 .202.094.395.26.537l7.11 6.072a.91.91 0 00.29.165 1.021 1.021 0 00.68 0 .91.91 0 00.29-.165z" fill="rgb(255, 112, 103)"/></g><defs><clipPath id="clip0"><path fill="currentColor" d="M0 0h16v16H0z"/></clipPath></defs></svg>`;

const StyledSelect = styled.select`
  max-width: 100%;
  height: ${INPUT_HEIGHT};
  padding: 0 ${spacings.medium} 0 ;
  padding-right: 5rem;
  color: ${({ theme }) => theme.paragraph};
  font-size: ${fonts.sizes.default};
  font-family: "Open Sans", sans-serif;
  vertical-align: middle;
  background: ${({ theme }) =>
    theme.white} url("data:image/svg+xml;,${encodeURIComponent(
  iconArrowDownSvg
)}") no-repeat;
  background-position: top ${spacings.medium} right ${spacings.medium};
  background-size: 1.6rem;
  border: none;
  border-radius: ${box.borderRadius};
  box-shadow: ${({ theme }) => box.shadow.large(theme.secondary)};
  cursor: pointer;
  transition: border-color ${animations.transitionTiming} ease;
  appearance: none;
  &:disabled {
    background-color: ${({ theme }) => theme.bgTertiary};
  }
  /* Internet Explorer 11 specifics rules */
  &::-ms-expand {
    background-color: transparent;
    border: 0 transparent;
  }
  *::-ms-backdrop,
  & {
    padding-right: ${spacings.base};
  }
`;
