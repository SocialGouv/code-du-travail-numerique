import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Label } from "./Label";
import { animations, box, fonts, spacings } from "../theme";

export const InputRadio = ({ label, name, id, size, ...props }) => (
  <StyledLabel htmlFor={id}>
    <StyledRadio type="radio" name={name} id={id} size={size} {...props} />
    {label}
  </StyledLabel>
);

InputRadio.propTypes = {
  label: PropTypes.string.required,
  name: PropTypes.string.required,
  id: PropTypes.string.required,
  size: PropTypes.string.required
};

InputRadio.defaultProps = {
  size: "2rem"
};

const StyledLabel = styled(Label)`
  font-weight: normal;
  font-size: ${fonts.sizes.default};
`;

const StyledRadio = styled.input`
  position: relative;
  display: inline-block;
  flex-shrink: 0;
  width: ${props => props.size};
  height: ${props => props.size};
  margin: 0 ${spacings.base} 0 0;
  padding: 0;
  line-height: inherit;
  background: ${({ theme }) => theme.white};
  border: ${({ theme }) => box.border(theme.border)};
  border-radius: 50%;
  box-shadow: none;
  cursor: pointer;
  appearance: none;
  &:checked {
    background-color: ${({ theme }) => theme.white};
    border-color: ${({ theme }) => theme.primary};
  }
  &::before {
    position: absolute;
    top: calc(50% - ${props => props.size} / 4);
    left: calc(50% - ${props => props.size} / 4);
    width: calc(${props => props.size} / 2);
    height: calc(${props => props.size} / 2);
    background-color: ${({ theme }) => theme.secondary};
    border-radius: 50%;
    transform: scale(0);
    transition: all ${animations.transitionTiming} ease-out;
    content: "";
  }
  &:checked::before {
    background-color: ${({ theme }) => theme.primary};
    transform: scale(1);
  }
`;
