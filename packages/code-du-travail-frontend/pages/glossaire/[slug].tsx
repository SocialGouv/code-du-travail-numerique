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
import Metas from "../../src/common/Metas";
import { SITE_URL } from "../../src/config";
import { Layout } from "../../src/layout/Layout";
import { handleError } from "../../src/lib/fetch-error";
import { getGlossary } from "../../src/api";
import { NotFoundError } from "../../src/api/utils";

interface Props {
  term: string;
  definition: string;
  references?: Array<any>;
}

function Term(props: Props): JSX.Element {
  const { term, definition, references } = props;

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
                    <p>{definition}</p>
                  </td>
                </tr>
                {references && references.length > 0 && (
                  <tr>
                    <th>Sources</th>
                    <td>
                      <StyledList>
                        {references.map((url) => (
                          <li key={url}>
                            <A11yLink
                              href={url}
                              target="_blank"
                              title="voir la référence"
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
  const glossaryData = await getGlossary();
  const [term] = glossaryData.filter((term) => slug === term.slug);

  if (!term) {
    throw new NotFoundError({
      message: `there is no glossary term that match slug ${slug}`,
      name: "GLOSSARY_TERM_NOT_FOUND",
      cause: null,
    });
  }

  return { props: term };
};

export default Term;

const { spacings } = theme;

const StyledList = styled(FlatList)`
  margin: ${spacings.small} 0;
  padding: 0;
  list-style-type: none;
`;
