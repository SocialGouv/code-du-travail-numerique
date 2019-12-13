import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { box, colors, fonts, spacings } from "../theme";

export const Textarea = ({ name, ...props }) => (
  <StyledTextarea name={name} {...props} />
);

Textarea.propTypes = {
  name: PropTypes.string.required
};

const StyledTextarea = styled.textarea`
  min-height: 8rem;
  padding: ${spacings.medium};
  max-width: 100%;
  color: ${({ theme }) => theme.paragraph};
  font-size: ${fonts.sizes.default};
  font-family: "Open Sans", sans-serif;
  line-height: inherit;
  background: ${({ theme }) => theme.white};
  border: 1px solid transparent;
  border-radius: ${box.borderRadius};
  box-shadow: ${({ theme }) => box.shadow.large(theme.secondary)};
  appearance: none;
  &::placeholder {
    color: ${({ theme }) => theme.placeholder};
  }
  &:focus {
    border-color: ${colors.secondary};
  }
  &:focus::placeholder {
    color: transparent;
  }
  appearance: none;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    margin: 0;
    appearance: none;
  }
`;
