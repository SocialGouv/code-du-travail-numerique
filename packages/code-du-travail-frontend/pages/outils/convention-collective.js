import {
  Container,
  PageTitle,
  Section,
  theme,
  Wrapper,
} from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";

import Metas from "../../src/common/Metas";
import { Share } from "../../src/common/Share";
import ConventionForm from "../../src/conventions/Search";
import { Layout } from "../../src/layout/Layout";

const title = "Recherche de convention collective";
const description =
  "Recherchez une convention collective par Entreprise, SIRET, Nom ou numéro IDCC.";

const SearchConvention = () => (
  <Layout currentPage="about">
    <Metas title={title} description={description} />
    <Section>
      <Container narrow>
        <PageTitle>Recherchez votre convention collective</PageTitle>
        <Wrapper variant="main">
          <ConventionForm />
        </Wrapper>
        <ShareContainer>
          Partager cette page&nbsp;:&nbsp;
          <Share title={title} metaDescription={description} />
        </ShareContainer>
      </Container>
    </Section>
  </Layout>
);

export default SearchConvention;

const { spacings } = theme;

const ShareContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: ${spacings.medium};
  font-weight: bold;
  @media print {
    display: none;
  }
`;
