import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Label } from "./Label";
import { animations, box, fonts, spacings } from "../theme";

export const InputRadio = ({ label, name, id, ...props }) => (
  <StyledLabel htmlFor={id}>
    <StyledRadio type="radio" name={name} id={id} {...props} />
    {label}
  </StyledLabel>
);

InputRadio.propTypes = {
  label: PropTypes.string.required,
  name: PropTypes.string.required,
  id: PropTypes.string.required
};

const RADIO_SIZE = "2rem";

const StyledLabel = styled(Label)`
  font-weight: normal;
  font-size: ${fonts.sizes.default};
`;

const StyledRadio = styled.input`
  position: relative;
  display: inline-block;
  flex-shrink: 0;
  width: ${RADIO_SIZE};
  height: ${RADIO_SIZE};
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
    top: calc(50% - ${RADIO_SIZE} / 4);
    left: calc(50% - ${RADIO_SIZE} / 4);
    width: calc(${RADIO_SIZE} / 2);
    height: calc(${RADIO_SIZE} / 2);
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
