import {
  Accordion,
  CodeSnippet,
  Container,
  PageTitle,
  Section,
  theme,
  Wrapper,
} from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";

import Breadcrumbs from "../../src/common/Breadcrumbs";
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
        <Breadcrumbs items={[{ label: "Integration", slug: "/integration" }]} />
        <PageTitle>
          Intégrer l’outil de préavis de retraite du Code du travail numérique
        </PageTitle>
        <NarrowParagraph>
          Intégrez notre simulateur « Préavis de départ ou de mise à la retraite
          » sur votre site grâce à un module (widget). Ce module permettra à
          l’utilisateur de calculer la durée de préavis à respecter en cas de
          départ ou de mise à la retraite. Afin de personnaliser le résultat,
          l’utilisateur pourra, s’il le souhaite, renseigner ou rechercher (à
          partir du nom de l’entreprise) sa convention collective.
        </NarrowParagraph>
        <Wrapper variant="main">
          <iframe
            src="/widgets/preavis-retraite"
            width="100%"
            height="650px"
            title="Calcul du préavis de retraite - Code du travail numérique"
            style={{ border: "none" }}
          />
          <p>
            Comment faire ? Nous vous proposons deux méthodes pour intégrer ce
            module à votre site :
          </p>
          <Accordion
            titleLevel={2}
            preExpanded={["id-js"]}
            items={[
              {
                body: (
                  <>
                    <p>
                      L’installation se passe en deux temps.
                      <br />
                      Premièrement, ajoutez le code suivant dans la balise{" "}
                      <code>&lt;body&gt;</code> de votre page&nbsp;:
                    </p>
                    <CodeSnippet>
                      {`<script src="https://code.travail.gouv.fr/widgets/widget-preavis-retraite.js" defer></script>`}
                    </CodeSnippet>
                    <p>
                      Ensuite, intégrez le code suivant à l’endroit où vous
                      souhaitez voir le module s’afficher&nbsp;:
                    </p>
                    <CodeSnippet>
                      {`<div id="cdtn-widget-preavis-retraite">
  <a href="https://code.travail.gouv.fr">Le Code du travail numérique - Obtenez les réponses à vos questions sur le droit du travail.</a>
</div>`}
                    </CodeSnippet>
                  </>
                ),
                id: "id-js",
                title: "javascript",
              },
              {
                body: (
                  <>
                    <p>
                      Avec l’iframe, il suffit d’ajouter le code suivant à
                      l’endroit où vous souhaitez voir apparaître le
                      module&nbsp;:
                    </p>
                    <CodeSnippet>
                      {`<iframe
  src="https://code.travail.gouv.fr/widgets/preavis-retraite"
  width="100%"
  height="650px"
  title="Calcul du préavis de retraite - Code du travail numérique"
  style="border: none"
></iframe>
`}
                    </CodeSnippet>
                  </>
                ),
                title: "iframe",
              },
            ]}
          />

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

const NarrowParagraph = styled.p`
  margin: 0 auto ${theme.spacings.larger};
  text-align: center;
  @media (min-width: ${theme.breakpoints.mobile}) {
    width: 70%;
  }
`;
