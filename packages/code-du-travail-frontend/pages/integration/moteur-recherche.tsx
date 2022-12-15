import {
  Accordion,
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

const FindAnswerPage = (): JSX.Element => (
  <Layout>
    <Metas
      title="Intégrez le moteur de recherche du Code du travail numérique"
      description="Intégrez le moteur de recherche du Code du travail numérique sur votre site grâce à un module (widget)."
    />

    <Section>
      <Breadcrumbs items={[{ label: "Integration", slug: "/integration" }]} />
      <Container narrow>
        <PageTitle>
          Intégrer le moteur de recherche
          du&nbsp;Code&nbsp;du&nbsp;travail&nbsp;numérique
        </PageTitle>

        <Wrapper variant="main">
          <p>
            Vous pouvez intégrer le moteur de recherche du Code du travail
            numérique sur votre site grâce à un module (widget). Ce module
            permettra à l’utilisateur de faire une recherche depuis votre site
            dans la barre de recherche du module. Une fois la recherche lancée,
            cela ouvrira la page de recherche sur le site du Code du travail
            numérique.
          </p>
          <iframe
            src="/widget.html"
            width="100%"
            height="300px"
            title="widget - Code du travail numérique "
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
                      {`<script src="https://code.travail.gouv.fr/widget.js" defer></script>`}
                    </CodeSnippet>
                    <p>
                      Ensuite, intégrez le code suivant à l’endroit où vous
                      souhaitez voir le module s’afficher&nbsp;:
                    </p>
                    <CodeSnippet>{`<div id="cdtn-widget"></div>`}</CodeSnippet>
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
  src="https://code.travail.gouv.fr/widget.html"
  width="100%"
  height="300px"
  title="widget - Code du travail numérique "
  style="border: none"
></iframe>
`}
                    </CodeSnippet>
                    <p>
                      En revanche, c’est à vous de décider de la hauteur que
                      prendra le module. Vous pouvez spécifier la valeur{" "}
                      <code>height</code> qui vous convient le mieux en fonction
                      de la largeur de la balise parente.
                      <br />
                      Par exemple, une hauteur de <code>210px</code> est
                      suffisante si la largeur de la balise parente n’excède pas{" "}
                      <code>300px</code>, mais sera trop petite si la largeur
                      dépasse cette valeur.
                    </p>
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

export default FindAnswerPage;
