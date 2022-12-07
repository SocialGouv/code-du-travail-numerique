import { Container, Grid, PageTitle, Section } from "@socialgouv/cdtn-ui";
import React from "react";

import Metas from "../../src/common/Metas";
import { Layout } from "../../src/layout/Layout";
import CallToActionWidget from "../../src/common/tiles/CallToActionWidget";

const FindAnswerPage = (): JSX.Element => (
  <Layout>
    <Metas
      title="Widgets pour intégrer le Code du travail numérique à votre site"
      description="L’équipe du Code du travail numérique vous propose d’intégrer son moteur de recherche et certains de ses simulateurs sur votre site grâce à un module (widget)."
    />

    <Section>
      <Container>
        <Container narrow>
          <PageTitle>
            Intégrer les outils du Code&nbsp;du&nbsp;travail&nbsp;numérique
          </PageTitle>
        </Container>
        <p>
          L’équipe du Code du travail numérique vous propose d’intégrer son
          moteur de recherche et certains de ses simulateurs sur votre site
          grâce à un module (widget).
        </p>
        <Grid columns="2">
          <CallToActionWidget
            title="Moteur de recherche du Code du travail numérique"
            link="/integration/moteur-recherche"
            image="moteur-recherche.png"
            description="Effectuer une recherche depuis votre site sur le Code du travail numérique"
          />
          <CallToActionWidget
            title="Préavis de départ ou mise à la retraite"
            link="/integration/preavis-retraite"
            image="preavis-retraite.png"
            description="Calculer la durée de préavis à respecter en cas de départ à la retraite ou de mise à la retraite"
          />
          <CallToActionWidget
            title="Préavis de licenciement"
            link="/integration/preavis-licenciement"
            image="preavis-licenciement.png"
            description="Calculer la durée de préavis à respecter en cas de licenciement"
          />
        </Grid>
      </Container>
    </Section>
  </Layout>
);

export default FindAnswerPage;
