import React from "react";
import styled from "styled-components";
import Head from "next/head";
import { Container, Section, Wrapper, Grid, GridCell } from "@cdt/ui";
import { PageLayout } from "../src/layout/PageLayout";

const About = () => (
  <PageLayout>
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
          <h1>Statistiques du code du travail numérique</h1>
          <br />
          <br />
          <Grid>
            <GridCell>
              <h3>Contenus référencés</h3>
              <Num>14369</Num>
            </GridCell>
            <GridCell>
              <h3>Visites</h3>
              <Num>2992</Num>
            </GridCell>
            <GridCell>
              <h3>Recherches</h3>
              <Num>15368</Num>
            </GridCell>
            <GridCell>
              <h3>Consultations</h3>
              <Num>30736</Num>
            </GridCell>
          </Grid>
          <br />
          <br />
          <br />
          <br />
        </Wrapper>
      </Container>
    </Section>
  </PageLayout>
);

const Num = styled.div`
  font-size: 2em;
`;

export default About;
