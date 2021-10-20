import { Container, icons, keyframes, theme } from "@socialgouv/cdtn-ui";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";

import { useWindowScrollPosition } from "../../lib/useScrollLocation";
import SearchBar from "../../search/SearchBar";
import { BurgerNav } from "./BurgerNav";

export const HEADER_HEIGHT = "13.5rem";
export const MOBILE_HEADER_HEIGHT = "9rem";

const printDate = () => {
  const currentDate = new Date(Date.now()).toLocaleString("fr-FR");
  return `le ${currentDate}`;
};

export const Header = ({ currentPage = "" }) => {
  const [currentDate, setDate] = useState();
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
    <StyledHeader
      role="banner"
      overThreshold={overThreshold}
      floating={floating}
      showFloatingMenu={showFloatingMenu}
    >
      <StyledPrintDate id="printDate">{currentDate}</StyledPrintDate>
      <StyledContainer>
        <Link href="/" passHref>
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

        <RightSide>
          {isContentPage && !overThreshold && (
            <Link
              href={{
                pathname: "/recherche",
                ...(q && { query: { q } }),
              }}
              passHref
            >
              <StyledLink>
                <icons.Search />
              </StyledLink>
            </Link>
          )}
          <BurgerNav currentPage={currentPage} />
        </RightSide>
      </StyledContainer>
    </StyledHeader>
  );
};

const { box, breakpoints, spacings } = theme;

const StyledHeader = styled.header`
  position: absolute;
  top: 0;
  z-index: 3;
  width: 100%;
  height: ${HEADER_HEIGHT};
  background-color: ${({ theme }) => theme.white};
  box-shadow: ${({ theme }) => box.shadow.default(theme.secondary)};
  ${({ floating, overThreshold }) => {
    if (overThreshold) {
      if (floating) {
        return css`
          position: fixed;
          animation: ${keyframes.fromTop} 250ms ease-out;
          height: ${MOBILE_HEADER_HEIGHT};
        `;
      }
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

const StyledContainer = styled(Container)`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
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

const RightSide = styled.div`
  display: flex;
  flex: 0 1 auto;
  align-items: center;
  justify-content: flex-end;
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
  width: 30rem;
  margin-left: ${spacings.base};
  @media (max-width: ${breakpoints.tablet}) {
    display: ${({ overThreshold }) => (overThreshold ? "flex" : "none")};
  }
  @media print {
    display: none;
  }
`;
