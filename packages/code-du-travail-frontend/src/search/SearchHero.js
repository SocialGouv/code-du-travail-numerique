import React from "react";
import styled from "styled-components";
import { Container, icons, Section, theme } from "@socialgouv/react-ui";

import SearchBar from "./SearchBar";

const SEARCH_ID = "searchbar";

const SearchHero = () => (
  <SearchSection>
    <StyledContainer>
      <Header>
        <H1>
          Bienvenue sur <br />
          <Span>le Code du travail numérique</Span>
        </H1>
        <P>
          Obtenez des réponses aux questions que vous vous posez sur le droit du
          travail.
          <br />
          Les réponses personnalisables selon votre situation sont identifiées
          par ce symbole&nbsp;:
          <StyledConfigIcon />
        </P>
      </Header>
      <Label htmlFor={SEARCH_ID}> Recherchez par mots-clés</Label>
      <SearchBarWrapper>
        <SearchBar inputId={SEARCH_ID} hasFocus hasButton />
      </SearchBarWrapper>
    </StyledContainer>
    <StyledWorkersWrapper>
      <StyledWorkers />
    </StyledWorkersWrapper>
  </SearchSection>
);

export default SearchHero;

const { box, breakpoints, spacings, fonts } = theme;
const { Config: ConfigIcon } = icons;

const SearchSection = styled(Section)`
  height: ${({ theme }) => (theme.noColors ? "unset" : "50rem")};
  padding-bottom: 12rem;
  @media (max-width: ${breakpoints.tablet}) {
    height: ${({ theme }) => (theme.noColors ? "unset" : "90rem")};
    padding-bottom: 5rem;
  }
  @media (max-width: ${breakpoints.mobile}) {
    height: ${({ theme }) => (theme.noColors ? "unset" : "80rem")};
  }
  @media print {
    display: none;
  }
`;

const StyledWorkersWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: -1;
  display: flex;
  justify-content: center;
  width: 55%;
  height: 53rem;
  overflow: hidden;
  @media (max-width: ${breakpoints.tablet}) {
    position: relative;
    top: -10px;
    right: unset;
    width: unset;
    height: unset;
    overflow: unset;
  }
  @media (max-width: ${breakpoints.mobile}) {
    position: relative;
    top: -5px;
    right: unset;
    width: unset;
    height: unset;
    overflow: unset;
  }
`;

const StyledWorkers = styled(icons.WorkersHero)`
  display: ${({ theme }) => (theme.noColors ? "none" : "block")};
  flex: 0 1 100%;
  max-height: 100%;
  overflow: visible;
  transform: translateX(10%);
  @media (max-width: ${breakpoints.tablet}) {
    max-width: 70%;
    max-height: 50rem;
    transform: translateX(-5%);
  }
  @media (max-width: ${breakpoints.mobile}) {
    max-width: 90%;
    max-height: 30rem;
    transform: translateX(-5%);
  }
`;

const StyledContainer = styled(Container)`
  padding-left: 12rem;
  @media (max-width: ${breakpoints.tablet}) {
    padding-left: ${spacings.medium};
  }
`;

const Header = styled.header`
  margin-top: 0;
  color: ${({ theme }) => theme.paragraph};
  line-height: ${fonts.lineHeight};
`;

const H1 = styled.h1`
  font-size: ${fonts.sizes.headings.medium};
  @media (max-width: ${breakpoints.mobile}) {
    font-size: ${fonts.sizes.headings.small};
  }
`;

const P = styled.p`
  margin-top: ${spacings.small};
  margin-bottom: ${spacings.large};
  @media (max-width: ${breakpoints.desktop}) {
    display: inline-block;
    padding: 1rem;
    background-color: ${({ theme }) => theme.bgPrimary};
    border: ${({ theme }) => box.border(theme.border)};
    border-radius: ${box.borderRadius};
  }
  @media (max-width: ${breakpoints.tablet}) {
    padding: 0;
    background-color: unset;
    border: none;
  }
`;

const Span = styled.span`
  display: inline-block;
  margin-top: ${spacings.small};
  font-weight: bold;
  font-size: 4.6rem;
  @media (max-width: ${breakpoints.mobile}) {
    font-size: ${fonts.sizes.headings.large};
  }
`;

const StyledConfigIcon = styled(ConfigIcon)`
  display: inline;
  width: 3rem;
  height: 3rem;
  color: ${({ theme }) => theme.primary};
  vertical-align: bottom;
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${spacings.xsmall};
  color: ${({ theme }) => theme.paragraph};
  font-weight: bold;
  font-size: ${fonts.sizes.default};
`;

const SearchBarWrapper = styled.div`
  width: 77rem;
  margin: 0;
  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
  }
`;
