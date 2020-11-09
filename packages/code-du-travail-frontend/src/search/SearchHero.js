import { Container, icons, Section, theme } from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";

import SearchBar from "./SearchBar";

const SEARCH_ID = "searchbar";
const SEARCH_WIDTH = "77rem";

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
        </P>
      </Header>
      <Label htmlFor={SEARCH_ID}> Recherchez par mots-clés</Label>
      <SearchBarWrapper>
        <SearchBar inputId={SEARCH_ID} hasFocus hasButton />
      </SearchBarWrapper>
      <StyledWorkersWrapper>
        <StyledWorkers />
      </StyledWorkersWrapper>
    </StyledContainer>
  </SearchSection>
);

export default SearchHero;

const { breakpoints, spacings, fonts } = theme;

const SearchSection = styled(Section)`
  display: flex;
  flex-direction: column;
  padding-bottom: 10rem;
  @media (max-width: ${breakpoints.mobile}) {
    padding-bottom: 7rem;
  }
  @media print {
    display: none;
  }
`;

const StyledContainer = styled(Container)`
  position: relative;
  flex: 0 0 auto;
  width: 100%;
  padding-left: 12rem;
  @media (max-width: ${breakpoints.tablet}) {
    padding-left: ${spacings.medium};
  }
  @media (max-width: ${breakpoints.mobile}) {
    padding-left: ${spacings.small};
  }
`;

const Header = styled.header`
  margin-top: 0;
  color: ${({ theme }) => theme.paragraph};
  line-height: ${fonts.lineHeight};
  @media (max-width: ${breakpoints.desktop}) {
    max-width: 50rem;
  }
  @media (max-width: ${breakpoints.mobile}) {
    max-width: 100%;
  }
`;

const H1 = styled.h1`
  font-size: ${fonts.sizes.headings.medium};
  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    font-size: ${fonts.sizes.headings.small};
  }
`;

const P = styled.p`
  margin-top: ${spacings.xsmall};
  margin-bottom: ${spacings.large};
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

const StyledWorkersWrapper = styled.div`
  position: absolute;
  top: -8rem;
  right: -1rem;
  z-index: -1;
  width: 47rem;
  height: 39.2rem;
  overflow: visible;
  @media (max-width: ${breakpoints.desktop}) {
    top: -5rem;
    right: 3rem;
    width: 40rem;
    height: 33.4rem;
  }
  @media (max-width: ${breakpoints.tablet}) {
    display: none;
  }
`;

const StyledWorkers = styled(icons.WorkersHero)`
  display: ${({ theme }) => (theme.noColors ? "none" : "block")};
  overflow: visible;
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${spacings.xsmall};
  color: ${({ theme }) => theme.paragraph};
  font-weight: bold;
  font-size: ${fonts.sizes.default};
`;

const SearchBarWrapper = styled.div`
  max-width: ${SEARCH_WIDTH};
  margin: 0;
  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
  }
`;
