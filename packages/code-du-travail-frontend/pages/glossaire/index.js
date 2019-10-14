import React from "react";
import glossary from "@cdt/data...datafiller/glossary.data.json";
import Link from "next/link";

import styled from "styled-components";
import {
  List,
  ListItem,
  Container,
  Section,
  theme
} from "@socialgouv/react-ui";

import { Layout } from "../../src/layout/Layout";
import Metas from "../../src/common/Metas";

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
          <Title>Glossaire</Title>
          <GlossaryNavigation letters={termsByLetters} />
          <Glossary letters={termsByLetters} />
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
  return <h2 id={`ancre-${letter}`}>{letter}</h2>;
}

function Glossary({ letters }) {
  return letters.map(({ letter, terms }) => {
    if (terms.length === 0) {
      return null;
    }

    return (
      <div key={letter}>
        <LetterTitle letter={letter} />
        <ul>
          {terms.map(({ title, slug }) => (
            <li key={slug}>
              <Link href="/glossaire/[slug]" as={`/glossaire/${slug}`}>
                <a>{title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  });
}

function GlossaryNavigation({ letters }) {
  return (
    <List>
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
    </List>
  );
}
const { spacing, fonts } = theme;

const Title = styled.h1`
  text-align: center;
`;
const Item = styled(ListItem)`
  display: inline-block;
  padding: ${spacing.tiny};
  font-size: ${fonts.sizeH5};
`;
