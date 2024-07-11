import {
  Container,
  FlatList,
  PageTitle,
  Section,
  theme,
  Title,
  Wrapper,
} from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";

import Metas from "../../src/common/Metas";
import { REVALIDATE_TIME } from "../../src/config";
import { Layout } from "../../src/layout/Layout";
import { getGlossary } from "../../src/api";

const subtitle =
  "Les définitions de ce glossaire, disponibles en surbrillance dans les textes des réponses, ont pour objectif d’améliorer la compréhension des termes juridiques. Elles ne se substituent pas à la définition juridique exacte de ces termes.";

function Glossaire({ glossary }) {
  const termsByLetters = getGlossaryLetters(glossary);
  return (
    <Layout>
      <Metas
        title="Glossaire"
        description="Retrouvez l'ensemble des termes utilisés fréquemment sur le Code du travail numérique et leur explication"
      />
      <Section>
        <Container narrow>
          <PageTitle subtitle={subtitle}>Glossaire</PageTitle>
          <Wrapper variant="main">
            <GlossaryNavigation letters={termsByLetters} />
            <Glossary letters={termsByLetters} />
          </Wrapper>
        </Container>
      </Section>
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const data = await getGlossary();
    console.log("data", data);
    return { props: { glossary: data }, revalidate: REVALIDATE_TIME };
  } catch (error) {
    console.error(error);
    return { props: { glossary: [] }, revalidate: REVALIDATE_TIME };
  }
}

export default Glossaire;

function getGlossaryLetters(glossary) {
  const A = "A".charCodeAt(0);
  const alphabet = Array.from({ length: 26 }, (_, index) =>
    String.fromCharCode(A + index)
  );
  return alphabet.map((letter) => ({
    letter,
    terms: glossary
      .filter(({ slug }) => slug.slice(0, 1).toUpperCase() === letter)
      .sort((a, b) => a.term.localeCompare(b.term)),
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
        <FlatList>
          {terms.map(({ term, slug }) => (
            <li key={slug}>
              <p>
                <a href={`/glossaire/${slug}`}>{term}</a>
              </p>
            </li>
          ))}
        </FlatList>
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
