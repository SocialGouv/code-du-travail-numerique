import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled, { css } from "styled-components";

import { Container, icons, theme } from "@socialgouv/react-ui";

import SearchBar from "../../search/SearchBar";
import { BurgerNav } from "./BurgerNav";

export const HEADER_HEIGHT = "8.6rem";
export const MOBILE_HEADER_HEIGHT = "6.6rem";

const { Search: SearchIcon } = icons;

const printDate = () => {
  const currentDate = new Date(Date.now()).toLocaleString("fr-FR");
  return `le ${currentDate.slice(0, 10)} à ${currentDate.slice(11, 18)}`;
};

export const Header = ({ currentPage = "" }) => {
  const [currentDate, setDate] = useState();
  useEffect(() => {
    setDate(printDate());
  }, []);
  const router = useRouter();
  return (
    <StyledHeader currentPage={currentPage}>
      <StyledPrintDate id="printDate">{currentDate}</StyledPrintDate>
      <StyledContainer>
        <Link href="/" passHref>
          <LogoLink title="Code du travail numérique - retour à l'accueil">
            <MinistereTravail
              src={"/static/assets/img/ministere-travail.svg"}
              alt="symbole de la Marianne, site officiel du gouvernement | Ministère du travail | Liberté, égalité, fraternité"
            />
            <Logo />
          </LogoLink>
        </Link>
        <RightSide>
          <BurgerNav currentPage={currentPage} />
          {currentPage !== "home" && currentPage !== "search" && (
            <>
              <Link
                href={{ pathname: "/recherche", query: router.query }}
                passHref
              >
                <StyledLink>
                  <SearchIcon />
                </StyledLink>
              </Link>
              <SearchBarWrapper>
                <SearchBar />
              </SearchBarWrapper>
            </>
          )}
        </RightSide>
      </StyledContainer>
    </StyledHeader>
  );
};

const { breakpoints, spacings } = theme;

const StyledHeader = styled.header`
  ${({ currentPage }) => {
    if (currentPage !== "home") {
      return css`
        position: sticky;
        top: 0;
        z-index: 3;
      `;
    }
  }};
  height: ${HEADER_HEIGHT};
  background-color: ${({ currentPage, theme }) =>
    currentPage === "home" ? "transparent" : theme.white};
  @media (max-width: ${breakpoints.mobile}) {
    height: ${MOBILE_HEADER_HEIGHT};
  }
  @media print {
    position: relative;
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
  padding-left: 0;
  @media (max-width: ${breakpoints.mobile}) {
    padding-left: 0;
  }
`;

const LogoLink = styled.a`
  display: flex;
  flex-grow: 0;
  align-items: center;
  text-decoration: none;
  @media (max-width: ${breakpoints.tablet}) {
    justify-content: space-between;
    /* 9rem is half logo's width so it gets centered */
    width: calc(50% + 9.5rem);
  }
  @media (max-width: ${breakpoints.mobile}) {
    /* 6.2rem is half logo's width so it gets centered */
    justify-content: space-between;
    width: calc(50% + 6.2rem);
  }
`;

const MinistereTravail = styled.img`
  flex: 0 0 7.8rem;
  width: 7.8rem;
  height: calc(100% - 2 * ${spacings.xsmall});
  margin: ${spacings.xsmall} ${spacings.medium} ${spacings.xsmall}
    ${spacings.xsmall};
  padding: ${spacings.xsmall} 0;
  background-color: white;
  @media (max-width: ${breakpoints.mobile}) {
    flex: 0 0 5.5rem;
    width: 5.5rem;
    margin-right: 0;
    padding: ${spacings.tiny} 0;
  }
`;
const Logo = styled(icons.Logo)`
  flex: 0 0 19rem;
  width: 19rem;
  height: calc(100% - 2 * ${spacings.xsmall});
  margin: ${spacings.xsmall} 0;
  color: ${({ theme }) => theme.primary};
  @media (max-width: ${breakpoints.mobile}) {
    flex: 0 0 12.4rem;
    width: 12.4rem;
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
  order: 1;
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
  order: 3;
  width: 30rem;
  margin-left: ${spacings.base};
  @media (max-width: ${breakpoints.tablet}) {
    display: none;
  }
`;
