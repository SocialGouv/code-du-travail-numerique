import React from "react";
import { Container, PageTitle, Section, Wrapper } from "@socialgouv/react-ui";
import { Layout } from "../../src/layout/Layout";
import Metas from "../../src/common/Metas";
import ConventionForm from "../../src/conventions/Search";
import { FocusRoot } from "../../src/a11y";

const SearchConvention = ({ ogImage, pageUrl }) => (
  <Layout currentPage="about">
    <Metas
      url={pageUrl}
      title="Recherche de convention collective"
      description="Recherchez une convention collective par Entreprise, SIRET, Nom ou numéro IDCC."
      image={ogImage}
    />
    <Section>
      <Container narrow>
        <FocusRoot>
          <PageTitle>Recherchez votre convention collective</PageTitle>
        </FocusRoot>
        <Wrapper variant="main">
          <ConventionForm />
        </Wrapper>
      </Container>
    </Section>
  </Layout>
);

export default SearchConvention;
