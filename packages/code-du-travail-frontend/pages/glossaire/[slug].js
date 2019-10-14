import React from "react";
import glossary from "@cdt/data...datafiller/glossary.data.json";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Table, Container, Section } from "@socialgouv/react-ui";

import { Layout } from "../../src/layout/Layout";
import Metas from "../../src/common/Metas";
import Html from "../../src/common/Html";

function Term({ pageUrl, ogImage }) {
  const router = useRouter();
  const { slug } = router.query;
  const [term] = glossary.filter(term => slug === term.slug);

  return (
    <Layout>
      <Metas
        url={pageUrl}
        title={`${term.title} - Code du travail numérique`}
        description={term.definition}
        image={ogImage}
      />
      <Section>
        <Container narrow>
          <Title>{term.title}</Title>

          <Table>
            <tbody>
              <tr>
                <th>Définition</th>
                <td>
                  <Html>{term.definition}</Html>
                </td>
              </tr>
              {term.refs.length > 0 ? (
                <tr>
                  <th>Sources</th>
                  <td>
                    <ul>
                      {term.refs.map(({ url }) => (
                        <li key={url}>
                          <a
                            href={url}
                            target="_blank"
                            title="voir la référence"
                            rel="nofollow noreferrer noopener"
                          >
                            {url}
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
    </Layout>
  );
}

export default Term;

const Title = styled.h1`
  text-align: center;
`;
