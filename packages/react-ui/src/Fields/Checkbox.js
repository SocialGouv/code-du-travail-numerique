import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Label } from "./Label";
import { box, fonts, spacings } from "../theme";

export const InputCheckbox = ({ label, name, id, ...props }) => (
  <StyledWrapper>
    <StyledLabel htmlFor={id}>
      <StyledCheckbox type="checkbox" name={name} id={id} {...props} />
      {label}
      <StyledCheckmark />
    </StyledLabel>
  </StyledWrapper>
);

InputCheckbox.propTypes = {
  label: PropTypes.string.required,
  name: PropTypes.string.required,
  id: PropTypes.string.required
};

const CHECKBOX_SIZE = "2rem";

const StyledWrapper = styled.div`
  position: relative;
`;

const StyledCheckmark = styled.span`
  position: absolute;
  left: 0;
  width: ${CHECKBOX_SIZE};
  height: ${CHECKBOX_SIZE};
  border-radius: ${spacings.tiny};
  background-color: transparent;
  border: ${({ theme }) => box.border(theme.border)};
  &:after {
    content: "";
    position: absolute;
    display: none;
  }
`;

const StyledCheckbox = styled.input`
  position: relative;
  display: inline-block;
  flex-shrink: 0;
  width: ${CHECKBOX_SIZE};
  height: ${CHECKBOX_SIZE};
  border-radius: ${spacings.tiny};
  margin: 0 ${spacings.base} 0 0;
  padding: 0;
  box-shadow: none;
  appearance: none;
`;

const StyledLabel = styled(Label)`
  font-weight: normal;
  font-size: ${fonts.sizes.default};
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  &:hover ${StyledCheckbox} ~ ${StyledCheckmark} {
    background-color: ${({ theme }) => theme.border};
    border: 0;
  }
  & ${StyledCheckbox}:checked ~ ${StyledCheckmark} {
    background-color: ${({ theme }) => theme.primary};
    border: 0;
  }
  & ${StyledCheckbox}:checked ~ ${StyledCheckmark}:after {
    display: block;
  }
  & ${StyledCheckmark}:after {
    left: ${spacings.xsmall};
    top: ${spacings.tiny};
    width: 0.5rem;
    height: ${spacings.small};
    border: solid ${({ theme }) => theme.white};
    border-width: 0 0.2rem 0.2rem 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`;
