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
import { GetServerSideProps } from "next";
import getConfig from "next/config";
import React from "react";
import styled from "styled-components";

import Metas from "../src/common/Metas";
import { Layout } from "../src/layout/Layout";

const {
  publicRuntimeConfig: { API_URL },
} = getConfig();

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
                <p>
                  Statistiques d’utilisation depuis le{" "}
                  {startDate.toLocaleString("fr-FR", {
                    day: "numeric",
                    month: "numeric",
                    year: "numeric",
                  })}
                </p>
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
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const props = await fetch(`${API_URL}/stats`)
    .then((res) => {
      if (res.ok) return res.json();
      throw new Error("Error fetching stats");
    })
    .then((data: PropsData) => ({ props: { data } }))
    .catch(() => ({
      props: {
        data: null,
      },
    }));
  return props;
};

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
