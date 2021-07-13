import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import { box, spacings } from "../theme.js";

export const InputCheckbox = ({ label, name, id, size, ...props }) => (
  <StyledLabel htmlFor={id} size={size}>
    <StyledCheckbox
      type="checkbox"
      name={name}
      id={id}
      size={size}
      {...props}
    />
    {label}
  </StyledLabel>
);

InputCheckbox.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  size: PropTypes.string,
};

InputCheckbox.defaultProps = {
  size: "1.6rem",
};

const StyledLabel = styled.label`
  display: flex;
  font-size: ${(props) => props.size};
  cursor: pointer;
`;

const StyledCheckbox = styled.input`
  position: relative;
  display: block;
  flex-shrink: 0;
  width: calc(${(props) => props.size} * 1.25);
  height: calc(${(props) => props.size} * 1.25);
  margin: calc(${(props) => props.size} / 5)
    calc(2 * ${(props) => props.size} / 3) 0 0;
  background: ${({ theme }) => theme.white};
  border: ${({ theme }) => box.border(theme.border)};
  border-radius: ${spacings.tiny};
  cursor: pointer;
  appearance: none;
  &:before {
    position: absolute;
    top: 50%;
    left: 50%;
    display: none;
    width: calc(${(props) => props.size} / 3);
    height: calc(${(props) => props.size} / 1.7);
    border: ${({ theme }) => box.border(theme.white)};
    border-width: 0 calc(${(props) => props.size} / 10)
      calc(${(props) => props.size} / 10) 0;
    transform: translate(-50%, -60%) rotate(45deg);
    content: "";
  }
  &:checked {
    background-color: ${({ theme }) => theme.primary};
    &:before {
      display: block;
    }
  }
`;
