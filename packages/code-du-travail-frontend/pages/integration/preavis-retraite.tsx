import {
  CodeSnippet,
  Container,
  PageTitle,
  Section,
  Wrapper,
} from "@socialgouv/cdtn-ui";
import React from "react";

import Breadcrumbs from "../../src/common/Breadcrumbs";
import Metas from "../../src/common/Metas";
import { Layout } from "../../src/layout/Layout";

const PreavisRetraitePage = (): JSX.Element => (
  <Layout>
    <Metas
      title="Widget pour intégrer le Code du travail numérique à votre site"
      description="Intégrez l’outil de calcul du préavis de retraite du Code du travail numérique sur votre site grâce à un module (widget)."
    />

    <Section>
      <Container>
        <Breadcrumbs items={[{ label: "Integration", slug: "/integration" }]} />
        <Container narrow>
          <PageTitle>
            Intégrer l’outil de calcul du préavis de retraite
            du&nbsp;Code&nbsp;du&nbsp;travail&nbsp;numérique
          </PageTitle>
        </Container>
        <Wrapper variant="main">
          <p>
            Vous pouvez intégrer l’outil de calcul du préavis de retraite du
            Code du travail numérique sur votre site grâce à un module (widget).
            Ce module permettra à l’utilisateur de calculer la durée de préavis
            à respecter en cas de départ ou de mise à la retraite. Afin de
            personnaliser le résultat, l’utilisateur pourra, s’il le souhaite,
            renseigner ou rechercher (à partir du nom de l’entreprise) sa
            convention collective.
          </p>
          <iframe
            src="/widgets/preavis-retraite"
            width="100%"
            height="700px"
            title="Calcul du préavis de retraite - Code du travail numérique"
            style={{ border: "none" }}
          />
          <p>Comment intégrer ce module à votre site ?</p>

          <p>
            Avec l’iframe, il suffit d’ajouter le code suivant à l’endroit où
            vous souhaitez voir apparaître le module&nbsp;:
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
