import {
  Button,
  Container,
  FlatList,
  PageTitle,
  Section,
  theme,
} from "@socialgouv/cdtn-ui";
import getConfig from "next/config";
import React from "react";

import Metas from "../../src/common/Metas";
import { Layout } from "../../src/layout/Layout";
import { handleError } from "../../src/lib/fetch-error";
import { ListLink } from "../../src/search/SearchResults/Results";
import styled from "styled-components";
import Link from "next/link";

const {
  publicRuntimeConfig: { API_URL },
} = getConfig();

function Page({ ccs }) {
  return (
    <Layout>
      <Metas
        title="Ma convention collective"
        description="Retrouvez les questions/réponses fréquentes organisées par thème pour votre convention collective"
      />

      <Section>
        <Container narrow>
          <PageTitle
            subtitle={
              "Retrouvez les questions/réponses fréquentes organisées par thème pour votre convention collective"
            }
          >
            Ma convention collective
          </PageTitle>
          <p>
            Vous ne connaissez pas votre convention collective ?{" "}
            <Link href={`/outils/convention-collective`} passHref>
              <Button as="a" variant="link" hasText>
                Trouver la
              </Button>
            </Link>
          </p>

          <FlatList>
            {ccs.map((item) => (
              <ListItem key={`${item.source}-${item.slug}`}>
                <ListLink item={item} showTheme={true} titleTagType="h2" />
              </ListItem>
            ))}
          </FlatList>
        </Container>
      </Section>
    </Layout>
  );
}

export default Page;

export const getServerSideProps = async () => {
  const response = await fetch(`${API_URL}/conventions`);
  if (!response.ok) {
    return handleError(response);
  }
  const ccs = await response.json();
  return { props: { ccs } };
};
const ListItem = styled.li`
  margin-top: ${theme.spacings.medium};
`;
