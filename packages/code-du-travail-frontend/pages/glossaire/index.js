import React from "react";
import glossary from "@cdt/data...datafiller/glossary.data.json";
import Link from "next/link";

import styled from "styled-components";
import {
  Container,
  PageTitle,
  Section,
  theme,
  Title
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
          <PageTitle>Glossaire</PageTitle>
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
  return <Title id={`ancre-${letter}`}>{letter}</Title>;
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
const { spacings, fonts } = theme;

const Item = styled.li`
  display: inline-block;
  padding: ${spacings.tiny};
  font-size: ${fonts.sizes.headings.small};
`;
