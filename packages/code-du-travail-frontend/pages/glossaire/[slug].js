import React from "react";
import glossary from "@cdt/data...datafiller/glossary.data.json";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Container, Section, Table } from "@cdt/ui-old";

import Search from "../../src/search/Search";
import { PageLayout } from "../../src/layout/PageLayout";
import Metas from "../../src/common/Metas";

function Term({ pageUrl, ogImage }) {
  const router = useRouter();
  const { slug } = router.query;
  const [term] = glossary.filter(term => slug === term.slug);

  return (
    <PageLayout>
      <Metas
        url={pageUrl}
        title={`${term.title} - Code du travail numérique`}
        description={term.definition}
        image={ogImage}
      />
      <Search />
      <Section>
        <Container narrow>
          <Title>{term.title}</Title>

          <Table>
            <tbody>
              <tr>
                <th>Définition</th>
                <td>{term.definition}</td>
              </tr>
              {term.abbrs.length > 0 ? (
                <tr>
                  <th>Abbréviation</th>
                  <td>{term.abbrs.join(", ")}</td>
                </tr>
              ) : null}
              {term.variants.length > 0 ? (
                <tr>
                  <th>Variantes</th>
                  <td>{term.variants.join(", ")}</td>
                </tr>
              ) : null}
              {term.refs.length > 0 ? (
                <tr>
                  <th>Références</th>
                  <td>
                    <ul>
                      {term.refs.map(ref => (
                        <li key={ref}>
                          <a
                            href={ref}
                            target="_blank"
                            title="voir la référence"
                            rel="nofollow noreferrer noopener"
                          >
                            {ref}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ) : null}
            </tbody>
          </Table>
          <p>
            <Link href="/glossaire">
              <a>Retour</a>
            </Link>
          </p>
        </Container>
      </Section>
    </PageLayout>
  );
}

export default Term;

const Title = styled.h1`
  text-align: center;
`;
