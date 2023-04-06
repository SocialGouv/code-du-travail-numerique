import { Container, Grid, PageTitle, Section } from "@socialgouv/cdtn-ui";
import React from "react";

import Metas from "../../src/common/Metas";
import { Layout } from "../../src/layout/Layout";
import CallToActionWidget from "../../src/common/tiles/CallToActionWidget";
import { integrationData, IntegrationContainer } from "../../src/integration";

const FindAnswerPage = (): JSX.Element => {
  const keys = Object.keys(integrationData);
  return (
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
            {keys.map((key) => {
              const { shortDescription, shortTitle } = integrationData[key];
              return (
                <CallToActionWidget
                  key={key}
                  title={shortTitle}
                  link={`/integration/${key}`}
                  image={`${key}.png`}
                  description={shortDescription}
                />
              );
            })}
          </Grid>
        </Container>
      </Section>
    </Layout>
  );
};

export default FindAnswerPage;
