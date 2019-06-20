import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { box, colors, spacing } from "../../theme";

const Wrapper = ({ children, variant, ...props }) => {
  return (
    <StyledWrapper variant={variant} {...props}>
      {children}
    </StyledWrapper>
  );
};

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(["default", "light", "dark", "outline"])
};

Wrapper.defaultProps = {
  className: "",
  variant: "default"
};

const StyledWrapper = styled.div`
  padding: ${spacing.small} ${spacing.medium};
  color: ${colors.darkText};
  border-width: 1px;
  border-style: solid;
  border-radius: ${box.borderRadius};
  border-color: ${colors.elementBorder};
  ${props => {
    if (props.variant === "default") {
      return css`
        border-color: transparent;
      `;
    }
    if (props.variant === "light") {
      return css`
        background-color: ${colors.white};
      `;
    }
    if (props.variant === "dark") {
      return css`
        background-color: ${colors.darkBackground};
      `;
    }
  }}
  & > *:first-child {
    margin-top: 0;
  }
  & > *:last-child {
    margin-bottom: 0;
  }
  @media print {
    border: none;
    padding: 0 5pt;
  }
`;

export default Wrapper;
