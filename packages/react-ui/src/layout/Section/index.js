import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { spacing } from "../../theme";

const Section = ({ children, variant, ...props }) => (
  <StyledSection variant={variant} {...props}>
    {children}
  </StyledSection>
);

Section.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(["default", "white", "light", "dark"])
};

Section.defaultProps = {
  className: "",
  variant: "default"
};

const StyledSection = styled.div`
  padding: ${spacing.interComponent} 0;
  color: ${({ theme }) => theme.darkText};
  ${props => {
    if (props.variant === "white") {
      return css`
        background-color: ${props.theme.white};
      `;
    }
    if (props.variant === "light") {
      return css`
        background-color: ${props.theme.lightBackground};
      `;
    }
    if (props.variant === "dark") {
      return css`
        background-color: ${props.theme.darkBackground};
      `;
    }
  }}
`;

export default Section;
