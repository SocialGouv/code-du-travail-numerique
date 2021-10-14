import {
  BurgerNav as RootBurgerNav,
  BurgerNavButton as NavButton,
  BurgerNavCurrent as NavCurrent,
  BurgerNavLink as NavAnchor,
  theme,
} from "@socialgouv/cdtn-ui";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

import { AccessibilityModal } from "../../common/AccessibilityModal";

export const BurgerNav = ({ currentPage }) => (
  <StyledBurgerNav>
    <AccessibilityModal>
      {(openModal) => <NavButton onClick={openModal}>Accessibilité</NavButton>}
    </AccessibilityModal>
    <Nav id="navigation" role="navigation" aria-label="Navigation du site">
      <Ul>
        <Li>
          {currentPage !== "tools" ? (
            <Link href="/outils" passHref>
              <NavAnchor>Boîte&nbsp;à&nbsp;outils</NavAnchor>
            </Link>
          ) : (
            <NavCurrent>Boîte&nbsp;à&nbsp;outils</NavCurrent>
          )}
        </Li>
        <Li>
          {currentPage !== "themes" ? (
            <Link href="/themes" passHref>
              <NavAnchor>Thèmes</NavAnchor>
            </Link>
          ) : (
            <NavCurrent>Thèmes</NavCurrent>
          )}
        </Li>
      </Ul>
    </Nav>
  </StyledBurgerNav>
);

const { breakpoints } = theme;

const StyledBurgerNav = styled(RootBurgerNav)`
  order: 2;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Nav = styled.nav`
  margin: 0;
  padding: 0;
  height: 100%;
  @media (max-width: ${breakpoints.tablet}) {
    height: auto;
  }
`;

const Ul = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100%;
  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
    height: auto;
  }
`;

const Li = styled.li`
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  @media (max-width: ${breakpoints.tablet}) {
    height: auto;
  }
`;
