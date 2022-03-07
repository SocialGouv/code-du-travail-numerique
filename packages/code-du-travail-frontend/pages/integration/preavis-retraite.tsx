import { Container, PageTitle, Section, Wrapper } from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";

import Metas from "../../src/common/Metas";
import { Layout } from "../../src/layout/Layout";

const PreavisRetraitePage = (): JSX.Element => (
  <Layout>
    <Metas
      title="Widget pour intégrer le Code du travail numérique à votre site"
      description="Intégrez le moteur de recherche du Code du travail numérique sur votre site grâce à un module (widget)."
    />

    <Section>
      <Container>
        <PageTitle>
          Intégrer l’outil de préavis de retraite Code du travail numérique
        </PageTitle>

        <Wrapper variant="main">
          <p>
            L’équipe du Code du travail numérique vous propose d’intégrer son
            outil de calcul du préavis de retraite sur votre site grâce à un
            module (widget).
          </p>
          <iframe
            src="/widgets/preavis-de-retraite"
            width="100%"
            height="750px"
            title="Calcul du préavis de retraite - Code du travail numérique"
            style={{ border: "none" }}
          />
          <p>Plus de texte ici ?</p>
          <h3>Comment faire ?</h3>

          <>
            <p>
              Il suffit d’ajouter le code suivant à l’endroit où vous souhaitez
              voir apparaître le module&nbsp;:
            </p>
            <Code>
              <pre>
                {`<iframe
  src="https://code.travail.gouv.fr/widgets/preavis-de-retraite"
  width="100%"
  height="750px"
  title="Calcul du préavis de retraite - Code du travail numérique"
  style="border: none"
></iframe>
`}
              </pre>
            </Code>
          </>

          <p>
            En cas de difficulté, nous vous invitons à nous contacter à
            l’adresse suivante&nbsp;:{" "}
            <a href="mailto:codedutravailnumerique@travail.gouv.fr">
              codedutravailnumerique@travail.gouv.fr
            </a>
          </p>
        </Wrapper>
      </Container>
    </Section>
  </Layout>
);

export default PreavisRetraitePage;

const Code = styled.div`
  width: auto;
  padding: 0.2em 0.6em;
  overflow: auto;
  background: #ffffff;
  border: solid gray;
  border-width: 0.1em 0.1em 0.1em 0.8em;
`;
