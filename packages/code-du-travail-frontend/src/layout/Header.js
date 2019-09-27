import React from "react";
import Link from "next/link";
import styled from "styled-components";

import { Container, theme } from "@cdt/ui-old";

import SearchBar from "../search/SearchBar";

const Header = ({ hideSearch = false }) => (
  <StyledHeader>
    <StyledContainer>
      <Link href="/" passHref>
        <LogoWrapper title="Code du travail numérique - retour à l'accueil">
          <Logo
            src={"/static/assets/img/marianne.svg"}
            alt="symbole de la Marianne, site officiel du gouvernement"
          />
          <Title>
            Code du travail
            <br />
            numérique
          </Title>
        </LogoWrapper>
      </Link>
      {!hideSearch && (
        <SearchBarWrapper>
          <SearchBar />
        </SearchBarWrapper>
      )}
    </StyledContainer>
  </StyledHeader>
);

const { breakpoints, fonts, spacing } = theme;

const StyledHeader = styled.header`
  color: white;
  background: currentColor;
`;

const StyledContainer = styled(Container)`
  display: flex;
  padding: ${spacing.medium};
  justify-content: space-between;
  align-items: center;
  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
  }
  @media (max-width: ${breakpoints.mobile}) {
    align-items: flex-start;
  }
`;
const LogoWrapper = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  :link {
    text-decoration: none;
  }
  :hover {
    text-decoration: underline;
  }
`;

const Logo = styled.img`
  width: 5rem;
  height: 100%;
  margin-right: ${spacing.base};
`;

const Title = styled.span`
  font-size: ${fonts.sizeH5};
  line-height: 1.4;
  text-decoration: none;
`;

const SearchBarWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  @media (max-width: ${breakpoints.tablet}) {
    margin-top: ${spacing.interComponent};
    max-width: 100%;
  }
`;
export default Header;
