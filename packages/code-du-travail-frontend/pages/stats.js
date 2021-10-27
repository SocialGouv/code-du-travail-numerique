import {
  Container,
  Grid,
  Heading,
  PageTitle,
  Section,
  Wrapper,
} from "@socialgouv/cdtn-ui";
import { max, startOfDay, subMonths } from "date-fns";
import getConfig from "next/config";
import React from "react";
import styled from "styled-components";

import Metas from "../src/common/Metas";
import { Layout } from "../src/layout/Layout";

const {
  publicRuntimeConfig: { API_URL },
} = getConfig();

const Stats = ({ data }) => {
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
            <Grid columns={3}>
              <Tile variant="dark">
                <Heading as="h2">Contenus référencés</Heading>
                <Num>{data.nbDocuments}</Num>
              </Tile>

              <Tile variant="dark">
                <Heading as="h2">Visites</Heading>
                <Num>{data.nbVisits}</Num>
              </Tile>

              <Tile variant="dark">
                <Heading as="h2">Recherches</Heading>
                <Num>{data.nbSearches}</Num>
              </Tile>

              <Tile variant="dark">
                <Heading as="h2">Consultations</Heading>
                <Num>{data.nbPageViews}</Num>
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
          </Wrapper>
        </Container>
      </Section>
    </Layout>
  );
};

Stats.getInitialProps = async function () {
  const response = await fetch(`${API_URL}/stats`);
  if (!response.ok) {
    return { statusCode: response.status };
  }
  const data = await response.json();
  return { data };
};

const Tile = styled(Wrapper)`
  position: relative;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  width: 100%;
`;

const Num = styled.div`
  color: ${({ theme }) => theme.secondary};
  font-weight: bold;
  font-size: 5rem;
  font-family: "Open Sans", sans-serif;
`;

export default Stats;
