import {
  Container,
  Grid,
  Heading,
  PageTitle,
  Paragraph,
  Section,
  Wrapper,
} from "@socialgouv/cdtn-ui";
import { max, startOfDay, subMonths } from "date-fns";
import React from "react";
import styled from "styled-components";

import Metas from "../src/common/Metas";
import { SITE_URL } from "../src/config";
import { Layout } from "../src/layout/Layout";
import { handleError } from "../src/lib/fetch-error";
import { getStatsData } from "../src/api/modules/stats/controller/get";
import { captureException } from "@sentry/nextjs";

type PropsData = {
  nbDocuments: number;
  nbVisits: number;
  nbSearches: number;
  nbPageViews: number;
};

type Props = {
  data: PropsData | null;
};

const Stats = ({ data }: Props): JSX.Element => {
  const launchDate = new Date(Date.UTC(2020, 0, 1));
  const startDate = max([subMonths(startOfDay(new Date()), 6), launchDate]);

  return (
    <Layout>
      <Metas
        title="Statistiques"
        description="Statistiques d’utilisation du Code du travail numérique"
      />
      <Section>
        <Container>
          <PageTitle>Statistiques du Code du travail numérique</PageTitle>
          <Wrapper variant="main">
            {data ? (
              <>
                <Grid columns={3}>
                  <Tile variant="dark">
                    <Heading as="h2">Contenus référencés</Heading>
                    <Num variant="secondary" fontWeight="600">
                      {data.nbDocuments}
                    </Num>
                  </Tile>

                  <Tile variant="dark">
                    <Heading as="h2">Visites</Heading>
                    <Num variant="secondary" fontWeight="600">
                      {data.nbVisits}
                    </Num>
                  </Tile>

                  <Tile variant="dark">
                    <Heading as="h2">Recherches</Heading>
                    <Num variant="secondary" fontWeight="600">
                      {data.nbSearches}
                    </Num>
                  </Tile>

                  <Tile variant="dark">
                    <Heading as="h2">Consultations</Heading>
                    <Num variant="secondary" fontWeight="600">
                      {data.nbPageViews}
                    </Num>
                  </Tile>
                </Grid>
                <p>Statistiques d’utilisation depuis le 01/01/2020</p>
              </>
            ) : (
              <p>Informations actuellement indisponibles</p>
            )}
          </Wrapper>
        </Container>
      </Section>
    </Layout>
  );
};

export async function getStaticProps() {
  try {
    let data: PropsData;
    if (process.env.NODE_ENV !== "production") {
      const response = await fetch(`${SITE_URL}/api/stats`);
      data = await response.json();
    } else {
      data = await getStatsData();
    }
    return { props: { data }, revalidate: 1800 };
  } catch (e) {
    console.error(e);
    captureException(e);
    return {
      props: {
        data: null,
      },
      revalidate: 1800, // 30 minutes
    };
  }
}

const Tile = styled(Wrapper)`
  position: relative;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  width: 100%;
`;

const Num = styled(Paragraph)`
  font-size: 5rem;
`;

export default Stats;
