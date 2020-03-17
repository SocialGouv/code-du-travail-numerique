import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled, { css } from "styled-components";

import {
  Container,
  IconStripe,
  icons,
  theme,
  Toast
} from "@socialgouv/react-ui";

import SearchBar from "../../search/SearchBar";
import { BurgerNav } from "./BurgerNav";

const { Search: SearchIcon } = icons;

const printDate = () => {
  const currentDate = new Date(Date.now()).toLocaleString("fr-FR");
  return `le ${currentDate.slice(0, 10)} à ${currentDate.slice(11, 18)}`;
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
      {currentPage === "home" && (
        <Headband>
          <Toast wide variant="primary">
            <Container>
              <IconStripe icon={icons.Help} small centered>
                <Link href="/#en-ce-moment">
                  <a>Coronavirus : informations utiles</a>
                </Link>
              </IconStripe>
            </Container>
          </Toast>
        </Headband>
      )}
    </StyledHeader>
  );
};

const { box, breakpoints, spacings } = theme;

const HEADER_HEIGHT = "9rem";
const HEADER_HEIGHT_MOBILE = "6rem";

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
    height: ${({ currentPage }) =>
      currentPage === "home" ? "10rem" : HEADER_HEIGHT_MOBILE};
    margin-bottom: ${spacings.larger};
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
    /* 6.2rem is half logo's width so it gets centered */
    flex-grow: 0;
    flex-shrink: 0;
    justify-content: space-between;
    width: calc(50% + 6.2rem);
  }
`;

const Marianne = styled.img`
  width: 7rem;
  margin-right: ${spacings.large};
  @media (max-width: ${breakpoints.mobile}) {
    flex: 0 0 5rem;
    width: 5rem;
    height: 5rem;
  }
`;
const Logo = styled(icons.Logo)`
  width: 17rem;
  color: ${({ theme }) => theme.primary};
  @media (max-width: ${breakpoints.mobile}) {
    flex: 0 0 12.4rem;
    width: 12.4rem;
    height: 5rem;
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

const Headband = styled.div`
  padding: ${spacings.small};
`;

export default Header;
