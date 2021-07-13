import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import { box } from "../theme.js";

export const InputRadio = ({ label, name, id, size, ...props }) => (
  <StyledLabel htmlFor={id} size={size}>
    <StyledRadio type="radio" name={name} id={id} size={size} {...props} />
    {label}
  </StyledLabel>
);

InputRadio.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  name: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
};

InputRadio.defaultProps = {
  size: "1.6rem",
};

const StyledLabel = styled.label`
  display: flex;
  font-size: ${(props) => props.size};
  cursor: pointer;
`;

const StyledRadio = styled.input`
  position: relative;
  display: inline-block;
  flex-shrink: 0;
  width: calc(${(props) => props.size} * 1.25);
  height: calc(${(props) => props.size} * 1.25);
  margin: calc(${(props) => props.size} / 5)
    calc(2 * ${(props) => props.size} / 3) 0 0;
  padding: 0;
  line-height: inherit;
  background: ${({ theme }) => theme.white};
  border: ${({ theme }) => box.border(theme.border)};
  border-radius: 50%;
  box-shadow: none;
  cursor: pointer;
  appearance: none;
  &:before {
    position: absolute;
    top: 50%;
    left: 50%;
    display: none;
    width: calc(${(props) => props.size} / 1.5);
    height: calc(${(props) => props.size} / 1.5);
    background-color: ${({ theme }) => theme.primary};
    border-radius: 50%;
    transform: translate(-50%, -50%);
    content: "";
  }
  &:checked {
    background-color: ${({ theme }) => theme.white};
    border-color: ${({ theme }) => theme.primary};
    &:before {
      display: block;
    }
  }
`;
