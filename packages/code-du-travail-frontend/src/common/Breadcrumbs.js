import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { ChevronsRight } from "react-feather";
import {
  Container,
  List,
  ListItem,
  OverflowWrapper,
  theme
} from "@socialgouv/react-ui";

const Breadcrumbs = ({ items = [] }) => {
  if (!items || items.length === 0) {
    return null;
  }
  return (
    <Nav>
      <StyledContainer>
        <OverflowWrapper shadowColor="white">
          <StyledList>
            {items.map((item, index) => (
              <React.Fragment key={index}>
                <NavItem>{item}</NavItem>
                {index < items.length - 1 && (
                  <Separator aria-hidden>
                    <StyledChevronsRight />
                  </Separator>
                )}
              </React.Fragment>
            ))}
          </StyledList>
        </OverflowWrapper>
      </StyledContainer>
    </Nav>
  );
};

Breadcrumbs.propTypes = {
  items: PropTypes.arrayOf(PropTypes.node)
};

export { Breadcrumbs };

const { breakpoints, colors, spacings } = theme;

const Nav = styled.nav`
  overflow-x: auto;
  background: ${colors.bgTertiary};
`;
const StyledContainer = styled(Container)`
  padding: 0;
`;

const StyledList = styled(List)`
  display: flex;
  flex-flow: nowrap;
  align-items: center;
  padding: ${spacings.small} 0;
  @media (max-width: ${breakpoints.mobile}) {
    padding: ${spacings.tiny} 0;
  }
`;
const NavItem = styled(ListItem)`
  display: inline-block;
  padding: ${spacings.small} ${spacings.medium};
  white-space: nowrap;
`;

const Separator = styled.li`
  display: block;
  user-select: none;
  pointer-events: none;
`;

const StyledChevronsRight = styled(ChevronsRight)`
  display: block;
  width: ${spacings.base};
  color: ${({ theme }) => theme.paragraph};
`;
