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
  <StyledBurgerNav role="navigation" id="navigation">
    <AccessibilityModal>
      {(openModal) => <NavButton onClick={openModal}>Accessibilité</NavButton>}
    </AccessibilityModal>
    <StyledUl>
      {currentPage !== "tools" ? (
        <Link href="/outils" passHref>
          <NavAnchor>Boîte&nbsp;à&nbsp;outils</NavAnchor>
        </Link>
      ) : (
        <NavCurrent>Boîte&nbsp;à&nbsp;outils</NavCurrent>
      )}
      <StyledLi>
        {currentPage !== "themes" ? (
          <Link href="/themes" passHref>
            <NavAnchor>Thèmes</NavAnchor>
          </Link>
        ) : (
          <NavCurrent>Thèmes</NavCurrent>
        )}
      </StyledLi>
    </StyledUl>
  </StyledBurgerNav>
);

const StyledBurgerNav = styled(RootBurgerNav)`
  order: 2;
`;

const StyledUl = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: row;
  @media (max-width: ${theme.breakpoints.tablet}) {
    flex-direction: column;
  }
  margin: 0;
  padding: 0;
`;

const StyledLi = styled.li``;
