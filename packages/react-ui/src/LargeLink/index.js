import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import { animations, box, breakpoints, spacings } from "../theme";

export const LargeLink = React.forwardRef(
  ({ icon: Icon, children, variant, ...props }, ref) => (
    <StyledLink {...props} variant={variant} ref={ref}>
      {Icon && (
        <StyledSpan>
          <Icon />
        </StyledSpan>
      )}
      <div>{children}</div>
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
  variant: "light"
};

const StyledLink = styled.a`
  display: flex;
  align-items: center;
  margin-bottom: ${spacings.medium};
  padding: ${spacings.medium};
  color: ${({ theme }) => theme.paragraph};
  text-decoration: none;
  ${({ theme, variant }) => {
    if (variant === "highlight") {
      return css`
        background-color: ${theme.white};
        border: 1px solid ${theme.secondary};
      `;
    } else {
      return css`
        background-color: ${variant === "light"
          ? theme.white
          : theme.bgSecondary};
        border: ${box.border};
      `;
    }
  }}
  border-radius: ${box.borderRadius};
  transition: ${animations.transitionTiming} all;
  &:visited {
    color: ${({ theme }) => theme.paragraph};
    text-decoration: none;
  }
  &:active,
  &:hover {
    color: ${({ theme }) => theme.paragraph};
    border-color: ${({ theme }) => theme.paragraph};
    box-shadow: ${box.shadow.default};
  }
`;

const StyledSpan = styled.span`
  flex: 0 0 3rem;
  margin-right: 1rem;
  @media (max-width: ${breakpoints.mobile}) {
    display: none;
  }
  color: ${({ theme }) => theme.altText};
`;
