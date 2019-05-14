import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { colors, spacing } from "../../theme";

const Section = ({ children, className, variant }) => (
  <StyledSection variant={variant} className={className}>
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
  ${props => {
    if (props.variant === "white") {
      return css`
        background-color: ${colors.white};
      `;
    }
    if (props.variant === "light") {
      return css`
        background-color: ${colors.lightBackground};
      `;
    }
    if (props.variant === "dark") {
      return css`
        background-color: ${colors.darkBackground};
      `;
    }
  }}
`;

export default Section;
