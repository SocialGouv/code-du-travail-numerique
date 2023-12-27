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
import { SOURCES } from "@socialgouv/cdtn-utils";
import { REVALIDATE_TIME, SITE_URL } from "../../src/config";
import { getAllAgreements } from "../../src/api";

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
            <Link
              href={`/outils/convention-collective`}
              passHref
              legacyBehavior
            >
              <Button as="a" variant="link" hasText>
                Trouvez la
              </Button>
            </Link>
          </p>

          <FlatList>
            {ccs.map((item) => (
              <ListItem key={`${item.source}-${item.slug}`}>
                <ListLink
                  item={{ ...item, title: item.shortTitle }}
                  showTheme={true}
                  titleTagType="h2"
                />
              </ListItem>
            ))}
          </FlatList>
        </Container>
      </Section>
    </Layout>
  );
}

export default Page;

export async function getStaticProps() {
  let data: any;
  if (process.env.NEXT_PUBLIC_APP_ENV !== "production") {
    const response = await fetch(`${SITE_URL}/api/agreements`);
    data = await response.json();
  } else {
    data = await getAllAgreements();
  }
  return { props: { ccs: data }, revalidate: REVALIDATE_TIME };
}
const ListItem = styled.li`
  margin-top: ${theme.spacings.medium};
`;
