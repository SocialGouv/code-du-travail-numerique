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
  align-items: center;
  justify-content: space-between;
  padding: ${spacing.medium};
  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
  }
  @media (max-width: ${breakpoints.mobile}) {
    align-items: flex-start;
  }
`;
const LeftWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const LogoWrapper = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
`;

const Logo = styled.img`
  width: 5rem;
  height: 100%;
  margin-right: ${spacing.base};
`;

const Title = styled.span`
  font-weight: bold;
  font-size: ${fonts.sizeH5};
  line-height: 1.2;
`;

const StyledTag = styled(Tag)`
  margin-left: ${spacing.interComponent};
`;

const SearchBarWrapper = styled.div`
  width: 350px;
  @media (max-width: ${breakpoints.tablet}) {
    width: 70%;
    margin-top: ${spacing.interComponent};
  }
  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    margin-top: ${spacing.interComponent};
  }
`;
export default Header;
