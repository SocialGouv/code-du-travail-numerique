import React from "react";
import fetch from "isomorphic-unfetch";
import styled from "styled-components";
import Head from "next/head";
import getConfig from "next/config";
import { max, startOfDay, subMonths } from "date-fns";
import {
  Container,
  Grid,
  Heading,
  PageTitle,
  Section,
  Wrapper
} from "@socialgouv/react-ui";

import { Layout } from "../src/layout/Layout";

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

const Stats = ({ data }) => {
  const launchDate = new Date(Date.UTC(2020, 0, 1));
  const startDate = max([subMonths(startOfDay(new Date()), 6), launchDate]);

  return (
    <Layout>
      <Head>
        <title>Statistiques du Code du travail numérique</title>
        <meta
          name="description"
          content="Statistiques du Code du travail numérique"
        />
      </Head>
      <Section>
        <Container>
          <PageTitle>Statistiques du Code du travail numérique</PageTitle>
          <Wrapper variant="main">
            <Grid columns={3}>
              <Tile variant="dark">
                <Heading>Contenus référencés</Heading>
                <Num>{data.nbDocuments}</Num>
              </Tile>

              <Tile variant="dark">
                <Heading>Visites</Heading>
                <Num>{data.nbVisits}</Num>
              </Tile>

              <Tile variant="dark">
                <Heading>Recherches</Heading>
                <Num>{data.nbSearches}</Num>
              </Tile>

              <Tile variant="dark">
                <Heading>Consultations</Heading>
                <Num>{data.nbPageViews}</Num>
              </Tile>

              <Tile variant="dark">
                <Heading>Taux de satisfaction</Heading>
                <Num>
                  {Math.round(
                    (100 * data.feedback.positive) /
                      (data.feedback.positive + data.feedback.negative)
                  )}
                  %
                </Num>
              </Tile>
            </Grid>
            <p>
              Statistiques d’utilisation depuis le{" "}
              {startDate.toLocaleString("fr-FR", {
                year: "numeric",
                month: "numeric",
                day: "numeric"
              })}
            </p>
          </Wrapper>
        </Container>
      </Section>
    </Layout>
  );
};

Stats.getInitialProps = async function() {
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
