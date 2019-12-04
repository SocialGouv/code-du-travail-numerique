import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Title } from "../../Titles";

export const ListTitle = React.forwardRef(
  (
    { as = "h2", children, subtitle = "", leftStripped = false, ...props },
    ref
  ) => (
    <Title topStripped={!leftStripped} as={as} subtitle={subtitle}>
      {props.href ? (
        <>
          <StyledLink ref={ref} {...props}>
            {children}
          </StyledLink>
        </>
      ) : (
        <>{children}</>
      )}
    </Title>
  )
);

ListTitle.displayName = "ListTitle";

ListTitle.propTypes = {
  as: PropTypes.string,
  children: PropTypes.node.isRequired,
  subtitle: PropTypes.string,
  href: PropTypes.string,
  leftStripped: PropTypes.bool
};

const StyledLink = styled.a`
  color: ${({ theme }) => theme.title};
  font-weight: normal;
  font-family: "Merriweather", serif;
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.title};
  }
`;
