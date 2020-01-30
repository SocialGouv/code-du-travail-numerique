import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { box, spacings, breakpoints } from "../theme";

export const Tag = React.forwardRef(({ children, variant, ...props }, ref) => (
  <StyledTag variant={variant} ref={ref} {...props}>
    <Content>{children}</Content>
  </StyledTag>
));

Tag.displayName = "Tag";

Tag.propTypes = {
  variant: PropTypes.oneOf(["primary", "secondary"]),
  children: PropTypes.node.isRequired
};

Tag.defaultProps = {
  variant: "secondary"
};

const StyledTag = styled.div`
  display: inline-block;
  width: ${props => (props.wide ? "100%" : "auto")};
  color: ${({ theme }) => theme.altText};
  font-weight: 600;
  text-decoration: none;
  background-color: ${({ theme }) => theme.white};
  border: ${({ theme }) => box.border(theme.border)};
  border-color: ${({ theme, variant }) => theme[variant]};
  border-style: solid;
  border-radius: ${box.borderRadius};
  box-shadow: ${({ shadow, theme, variant }) =>
    shadow ? box.shadow.default(theme[variant]) : "none"};
  cursor: pointer;
  & + & {
    margin-left: ${spacings.base};
  }
  &:hover,
  &:active,
  &:focus {
    color: ${({ theme }) => theme.altText};
    box-shadow: ${({ shadow, theme }) =>
      shadow
        ? box.shadow.large(theme.secondary)
        : box.shadow.default(theme.secondary)};
    transform: translateY(-2px);
  }
  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    & + & {
      margin-left: 0;
    }
  }
`;

const Content = styled.div`
  flex-grow: 1;
  align-self: center;
  padding: ${spacings.small} ${spacings.base};
  text-align: left;
`;
