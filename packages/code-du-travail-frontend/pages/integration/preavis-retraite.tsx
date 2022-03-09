import {
  CodeSnippet,
  Container,
  PageTitle,
  Section,
  Wrapper,
} from "@socialgouv/cdtn-ui";
import React from "react";

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
            simulateur « Préavis de départ ou de mise à la retraite » sur votre
            site grâce à un module (widget). Ce module permettra à l’utilisateur
            de calculer la durée de préavis de départ ou de mise à la retraite
            tout en restant sur votre site.
          </p>
          <iframe
            src="/widgets/preavis-de-retraite"
            width="100%"
            height="650px"
            title="Calcul du préavis de retraite - Code du travail numérique"
            style={{ border: "none" }}
          />
          <p>
            Ce module permettra à l’utilisateur de calculer la durée de préavis
            à respecter en cas de départ ou de mise à la retraite. Afin de
            personnaliser le résultat, l’utilisateur pourra, s’il le souhaite,
            renseigner ou rechercher (à partir du nom de l’entreprise) sa
            convention collective.
          </p>
          <h2>Comment faire ?</h2>
          <p>
            Il suffit d’ajouter le code suivant à l’endroit où vous souhaitez
            voir apparaître le module&nbsp;:
          </p>
          <CodeSnippet>
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
          </CodeSnippet>

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
