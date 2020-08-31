import { Container, icons, theme } from "@socialgouv/cdtn-ui";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";

import SearchBar from "../../search/SearchBar";
import { BurgerNav } from "./BurgerNav";

export const HEADER_HEIGHT = "18rem";
export const MOBILE_HEADER_HEIGHT = "9rem";

const { Search: SearchIcon } = icons;

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
  return (
    <StyledHeader currentPage={currentPage}>
      <StyledPrintDate id="printDate">{currentDate}</StyledPrintDate>
      <StyledContainer>
        <Link href="/" passHref>
          <LogoLink title="Code du travail numérique - retour à l'accueil">
            <MinistereTravail
              src={"/static/assets/img/ministere-travail.svg"}
              alt="Site officiel du gouvernement | Ministère du travail | Liberté, égalité, fraternité"
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
  background-color: ${({ theme }) => theme.white};
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
    /* 6.2rem is half logo's width so it gets centered */
    justify-content: space-between;
    width: calc(50% + 6.2rem);
  }
`;

const MinistereTravail = styled.img`
  width: 18.2rem;
  height: 15rem;
  background-color: white;
  @media (max-width: ${breakpoints.mobile}) {
    height: 7.5rem;
  }
`;
const Logo = styled(icons.Logo)`
  height: 7rem;
  margin-left: 4rem;
  color: ${({ theme }) => theme.primary};
  @media (max-width: ${breakpoints.mobile}) {
    height: 5rem;
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
  order: 3;
  width: 30rem;
  margin-left: ${spacings.base};
  @media (max-width: ${breakpoints.tablet}) {
    display: none;
  }
`;
