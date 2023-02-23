import {
  Button,
  Container,
  FlatList,
  PageTitle,
  Section,
  theme,
  Toast,
} from "@socialgouv/cdtn-ui";
import React from "react";

import Metas from "../../src/common/Metas";
import { Layout } from "../../src/layout/Layout";
import { handleError } from "../../src/lib/fetch-error";
import { ListLink } from "../../src/search/SearchResults/Results";
import styled from "styled-components";
import Link from "next/link";
import { SOURCES } from "@socialgouv/cdtn-types";
import { API_URL } from "../../src/config";

function Page({ ccs }) {
  return (
    <Layout currentPage={SOURCES.CCN}>
      <Metas
        title="Votre convention collective"
        description="Retrouvez les questions/réponses fréquentes organisées par thème pour votre convention collective"
      />

      <Section>
        <Container narrow>
          <PageTitle
            subtitle={
              "Retrouvez les questions/réponses fréquentes organisées par thème pour\u00a0votre\u00a0convention\u00a0collective"
            }
          >
            Votre convention collective
          </PageTitle>
          <Toast variant="secondary">
            <p>
              La convention collective est un texte qui adapte les règles du
              Code du travail sur des points précis (primes, congés, salaires
              minima, préavis, prévoyance…) pour un secteur d’activité.
              L’activité économique principale exercée par l’employeur détermine
              la convention collective applicable. Elle est négociée et conclue
              d’une part par les organisations syndicales représentatives des
              salariés et d’autre part par les employeurs, éventuellement réunis
              en organisations syndicales ou associations.
            </p>
          </Toast>
          <p>
            Vous ne connaissez pas votre convention collective ?{" "}
            <Link href={`/outils/convention-collective`} passHref>
              <Button as="a" variant="link" hasText>
                Trouvez la
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
  const response = await fetch(`${API_URL}/conventions/with-contributions`);
  if (!response.ok) {
    return handleError(response);
  }
  const ccs = await response.json();
  return { props: { ccs } };
};
const ListItem = styled.li`
  margin-top: ${theme.spacings.medium};
`;
