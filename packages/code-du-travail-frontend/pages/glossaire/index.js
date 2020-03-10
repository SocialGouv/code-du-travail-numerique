import React from "react";
import glossary from "@cdt/data...datafiller/glossary.data.json";
import Link from "next/link";

import styled from "styled-components";
import {
  Container,
  FlatList,
  PageTitle,
  Section,
  theme,
  Title,
  Wrapper
} from "@socialgouv/react-ui";

import { Layout } from "../../src/layout/Layout";
import Metas from "../../src/common/Metas";
import { FocusRoot } from "../../src/a11y";

const subtitle =
  "Les définitions de ce glossaire, disponibles en surbrillance dans les textes des réponses, ont pour objectif d’améliorer la compréhension des termes juridiques. Elles ne se substituent pas à la définition juridique exacte de ces termes.";

function Glossaire({ pageUrl, ogImage }) {
  const termsByLetters = getGlossaryLetters(glossary);
  return (
    <Layout>
      <Metas
        url={pageUrl}
        title="Glossaire - Code du travail numérique"
        description="Retrouvez l'ensemble des termes utilisés fréquemment sur le code du travail numérique et leur explication"
        image={ogImage}
      />
      <Section>
        <Container narrow>
          <FocusRoot>
            <PageTitle subtitle={subtitle}>Glossaire</PageTitle>
          </FocusRoot>
          <Wrapper variant="main">
            <GlossaryNavigation letters={termsByLetters} />
            <Glossary letters={termsByLetters} />
          </Wrapper>
        </Container>
      </Section>
    </Layout>
  );
}

export default Glossaire;

function getGlossaryLetters(glossary) {
  const A = "A".charCodeAt(0);
  const alphabet = Array.from({ length: 26 }, (_, index) =>
    String.fromCharCode(A + index)
  );
  return alphabet.map(letter => ({
    letter,
    terms: glossary.filter(
      ({ slug }) => slug.slice(0, 1).toUpperCase() === letter
    )
  }));
}

function LetterTitle({ letter }) {
  return (
    <Title shift={theme.spacings.larger} id={`ancre-${letter}`}>
      {letter}
    </Title>
  );
}

function Glossary({ letters }) {
  return letters.map(({ letter, terms }) => {
    if (terms.length === 0) {
      return null;
    }

    return (
      <div key={letter}>
        <LetterTitle letter={letter} />
        <StyledList>
          {terms.map(({ title, slug }) => (
            <li key={slug}>
              <Link href="/glossaire/[slug]" as={`/glossaire/${slug}`}>
                <a>{title}</a>
              </Link>
            </li>
          ))}
        </StyledList>
      </div>
    );
  });
}

function GlossaryNavigation({ letters }) {
  return (
    <ul>
      {letters.map(({ letter, terms }) => {
        if (terms.length > 0) {
          return (
            <Item key={`letter-${letter}`}>
              <a href={`#ancre-${letter}`}>{letter}</a>
            </Item>
          );
        }
        return (
          <Item key={`letter-${letter}`}>
            <span>{letter}</span>
          </Item>
        );
      })}
    </ul>
  );
}
const { breakpoints, fonts, spacings } = theme;

const Item = styled.li`
  display: inline-block;
  padding: ${spacings.tiny};
  font-size: ${fonts.sizes.headings.small};
  @media (max-width: ${breakpoints.mobile}) {
    font-size: ${fonts.sizes.default};
  }
`;

const StyledList = styled(FlatList)`
  margin: ${spacings.small} 0;
`;
