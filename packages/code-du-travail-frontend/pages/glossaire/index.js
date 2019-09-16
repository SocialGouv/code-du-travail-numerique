import React from "react";
import glossary from "@cdt/data...glossary/glossary.data.json";
import Link from "next/link";

import styled from "styled-components";
import { Container, Section } from "@cdt/ui-old";

import Search from "../../src/search/Search";
import { PageLayout } from "../../src/layout/PageLayout";
import Metas from "../../src/common/Metas";

function Glossaire({ pageUrl, ogImage }) {
  const termsByLetters = getGlossaryLetters(glossary);
  return (
    <PageLayout>
      <Metas
        url={pageUrl}
        title="Glossaire - Code du travail numérique"
        description="Retrouvez l'ensemble des termes utilisés fréquemment sur le code du travail numérique et leur explication"
        image={ogImage}
      />
      <Search />
      <Section>
        <Container narrow>
          <Title>Glossaire</Title>
          <GlossaryNavigation letters={termsByLetters} />
          <Glossary letters={termsByLetters} />
        </Container>
      </Section>
    </PageLayout>
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
  return letters.map(({ letter, terms }) => {
    if (terms.length > 0) {
      return (
        <a key={`letter-${letter}`} href={`#ancre-${letter}`}>
          {letter}
        </a>
      );
    }
    return <span key={`letter-${letter}`}>{letter}</span>;
  });
}

const Title = styled.h1`
  text-align: center;
`;
