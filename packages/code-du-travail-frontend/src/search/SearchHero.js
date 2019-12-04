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
          Vous cherchez une information sur le droit du travail ? Vous avez
          besoin d’accompagnement ?<br />
          Nous vous proposons <b>des réponses</b>{" "}
          <Primary>
            personnalisées selon votre situation.&nbsp;
            <StyledConfigIcon />
          </Primary>
        </P>
      </Header>
      <Label htmlFor={SEARCH_ID}> Recherchez par mots clefs</Label>
      <SearchBarWrapper>
        <SearchBar inputId={SEARCH_ID} hasFocus hasButton />
      </SearchBarWrapper>
    </StyledContainer>
  </SearchSection>
);

export default SearchHero;

const { breakpoints, spacings, fonts } = theme;
const { Config: ConfigIcon } = icons;

const SearchSection = styled(Section)`
  padding-bottom: 12rem;
  @media print {
    display: none;
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

const Primary = styled.span`
  color: ${({ theme }) => theme.primary};
  font-weight: normal;
`;

const StyledConfigIcon = styled(ConfigIcon)`
  display: inline;
  width: 3rem;
  height: 3rem;
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
