import React from "react";
import getConfig from "next/config";
import Link from "next/link";
import styled from "styled-components";
import {
  Container,
  FlatList,
  PageTitle,
  Section,
  Table,
  theme,
  Wrapper,
} from "@socialgouv/react-ui";

import { Layout } from "../../src/layout/Layout";
import Metas from "../../src/common/Metas";
import Html from "../../src/common/Html";
import { FocusRoot } from "../../src/a11y";

const {
  publicRuntimeConfig: { API_URL },
} = getConfig();

export async function getServerSideProps({ query: { slug } }) {
  const responseContainer = await fetch(`${API_URL}/glossary/${slug}`);
  if (!responseContainer.ok) {
    return { props: { errorCode: responseContainer.status } };
  }
  const term = await responseContainer.json();
  return { props: { term, slug } };
}

function Term({ errorCode, slug, term }) {
  return (
    <Layout errorCode={errorCode}>
      <Metas
        description={term.definition}
        pathname={`/glossaire/${slug}`}
        title={`${term.title} - Code du travail numérique`}
      />
      <Section>
        <Container narrow>
          <FocusRoot>
            <PageTitle>{term.title}</PageTitle>
          </FocusRoot>
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
