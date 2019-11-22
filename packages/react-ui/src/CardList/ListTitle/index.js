import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { animations, spacings } from "../../theme";
import { Title } from "../../Titles";
import { ChevronRight } from "react-feather";

export const ListTitle = React.forwardRef(
  ({ children, desc = "", as = "h2", ...props }, ref) => (
    <div>
      <StyledTitle as={as}>
        {props.href ? (
          <>
            <StyledLink ref={ref} {...props} title={desc}>
              {children}
              <Icon aria-hidden="true" />
            </StyledLink>
          </>
        ) : (
          <>{children}</>
        )}
      </StyledTitle>
      {desc && <div>{desc}</div>}
    </div>
  )
);

ListTitle.displayName = "ListTitle";

ListTitle.propTypes = {
  as: PropTypes.string,
  children: PropTypes.node.isRequired,
  desc: PropTypes.string,
  href: PropTypes.string
};

const StyledTitle = styled(Title)`
  font-size: 3rem;
`;

const StyledLink = styled.a`
  display: inline-flex;
  align-items: center;
  color: ${({ theme }) => theme.title};
  font-weight: normal;
  font-family: "Merriweather", serif;
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.title};
  }
`;

const Icon = styled(ChevronRight)`
  margin-left: ${spacings.base};
  color: ${({ theme }) => theme.secondary};
  transition: transform ${animations.transitionTiming} linear;
  /* stylelint-disable-next-line */
  ${StyledLink}:hover & {
    transform: translateX(5px);
  }
`;
