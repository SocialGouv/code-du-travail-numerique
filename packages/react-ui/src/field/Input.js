import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { box, breakpoints, colors, fonts, spacings } from "../theme";

export const Input = ({ name, icon: Icon, ...props }) => {
  return (
    <StyledWrapper>
      <StyledInput name={name} hasIcon={Boolean(Icon)} {...props} />
      {Icon && (
        <StyledIcon>
          <Icon />
        </StyledIcon>
      )}
    </StyledWrapper>
  );
};

Input.propTypes = {
  name: PropTypes.string.required,
  icon: PropTypes.node
};

Input.defaultProps = {
  icon: null
};

const INPUT_HEIGHT = "5.4rem";

const StyledWrapper = styled.div`
  position: relative;
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
`;

const StyledInput = styled.input`
  width: 100%;
  height: ${INPUT_HEIGHT};
  padding: 0 ${spacings.medium};
  padding-right: ${props => (props.hasIcon ? "5rem" : spacings.medium)};
  background: ${({ theme }) => theme.white};
  box-shadow: ${({ theme }) => box.shadow.large(theme.secondary)};
  text-align: ${props => (props.type === "number" ? "right" : "left")};
  font-family: "Open Sans", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: ${fonts.sizes.default};
  color: ${({ theme }) => theme.paragraph};
  border: 1px solid transparent;
  border-color: ${props => (props.invalid ? colors.error : "transparent")};
  border-radius: ${box.borderRadius};
  line-height: inherit;
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
  @media (max-width: ${breakpoints.mobile}) {
    padding: 0 ${spacings.small};
  }
`;

const StyledIcon = styled.div`
  color: ${({ theme }) => theme.placeholder};
  position: absolute;
  right: ${spacings.small};
  width: 100%;
  max-width: ${spacings.large};
  height: 100%;
  max-height: ${spacings.large};
`;
