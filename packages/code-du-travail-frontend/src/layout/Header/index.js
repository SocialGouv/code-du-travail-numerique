import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled, { css } from "styled-components";

import { Container, icons, theme } from "@socialgouv/react-ui";

import SearchBar from "../../search/SearchBar";
import { BurgerNav } from "./BurgerNav";

const { Search: SearchIcon } = icons;

const printDate = () => {
  const currentDate = new Date(Date.now()).toLocaleString("fr-FR");
  return `le ${currentDate.slice(0, 10)} ${currentDate.slice(11, 18)}`;
};

const Header = ({ currentPage = "" }) => {
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
            <Marianne
              src={"/static/assets/img/marianne.svg"}
              alt="symbole de la Marianne, site officiel du gouvernement | Ministère du travail"
            />
            <Logo
              src={"/static/assets/img/logo.svg"}
              alt="code du travail numérique"
            />
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

const { box, breakpoints, fonts, spacings } = theme;

const HEADER_HEIGHT = "9rem";
const HEADER_HEIGHT_MOBILE = "5rem";

const StyledHeader = styled.header`
  ${({ currentPage }) => {
    if (currentPage !== "home") {
      return css`
        position: sticky;
        top: 0;
        z-index: 2;
        box-shadow: ${({ theme }) => box.shadow.default(theme.secondary)};
      `;
    }
  }};
  height: ${HEADER_HEIGHT};
  margin-bottom: ${({ currentPage }) =>
    currentPage === "home" ? "7rem" : "6rem"};
  overflow: visible;
  background-color: ${({ currentPage, theme }) =>
    currentPage === "home" ? "transparent" : theme.white};
  @media (max-width: ${breakpoints.mobile}) {
    height: ${HEADER_HEIGHT_MOBILE};
    margin-bottom: ${({ currentPage }) =>
      currentPage === "home" ? spacings.large : spacings.medium};
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
  height: ${HEADER_HEIGHT};
  @media (max-width: ${breakpoints.mobile}) {
    height: ${HEADER_HEIGHT_MOBILE};
  }
`;

const LogoLink = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  @media (max-width: ${breakpoints.mobile}) {
    /**
     * hack(lionelb)
     * the width will be 50% + half the logo
     * so logo is center using space-between
     */
    flex: 0 0 calc(50% + 4.635rem);
    justify-content: space-between;
  }
`;

const Marianne = styled.img`
  position: relative;
  top: ${spacings.base};
  width: 9rem;
  /* height inside header, use 7em and no top */
  margin-right: ${spacings.large};
  @media (max-width: ${breakpoints.mobile}) {
    top: ${spacings.xsmall};
    max-width: 5rem;
    /* height inside header, use 4em and no top */
  }
`;
const Logo = styled.img`
  position: relative;
  width: 17rem;
  @media (max-width: ${breakpoints.mobile}) {
    max-width: 9.25rem;
  }
`;

const RightSide = styled.div`
  display: flex;
  flex: 1 0 auto;
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
  width: 31rem;
  margin-left: ${spacings.base};
  @media (max-width: ${breakpoints.tablet}) {
    display: none;
  }
`;

export default Header;
