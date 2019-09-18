import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import { paleRainbow } from "../keyframes";
import { box, breakpoints, colors, spacing } from "../theme";

const LargeLink = React.forwardRef(
  ({ icon: Icon, children, variant, ...props }, ref) => (
    <StyledLink {...props} variant={variant} ref={ref}>
      {Icon && (
        <IconWrapper>
          <Icon />
        </IconWrapper>
      )}
      <span>{children}</span>
    </StyledLink>
  )
);
LargeLink.displayName = "LargeLink";
LargeLink.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  variant: PropTypes.string.isRequired
};

LargeLink.defaultProps = {
  icon: false,
  variant: "dark"
};

export default LargeLink;

const StyledLink = styled.a`
  display: flex;
  align-items: center;
  padding: ${spacing.medium};
  text-decoration: none;
  ${props => {
    if (props.variant === "rainbow") {
      return css`
        background: linear-gradient(
          90deg,
          #ffaebc,
          #ffaebc,
          #ffdaae,
          #f6ffae,
          #cfffae,
          #aeffd8,
          #aef4ff,
          #aeccff,
          #e5aeff,
          #ffaebc
        );
        background-size: 2000% 2000%;
        animation: ${paleRainbow} 5s linear infinite;
      `;
    } else {
      return css`
        background-color: ${props.variant === "light"
          ? colors.white
          : colors.elementBackground};
      `;
    }
  }};
  border: 1px ${colors.elementBorder} solid;
  border-radius: ${box.borderRadius};
  margin-bottom: ${spacing.interComponent};
  transition: 200ms color, 200ms box-shadow;
  &:visited {
    color: ${colors.darkText};
    text-decoration: none;
  }
  &:active,
  &:hover {
    color: ${colors.blueDark};
    box-shadow: ${box.shadow};
  }
`;

const IconWrapper = styled.span`
  flex: 0 0 3rem;
  margin-right: 1rem;
  @media (max-width: ${breakpoints.mobile}) {
    display: none;
  }
  color: ${colors.lightText};
`;
