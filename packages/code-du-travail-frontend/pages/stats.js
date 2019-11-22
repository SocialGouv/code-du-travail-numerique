import React from "react";
import styled from "styled-components";
import Head from "next/head";
import {
  Container,
  Grid,
  GridCell,
  Heading,
  PageTitle,
  Section,
  Wrapper
} from "@socialgouv/react-ui";

import { Layout } from "../src/layout/Layout";

const About = () => (
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
        <Wrapper variant="light">
          <PageTitle>Statistiques du code du travail numérique</PageTitle>
          <br />
          <Grid>
            <GridCell>
              <Heading>Contenus référencés</Heading>
              <Num>14369</Num>
            </GridCell>
            <GridCell>
              <Heading>Visites</Heading>
              <Num>2992</Num>
            </GridCell>
            <GridCell>
              <Heading>Recherches</Heading>
              <Num>15368</Num>
            </GridCell>
            <GridCell>
              <Heading>Consultations</Heading>
              <Num>30736</Num>
            </GridCell>
          </Grid>
          <br />
          <p>Statistiques d’usage depuis le 1er Janvier 2019</p>
          <br />
          <br />
        </Wrapper>
      </Container>
    </Section>
  </Layout>
);

const Num = styled.div`
  font-size: 2em;
`;

export default About;
