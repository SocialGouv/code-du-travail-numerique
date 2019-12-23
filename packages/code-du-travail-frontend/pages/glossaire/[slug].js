import React from "react";
import glossary from "@cdt/data...datafiller/glossary.data.json";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import {
  Container,
  FlatList,
  PageTitle,
  Section,
  Table,
  theme,
  Wrapper
} from "@socialgouv/react-ui";

import { Layout } from "../../src/layout/Layout";
import Metas from "../../src/common/Metas";
import Html from "../../src/common/Html";

function Term({ pageUrl, ogImage }) {
  const router = useRouter();
  const { slug } = router.query;
  const [term] = glossary.filter(term => slug === term.slug);

  return (
    <Layout title={title}>
      <Metas
        url={pageUrl}
        title={`${term.title} - Code du travail numérique`}
        description={term.definition}
        image={ogImage}
      />
      <Section>
        <Container narrow>
          <PageTitle>{term.title}</PageTitle>
          <Wrapper variant="main">
            <Table>
              <tbody>
                <tr>
                  <th>Définition</th>
                  <td>
                    <Html>{term.definition}</Html>
                  </td>
                </tr>
                {term.refs.length > 0 && (
                  <tr>
                    <th>Sources</th>
                    <td>
                      <StyledList>
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
                      </StyledList>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
            <p>
              <Link href="/glossaire">
                <a>Retour</a>
              </Link>
            </p>
          </Wrapper>
        </Container>
      </Section>
    </Layout>
  );
}

export default Term;

const { spacings } = theme;

const StyledList = styled(FlatList)`
  margin: ${spacings.small} 0;
  padding: 0;
  list-style-type: none;
`;
