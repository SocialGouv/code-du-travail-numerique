import React from "react";
import Link from "next/link";
import styled from "styled-components";

import { Tag, Container, theme } from "@socialgouv/react-ui";

import SearchBar from "../search/SearchBar";

const Header = ({ hideSearch = false }) => (
  <StyledHeader>
    <StyledContainer>
      <LeftWrapper>
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
        <StyledTag variant="info">Version Bêta</StyledTag>
      </LeftWrapper>
      {!hideSearch && (
        <SearchBarWrapper>
          <SearchBar />
        </SearchBarWrapper>
      )}
    </StyledContainer>
  </StyledHeader>
);

const { breakpoints, colors, fonts, spacing } = theme;

const StyledHeader = styled.header`
  background: ${colors.white};
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
const LeftWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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

const StyledTag = styled(Tag)`
  margin-left: ${spacing.interComponent};
`;

const SearchBarWrapper = styled.div`
  width: 350px;
  @media (max-width: ${breakpoints.tablet}) {
    margin-top: ${spacing.interComponent};
    width: 70%;
  }
  @media (max-width: ${breakpoints.mobile}) {
    margin-top: ${spacing.interComponent};
    width: 100%;
  }
`;
export default Header;
