import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Container, icons, OverflowWrapper, theme } from "@socialgouv/react-ui";

const { ArrowRight } = icons;

const Breadcrumbs = ({ items = [] }) => {
  if (!items || items.length === 0) {
    return null;
  }
  return (
    <Nav>
      <OverflowWrapper>
        <StyledContainer>
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <NavItem>
                {index !== 0 && <StyledArrowRight />} {item}
              </NavItem>
            </React.Fragment>
          ))}
        </StyledContainer>
      </OverflowWrapper>
    </Nav>
  );
};

Breadcrumbs.propTypes = {
  items: PropTypes.arrayOf(PropTypes.node)
};

export { Breadcrumbs };

const { breakpoints, fonts, spacings } = theme;

const Nav = styled.nav`
  margin-bottom: ${spacings.small};
  overflow-x: auto;
`;
const StyledContainer = styled(Container)`
  display: flex;
  align-items: center;
`;

const NavItem = styled.li`
  display: flex;
  align-items: center;
  padding: 0 ${spacings.small} 0 0;
  white-space: nowrap;
  &:first-of-type {
    padding-left: 0;
  }
  @media (max-width: ${breakpoints.mobile}) {
    font-size: ${fonts.sizes.tiny};
    &:not(:last-of-type) {
      display: none;
    }
  }
`;

const StyledArrowRight = styled(ArrowRight)`
  width: 1.2rem;
  margin-right: ${spacings.small};
  color: ${({ theme }) => theme.secondary};
  @media (max-width: ${breakpoints.mobile}) {
    transform: rotate(180deg);
  }
`;
