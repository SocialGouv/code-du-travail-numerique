import {
  BurgerNavButton as NavButton,
  Container,
  icons,
  keyframes,
  theme,
} from "@socialgouv/cdtn-ui";
import { lightFormat } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";

import { useWindowScrollPosition } from "../../lib/useScrollLocation";
import SearchBar from "../../search/SearchBar";
import HeaderBurgerNav from "./BurgerNav";
import { AccessibilityModal } from "../../common/AccessibilityModal";

export const HEADER_HEIGHT = "20rem";
export const MOBILE_HEADER_HEIGHT = "9rem";

const printDate = () => {
  const currentDate = lightFormat(new Date(Date.now()), "dd/MM/yyyy, HH:mm:ss");
  return `le ${currentDate}`;
};

export const Header = ({ currentPage = "" }) => {
  const [currentDate, setDate] = useState("");
  useEffect(() => {
    setDate(printDate());
  }, []);
  const router = useRouter();
  const { q } = router.query;
  const scrollInfo = useWindowScrollPosition();
  const overThreshold = scrollInfo.y > 200;
  const floating = scrollInfo.direction === "up";
  const showFloatingMenu = floating && overThreshold;
  const isContentPage = currentPage !== "home" && currentPage !== "search";
  return (
    <>
      <header role="banner" className="fr-header">
        <div className="fr-header__body">
          <StyledContainer2 className="fr-container">
            <div className="fr-header__body-row">
              <div className="fr-header__brand fr-enlarge-link">
                <div className="fr-header__brand-top">
                  <div className="fr-header__logo">
                    <p className="fr-logo">
                      République
                      <br />
                      Francaise
                    </p>
                  </div>
                </div>
                <div className="fr-header__service">
                  <a
                    href="/"
                    title="Accueil - [À MODIFIER - Nom du site / service] - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)"
                  >
                    {/* <p className="fr-header__service-title">
                      Code du travail numérique
                    </p> */}
                  </a>
                  <p className="fr-header__service-tagline">
                    Code du travail numérique
                  </p>
                </div>
                <div className="fr-header__tools">
                  <div className="fr-header__search fr-modal" id="modal-541">
                    <div className="fr-container fr-container-lg--fluid">
                      <button
                        className="fr-btn--close fr-btn"
                        aria-controls="modal-541"
                        title="Fermer"
                      >
                        Fermer
                      </button>
                      <div
                        className="fr-search-bar"
                        id="search-540"
                        role="search"
                      >
                        <label className="fr-label" for="search-540-input">
                          Rechercher
                        </label>
                        <input
                          className="fr-input"
                          placeholder="Rechercher"
                          type="search"
                          id="search-540-input"
                          name="search-540-input"
                        />
                        <button className="fr-btn" title="Rechercher">
                          Rechercher
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </StyledContainer2>
        </div>
        <div
          className="fr-header__menu fr-modal"
          id="modal-543"
          aria-labelledby="button-544"
        >
          <StyledContainer2 className="fr-container">
            <button
              className="fr-btn--close fr-btn"
              aria-controls="modal-543"
              title="Fermer"
            >
              Fermer
            </button>
            <div className="fr-header__menu-links"></div>
            <nav
              className="fr-nav"
              id="navigation-547"
              role="navigation"
              aria-label="Menu principal"
            >
              <ul className="fr-nav__list">
                <li className="fr-nav__item">
                  <a className="fr-nav__link" href="#" target="_self">
                    accès direct
                  </a>
                </li>
                <li className="fr-nav__item">
                  <a className="fr-nav__link" href="#" target="_self">
                    accès direct
                  </a>
                </li>
                <li className="fr-nav__item">
                  <a className="fr-nav__link" href="#" target="_self">
                    accès direct
                  </a>
                </li>
                <li className="fr-nav__item">
                  <a className="fr-nav__link" href="#" target="_self">
                    accès direct
                  </a>
                </li>
              </ul>
            </nav>
          </StyledContainer2>
        </div>
      </header>
    </>
  );
  {
    /* return (
    <StyledHeader
      overThreshold={overThreshold}
      floating={floating}
      showFloatingMenu={showFloatingMenu}
    >
      <StyledPrintDate id="printDate">{currentDate}</StyledPrintDate>
      <StyledContainer>
        <Link href="/" passHref legacyBehavior>
          <LogoLink
            overThreshold={overThreshold}
            title="Code du travail numérique - retour à l'accueil"
          >
            <MinistereTravail
              overThreshold={overThreshold}
              width="135"
              height="115"
              src={"/static/assets/img/logo-rf.svg"}
              alt="République française, site officiel du gouvernement. Liberté, égalité, fraternité"
            />
            <Logo />
          </LogoLink>
        </Link>
        {(overThreshold || isContentPage) && (
          <SearchBarWrapper overThreshold={overThreshold}>
            <SearchBar inputId="floating-search" />
          </SearchBarWrapper>
        )}

        {isContentPage && !overThreshold && (
          <VerticallyAligned>
            <Link
              href={{ pathname: "/recherche", ...(q && { query: { q } }) }}
              passHref
              legacyBehavior
            >
              <StyledLink rel="nofollow" aria-label="Lancer ma recherche">
                <icons.Search />
              </StyledLink>
            </Link>
          </VerticallyAligned>
        )}
        <DesktopOnly overThreshold={overThreshold}>
          <AccessibilityModal>
            {(openModal) => (
              <NavButtonWithIcon onClick={openModal}>
                Accessibilité
              </NavButtonWithIcon>
            )}
          </AccessibilityModal>
        </DesktopOnly>
        <HeaderBurgerNav currentPage={currentPage} />
      </StyledContainer>
    </StyledHeader>
  ); */
  }
};

const { box, breakpoints, spacings } = theme;

const StyledContainer2 = styled.div``;

const StyledHeader = styled.header`
  position: absolute;
  top: 0;
  z-index: 3;
  width: 100%;
  background-color: ${({ theme }) => theme.white};
  box-shadow: ${({ theme }) => box.shadow.default(theme.secondary)};
  ${({ floating, overThreshold }) => {
    if (overThreshold && floating) {
      return css`
        position: fixed;
        animation: ${keyframes.fromTop} 250ms ease-out;
      `;
    }
  }};

  @media (max-width: ${breakpoints.mobile}) {
    height: ${MOBILE_HEADER_HEIGHT};
  }
  @media print {
    position: relative;
    height: auto;
    box-shadow: none;
  }
`;

const StyledPrintDate = styled.div`
  display: none;
  text-align: right;
  @media print {
    display: block;
  }
`;

const VerticallyAligned = styled.div`
  display: flex;
  align-items: center;
`;

const NavButtonWithIcon = styled(NavButton)`
  padding: 0 0 0 30px;
  background: url("/static/assets/img/acceccibility-logo.svg") 6px center
    no-repeat;
  display: block !important;
  @media (max-width: ${breakpoints.tablet}) {
    display: none !important;
  }
`;
const StyledContainer = styled(Container)`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
`;

const LogoLink = styled.a`
  display: flex;
  flex-grow: 0;
  align-items: center;
  padding: ${spacings.small} 0;
  text-decoration: none;
  @media (max-width: ${breakpoints.tablet}) {
    justify-content: space-between;
    /* 9rem is half logo's width so it gets centered */
    width: calc(50% + 9.5rem);
  }
  @media (max-width: ${breakpoints.mobile}) {
    display: ${({ overThreshold }) => (overThreshold ? "none" : "flex")};
    /* 6.2rem is half logo's width so it gets centered */
    width: calc(50% + 6.2rem);
  }
`;

const MinistereTravail = styled.img`
  display: ${({ overThreshold }) => (overThreshold ? "none" : "inline-block")};
  flex-shrink: 0;
  width: 13.5rem;
  height: 11.5rem;
  background-color: white;
  @media (max-width: ${breakpoints.mobile}) {
    width: auto;
    height: 7.5rem;
  }
`;
const Logo = styled(icons.Logo)`
  flex-shrink: 0;
  width: 17.4rem;
  height: 7rem;
  margin-left: 4rem;
  color: ${({ theme }) => theme.primary};
  @media (max-width: ${breakpoints.mobile}) {
    height: 5rem;
    width: auto;
    margin-left: 1rem;
  }
`;

const DesktopOnly = styled.div`
  display: none;
  @media (min-width: ${breakpoints.tablet}) {
    display: block;
  }
  @media print {
    display: none;
  }
`;

const StyledLink = styled.a`
  display: none;
  color: ${({ theme }) => theme.secondary};
  @media (max-width: ${breakpoints.tablet}) {
    display: block;
    width: 3.4rem;
    height: 3.4rem;
    margin-left: ${spacings.medium};
  }
  @media (max-width: ${breakpoints.mobile}) {
    width: 2.2rem;
    height: 2.2rem;
    margin-left: ${spacings.small};
  }
`;

const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 38rem;
  margin-left: ${spacings.base};
  @media (max-width: ${breakpoints.tablet}) {
    display: ${({ overThreshold }) => (overThreshold ? "flex" : "none")};
    width: 80%;
  }
  @media print {
    display: none;
  }
`;
