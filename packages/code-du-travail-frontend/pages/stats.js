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
  theme,
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
        <PageTitle>Statistiques du code du travail numérique</PageTitle>
        <Wrapper variant="main">
          <Grid>
            <StyledGridCell>
              <Heading>Contenus référencés</Heading>
              <Num>14369</Num>
            </StyledGridCell>
            <StyledGridCell>
              <Heading>Visites</Heading>
              <Num>2992</Num>
            </StyledGridCell>
            <StyledGridCell>
              <Heading>Recherches</Heading>
              <Num>15368</Num>
            </StyledGridCell>
            <StyledGridCell>
              <Heading>Consultations</Heading>
              <Num>30736</Num>
            </StyledGridCell>
          </Grid>
          <p>Statistiques d’usage depuis le 1er Janvier 2019</p>
        </Wrapper>
      </Container>
    </Section>
  </Layout>
);

const { fonts } = theme;

const StyledGridCell = styled(GridCell)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Num = styled.div`
  font-size: ${fonts.sizes.headings.small};
`;

export default About;
