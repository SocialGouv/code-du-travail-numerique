import {
  BurgerNav as RootBurgerNav,
  BurgerNavButton as NavButton,
  BurgerNavItem as NavAnchor,
  theme,
} from "@socialgouv/cdtn-ui";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

import { AccessibilityModal } from "../../common/AccessibilityModal";
import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-utils";
import { MatomoBaseEvent, MatomoHeaderEvent } from "../../lib";
import { push as matopush } from "@socialgouv/matomo-next";

export const SUB_MENU_HEIGHT = "5.5rem";
type Props = {
  currentPage: string;
};
const HeaderBurgerNav = ({ currentPage }: Props): JSX.Element => {
  const onSendMatomoEvent = (eventName: MatomoHeaderEvent) => {
    matopush([MatomoBaseEvent.TRACK_EVENT, MatomoBaseEvent.HEADER, eventName]);
  };

  return (
    <StyledBurgerNav>
      <Nav id="navigation" aria-label="Navigation du site">
        <Ul>
          <LiMobileOnly>
            <AccessibilityModal>
              {(openModal) => (
                <NavButton onClick={openModal}>Accessibilité</NavButton>
              )}
            </AccessibilityModal>
          </LiMobileOnly>
          <Li>
            <Link href="/outils" passHref legacyBehavior>
              <NavAnchor
                isCurrent={currentPage === "tools"}
                onClick={() =>
                  onSendMatomoEvent(MatomoHeaderEvent.CLICK_BOITE_A_OUTILS)
                }
              >
                Boîte&nbsp;à&nbsp;outils
              </NavAnchor>
            </Link>
          </Li>
          <Li>
            <Link
              href={`/${getRouteBySource(SOURCES.LETTERS)}`}
              passHref
              legacyBehavior
            >
              <NavAnchor
                isCurrent={currentPage === SOURCES.LETTERS}
                onClick={() =>
                  onSendMatomoEvent(MatomoHeaderEvent.CLICK_MODELE_DE_DOCUMENTS)
                }
              >
                Modèles de documents
              </NavAnchor>
            </Link>
          </Li>
          <Li>
            <Link
              href={`/${getRouteBySource(SOURCES.CONTRIBUTIONS)}`}
              passHref
              legacyBehavior
            >
              <NavAnchor
                isCurrent={currentPage === SOURCES.CONTRIBUTIONS}
                onClick={() =>
                  onSendMatomoEvent(MatomoHeaderEvent.CLICK_FICHES_PRATIQUES)
                }
              >
                Vos fiches pratiques
              </NavAnchor>
            </Link>
          </Li>
          <Li>
            <Link
              href={`/${getRouteBySource(SOURCES.CCN)}`}
              passHref
              legacyBehavior
            >
              <NavAnchor
                isCurrent={currentPage === SOURCES.CCN}
                onClick={() =>
                  onSendMatomoEvent(
                    MatomoHeaderEvent.CLICK_CONVENTION_COLLECTIVE
                  )
                }
              >
                Votre convention collective
              </NavAnchor>
            </Link>
          </Li>
          <Li>
            <Link href="/themes" passHref legacyBehavior>
              <NavAnchor
                isCurrent={currentPage === "themes"}
                onClick={() =>
                  onSendMatomoEvent(MatomoHeaderEvent.CLICK_THEMES)
                }
              >
                Thèmes
              </NavAnchor>
            </Link>
          </Li>
        </Ul>
      </Nav>
    </StyledBurgerNav>
  );
};
const { breakpoints, spacings } = theme;

const StyledBurgerNav = styled(RootBurgerNav)`
  @media (min-width: ${breakpoints.tablet}) {
    width: 100%;

    :before {
      display: block;
      position: absolute;
      bottom: ${SUB_MENU_HEIGHT};
      left: 0;
      right: 0;
      height: 1px;
      background-color: ${({ theme }) => theme.bgTertiary};
      content: "";
    }
  }
`;

const Nav = styled.nav`
  height: ${SUB_MENU_HEIGHT};
  margin-top: ${spacings.small};
  width: 100%;
  @media (max-width: ${breakpoints.tablet}) {
    height: auto;
    width: auto;
  }
`;

const Ul = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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
    width: 100%;
  }
`;
const LiMobileOnly = styled(Li)`
  display: none;
  @media (max-width: ${breakpoints.tablet}) {
    display: block;
  }
`;
export default HeaderBurgerNav;
