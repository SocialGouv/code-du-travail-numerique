import React from "react";
import fetch from "isomorphic-unfetch";
import styled from "styled-components";
import Head from "next/head";
import getConfig from "next/config";
import { max, startOfDay, subMonths } from "date-fns";
import {
  Container,
  FlatList,
  Heading,
  PageTitle,
  Section,
  theme,
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
        <title>Statistiques du code du travail numérique</title>
        <meta
          name="description"
          content="Statistiques du code du travail numérique"
        />
      </Head>
      <Section>
        <Container>
          <PageTitle>Statistiques du code du travail numérique</PageTitle>
          <Wrapper variant="main">
            <StyledFlatList>
              <Li>
                <Heading>Contenus référencés</Heading>
                <Num>{data.nbDocuments}</Num>
              </Li>
              <Li>
                <Heading>Visites</Heading>
                <Num>{data.nbVisits}</Num>
              </Li>
              <Li>
                <Heading>Recherches</Heading>
                <Num>{data.nbSearches}</Num>
              </Li>
              <Li>
                <Heading>Consultations</Heading>
                <Num>{data.nbPageViews}</Num>
              </Li>
              <Li>
                <Heading>Statisfaction positif</Heading>
                <Num>{data.feedback.positive}</Num>
              </Li>
              <Li>
                <Heading>Statisfaction negatif</Heading>
                <Num>{data.feedback.negative}</Num>
              </Li>
            </StyledFlatList>
            <p>
              Statistiques d’usage depuis le {startDate.toLocaleString("fr-FR")}
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

const { breakpoints, fonts, spacings } = theme;

const StyledFlatList = styled(FlatList)`
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: flex-start;
  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
    margin-bottom: ${spacings.large};
  }
`;

const Li = styled.li`
  flex: 1 0 auto;
  margin: ${spacings.medium};
  text-align: center;
  @media (max-width: ${breakpoints.tablet}) {
    margin-top: ${spacings.large};
  }
`;

const Num = styled.div`
  font-size: ${fonts.sizes.headings.small};
`;

export default Stats;
