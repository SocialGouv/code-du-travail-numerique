import { Container, PageTitle, Section, Wrapper } from "@soocialgouv/cdtn-ui";
import React from "react";

import { FocusRoot } from "../../src/a11y";
import Metas from "../../src/common/Metas";
import ConventionForm from "../../src/conventions/Search";
import { Layout } from "../../src/layout/Layout";

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
