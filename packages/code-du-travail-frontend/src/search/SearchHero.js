import React from "react";
import styled from "styled-components";
import { Container, theme, Section } from "@cdt/ui-old";

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
      <Label for={SEARCH_ID}> Recherchez par mots clefs</Label>
      <SearchBarWrapper>
        <SearchBar inputId={SEARCH_ID} hasFocus hasButton />
      </SearchBarWrapper>
    </Container>
  </SearchSection>
);

export default SearchHero;

const { breakpoints, colors, spacing, fonts } = theme;

const SearchSection = styled(Section)`
  padding-bottom: ${spacing.larger};
  background-color: ${colors.infoBackground};
  @media print {
    display: none;
  }
`;

const Header = styled.header`
  margin-top: 0;
  line-height: ${fonts.lineHeight};
  color: ${colors.blueDark};
`;

const H1 = styled.h1`
  line-height: 1.1;
  margin-bottom: 0;
`;

const P = styled.p`
  margin-top: ${spacing.smaller};
`;

const Span = styled.span`
  font-weight: bold;
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${spacing.small};
  font-size: ${fonts.sizeH4};
  color: ${colors.blueDark};
`;

const SearchBarWrapper = styled.div`
  margin: 0;
  width: 750px;
  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
  }
  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    max-width: 400px;
  }
`;
