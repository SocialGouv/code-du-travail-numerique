import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import { animations, box, breakpoints, spacing } from "../theme";

export const LargeLink = React.forwardRef(
  ({ icon: Icon, children, variant, ...props }, ref) => (
    <StyledLink {...props} variant={variant} ref={ref}>
      {Icon && (
        <StyledSpan>
          <Icon />
        </StyledSpan>
      )}
      <span>{children}</span>
    </StyledLink>
  )
);
LargeLink.displayName = "LargeLink";
LargeLink.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.elementType,
  variant: PropTypes.string.isRequired
};

LargeLink.defaultProps = {
  variant: "dark"
};

const StyledLink = styled.a`
  display: flex;
  align-items: center;
  padding: ${spacing.medium};
  color: ${({ theme }) => theme.blueDark};
  text-decoration: none;
  ${({ theme, variant }) => {
    if (variant === "highlight") {
      return css`
        background-color: ${theme.white};
        border: 1px solid ${theme.blueDark};
      `;
    } else {
      return css`
        background-color: ${variant === "light"
          ? theme.white
          : theme.lightBackground};
        border: ${box.border};
      `;
    }
  }};
  border-radius: ${box.borderRadius};
  margin-bottom: ${spacing.interComponent};
  transition: ${animations.transitionTiming} all;
  &:visited {
    color: ${({ theme }) => theme.darkText};
    text-decoration: none;
  }
  &:active,
  &:hover {
    box-shadow: ${box.shadow};
  }
`;

const StyledSpan = styled.span`
  flex: 0 0 3rem;
  margin-right: 1rem;
  @media (max-width: ${breakpoints.mobile}) {
    display: none;
  }
  color: ${({ theme }) => theme.lightText};
`;
