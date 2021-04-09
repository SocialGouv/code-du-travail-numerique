import {
  BurgerNav as RootBurgerNav,
  BurgerNavButton as NavButton,
  BurgerNavCurrent as NavCurrent,
  BurgerNavLink as NavAnchor,
} from "@socialgouv/cdtn-ui";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

import { AccessibilityModal } from "../../common/AccessibilityModal";

export const BurgerNav = ({ currentPage }) => (
  <StyledBurgerNav role="navigation" id="navigation">
    <>
      <AccessibilityModal>
        {(openModal) => (
          <NavButton onClick={openModal}>Accessibilité</NavButton>
        )}
      </AccessibilityModal>
      {currentPage !== "tools" ? (
        <Link href="/outils" passHref>
          <NavAnchor>Boîte&nbsp;à&nbsp;outils</NavAnchor>
        </Link>
      ) : (
        <NavCurrent>Boîte&nbsp;à&nbsp;outils</NavCurrent>
      )}
      {currentPage !== "themes" ? (
        <Link href="/themes" passHref>
          <NavAnchor>Thèmes</NavAnchor>
        </Link>
      ) : (
        <NavCurrent>Thèmes</NavCurrent>
      )}
    </>
  </StyledBurgerNav>
);

const StyledBurgerNav = styled(RootBurgerNav)`
  order: 2;
`;
