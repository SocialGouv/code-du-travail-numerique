import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { box, breakpoints, fonts, spacings } from "../theme";

export const Textarea = ({ name, ...props }) => (
  <StyledTextarea name={name} {...props} />
);

Textarea.propTypes = {
  name: PropTypes.string.isRequired
};

const StyledTextarea = styled.textarea`
  width: 100%;
  min-height: 12rem;
  padding: ${spacings.medium};
  color: ${({ theme }) => theme.paragraph};
  font-size: ${fonts.sizes.default};
  font-family: "Open Sans", sans-serif;
  line-height: inherit;
  background: ${({ theme }) => theme.white};
  border: 1px solid transparent;
  border-radius: ${box.borderRadius};
  box-shadow: ${({ theme }) => box.shadow.default(theme.secondary)};
  appearance: none;
  &::placeholder {
    color: ${({ theme }) => theme.placeholder};
  }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    margin: 0;
    appearance: none;
  }
  &:focus {
    border-color: ${({ theme }) => theme.secondary};
  }
  &:focus::placeholder {
    color: transparent;
  }
  &[disabled] {
    color: ${({ theme }) => theme.placeholder};
    background-color: ${({ theme }) => theme.bgTertiary};
    box-shadow: none;
    cursor: not-allowed;
  }
  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
  }
`;
