import React from "react";
import styled from "styled-components";
import { Container, Section, theme } from "@socialgouv/react-ui";

import SearchBar from "./SearchBar";

const SEARCH_ID = "searchbar";

const SearchHero = () => (
  <SearchSection variant="white">
    <Container>
      <Header>
        <H1>
          Bienvenue sur <br />
          <Span>le Code du travail numérique</Span>
        </H1>
        <P>
          Vous cherchez une information sur le droit du travail ? Vous avez
          besoin d’accompagnement ?<br />
          Nous vous proposons des réponses accessibles et personnalisées selon
          votre situation.
        </P>
      </Header>
      <Label htmlFor={SEARCH_ID}> Recherchez par mots clefs</Label>
      <SearchBarWrapper>
        <SearchBar inputId={SEARCH_ID} hasFocus hasButton />
      </SearchBarWrapper>
    </Container>
  </SearchSection>
);

export default SearchHero;

const { breakpoints, colors, spacings, fonts } = theme;

const SearchSection = styled(Section)`
  padding-bottom: ${spacings.larger};
  background-color: ${colors.bgTertiary};
  @media print {
    display: none;
  }
`;

const Header = styled.header`
  margin-top: 0;
  color: ${colors.paragraph};
  line-height: ${fonts.lineHeight};
`;

const H1 = styled.h1`
  font-size: ${fonts.sizes.headings.medium};
`;

const P = styled.p`
  margin-top: ${spacings.small};
`;

const Span = styled.span`
  font-weight: bold;
  font-size: 4.6rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${spacings.small};
  color: ${colors.paragraph};
  font-size: ${fonts.sizes.default};
`;

const SearchBarWrapper = styled.div`
  width: 750px;
  margin: 0;
  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
  }
  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    max-width: 400px;
  }
`;
