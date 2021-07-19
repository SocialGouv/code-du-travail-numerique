import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import { box, breakpoints, fonts, spacings } from "../theme.js";

export const Input = ({ icon: Icon, className, ...props }) => {
  return (
    <StyledWrapper className={className}>
      <StyledInput hasIcon={Boolean(Icon)} {...props} />
      {Icon && (
        <StyledIcon>
          <Icon />
        </StyledIcon>
      )}
    </StyledWrapper>
  );
};

Input.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.elementType,
  name: PropTypes.string.isRequired,
};

Input.defaultProps = {
  icon: null,
};

const iconDateSvg = `<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill-rule="evenodd" clip-rule="evenodd" d="M20.947 7.601h1.601c1.472 0 2.521 1.198 2.521 2.669v2.306l-.001 10.392c0 1.472-1.049 2.669-2.521 2.669H8.669A2.672 2.672 0 016 22.967l.001-12.697a2.672 2.672 0 012.67-2.669h1.331V6h.999v1.601H20V6h.947v1.601zm1.6 17.036c.883 0 1.454-.786 1.454-1.67v-10.33h-17L7 22.967c0 .884.785 1.67 1.668 1.67h13.879zm-15.548-13h17.002l.001-1.367c0-.883-.57-1.601-1.453-1.601h-1.6v1.068H20V8.669h-9v1.068h-1V8.669H8.669C7.786 8.669 7 9.387 7 10.27v1.367zm9.677 6.277h-2.135a1.07 1.07 0 01-1.068-1.068v-2.135a1.07 1.07 0 011.068-1.068h2.135a1.07 1.07 0 011.068 1.068v2.135a1.07 1.07 0 01-1.068 1.068zm0-3.203h-2.135v2.135h2.136v-2.135zm3.203 3.203h2.135a1.07 1.07 0 001.068-1.068v-2.135a1.07 1.07 0 00-1.068-1.068H19.88a1.07 1.07 0 00-1.068 1.068v2.135a1.07 1.07 0 001.068 1.068zm0-3.203h2.135l.001 2.135H19.88v-2.135zm-8.54 8.541H9.204a1.07 1.07 0 01-1.068-1.068v-2.135a1.07 1.07 0 011.068-1.068h2.135a1.07 1.07 0 011.068 1.068v2.135a1.07 1.07 0 01-1.068 1.068zm0-3.203H9.204v2.135h2.136l-.001-2.135zm3.202 3.203h2.135a1.07 1.07 0 001.068-1.068v-2.135a1.07 1.07 0 00-1.068-1.068h-2.135a1.07 1.07 0 00-1.068 1.068v2.135a1.07 1.07 0 001.068 1.068zm0-3.203h2.135l.001 2.135h-2.136v-2.135zm7.473 3.203H19.88a1.07 1.07 0 01-1.068-1.068v-2.135a1.07 1.07 0 011.068-1.068h2.135a1.07 1.07 0 011.068 1.068v2.135a1.07 1.07 0 01-1.068 1.068zm0-3.203H19.88v2.135h2.136v-2.135z" fill="currentColor"/></svg>`;

const INPUT_HEIGHT = "5.4rem";

const StyledWrapper = styled.span`
  position: relative;
  display: inline-block;
  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  height: ${INPUT_HEIGHT};
  padding: 0 ${spacings.medium};
  padding-right: ${(props) => (props.hasIcon ? "5rem" : spacings.medium)};
  color: ${({ theme }) => theme.paragraph};
  font-weight: normal;
  font-size: ${fonts.sizes.default};
  font-family: "Open Sans", sans-serif;
  font-style: normal;
  line-height: inherit;
  text-align: ${(props) => (props.type === "number" ? "right" : "left")};
  background: ${({ theme }) => theme.white};
  border: 1px solid transparent;
  border-color: ${({ invalid, theme }) =>
    invalid ? theme.error : "transparent"};
  border-radius: ${box.borderRadius};
  box-shadow: ${({ theme }) => box.shadow.default(theme.secondary)};
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    margin: 0;
    appearance: none;
  }
  &::-webkit-calendar-picker-indicator {
    display: block;
    width: ${spacings.large};
    height: ${spacings.large};
    margin-right: -${spacings.medium};
    color: rgba(0, 0, 0, 0);
    background-color: ${({ theme }) => theme.placeholder};
    cursor: pointer;
    opacity: 1;
    mask-image: url("data:image/svg+xml;,${encodeURIComponent(iconDateSvg)}");
  }
  &:invalid {
    border-color: ${({ theme }) => theme.error};
  }
  &::placeholder {
    color: ${({ theme }) => theme.placeholder};
  }
  &:focus {
    border-color: ${({ theme }) => theme.secondary};
  }
  &:focus::placeholder {
    color: transparent;
  }
  appearance: none;
  @media (max-width: ${breakpoints.mobile}) {
    padding: 0 ${spacings.small};
    padding-right: ${(props) => (props.hasIcon ? "5rem" : spacings.medium)};
  }
`;

const StyledIcon = styled.div`
  position: absolute;
  top: 1rem;
  right: ${spacings.small};
  width: 100%;
  max-width: ${spacings.large};
  height: 100%;
  max-height: ${spacings.large};
  color: ${({ theme }) => theme.placeholder};
`;
