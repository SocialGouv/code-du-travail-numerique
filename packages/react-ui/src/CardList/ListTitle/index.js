import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Title } from "../../Titles";

export const ListTitle = React.forwardRef(
  ({ as = "h2", children, desc = "", leftStripped = false, ...props }, ref) => (
    <StyledListTitle>
      <Title topStripped={!leftStripped} as={as}>
        {props.href ? (
          <>
            <StyledLink ref={ref} {...props} title={desc}>
              {children}
            </StyledLink>
          </>
        ) : (
          <>{children}</>
        )}
      </Title>
      {desc && <div>{desc}</div>}
    </StyledListTitle>
  )
);

ListTitle.displayName = "ListTitle";

ListTitle.propTypes = {
  as: PropTypes.string,
  children: PropTypes.node.isRequired,
  desc: PropTypes.string,
  href: PropTypes.string,
  leftStripped: PropTypes.bool
};

const StyledListTitle = styled.div`
  text-align: center;
`;

const StyledLink = styled.a`
  color: ${({ theme }) => theme.title};
  font-weight: normal;
  font-family: "Merriweather", serif;
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.title};
  }
`;
