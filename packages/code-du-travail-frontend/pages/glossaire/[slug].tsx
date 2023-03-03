import {
  Container,
  FlatList,
  PageTitle,
  Section,
  Table,
  theme,
  Wrapper,
} from "@socialgouv/cdtn-ui";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

import { A11yLink } from "../../src/common/A11yLink";
import Html from "../../src/common/Html";
import Metas from "../../src/common/Metas";
import { API_URL } from "../../src/config";
import { Layout } from "../../src/layout/Layout";
import { handleError } from "../../src/lib/fetch-error";

interface Props {
  term: string;
  definition: string;
  references?: Array<any>;
}

function Term(props: Props): JSX.Element {
  const { term, definition, references } = props;

  const referrenceArrayWithoutNull = React.useMemo(
    () => references && references.filter((ref) => ref !== null),
    [references]
  );

  return (
    <Layout>
      <Metas title={term} description={definition} />
      <Section>
        <Container narrow>
          <PageTitle>{term}</PageTitle>
          <Wrapper variant="main">
            <Table>
              <tbody>
                <tr>
                  <th>Définition</th>
                  <td>
                    <Html>{definition}</Html>
                  </td>
                </tr>
                {referrenceArrayWithoutNull &&
                  referrenceArrayWithoutNull.length > 0 && (
                    <tr>
                      <th>Sources</th>
                      <td>
                        <StyledList>
                          {referrenceArrayWithoutNull.map((url) => (
                            <li key={url}>
                              <A11yLink
                                href={url}
                                target="_blank"
                                title="voir la référence"
                                rel="nofollow noreferrer noopener"
                              >
                                {url}
                              </A11yLink>
                            </li>
                          ))}
                        </StyledList>
                      </td>
                    </tr>
                  )}
              </tbody>
            </Table>
            <p>
              <Link href="/glossaire">Retour</Link>
            </p>
          </Wrapper>
        </Container>
      </Section>
    </Layout>
  );
}

export const getServerSideProps = async ({ query: { slug } }) => {
  const responseContainer = await fetch(`${API_URL}/glossary/${slug}`);
  if (!responseContainer.ok) {
    return handleError(responseContainer);
  }
  const term = await responseContainer.json();
  return { props: term };
};

export default Term;

const { spacings } = theme;

const StyledList = styled(FlatList)`
  margin: ${spacings.small} 0;
  padding: 0;
  list-style-type: none;
`;
