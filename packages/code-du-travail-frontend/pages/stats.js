import React from "react";
import styled from "styled-components";
import Head from "next/head";
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
          <StyledFlatList>
            <Li>
              <Heading>Contenus référencés</Heading>
              <Num>14369</Num>
            </Li>
            <Li>
              <Heading>Visites</Heading>
              <Num>2992</Num>
            </Li>
            <Li>
              <Heading>Recherches</Heading>
              <Num>15368</Num>
            </Li>
            <Li>
              <Heading>Consultations</Heading>
              <Num>30736</Num>
            </Li>
          </StyledFlatList>
          <p>Statistiques d’usage depuis le 1er Janvier 2019</p>
        </Wrapper>
      </Container>
    </Section>
  </Layout>
);

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

export default About;
