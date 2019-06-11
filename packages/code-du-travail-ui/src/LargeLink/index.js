import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { box, breakpoints, colors, spacing } from "../theme";

const LargeLink = ({ icon: Icon, children, ...props }) => (
  <StyledLink {...props}>
    {Icon && (
      <IconWrapper>
        <Icon />
      </IconWrapper>
    )}
    <span>{children}</span>
  </StyledLink>
);

LargeLink.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.bool])
};

LargeLink.defaultProps = {
  icon: false
};

export default LargeLink;

const StyledLink = styled.a`
  display: flex;
  align-items: center;
  padding: ${spacing.medium};
  text-decoration: none;
  background-color: ${colors.elementBackground};
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
    flex: 0 0 2rem;
  }
  color: ${colors.lightText};
`;
