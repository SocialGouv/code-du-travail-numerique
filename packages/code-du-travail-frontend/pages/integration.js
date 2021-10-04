import {
  Accordion,
  Container,
  PageTitle,
  Section,
  Wrapper,
} from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";

import Metas from "../src/common/Metas";
import { Layout } from "../src/layout/Layout";

export default function IntegrationPage() {
  return (
    <Layout>
      <Metas
        title="Widget pour intégrer le Code du travail numérique à votre site"
        description="Intégrez le moteur de recherche du Code du travail numérique sur votre site grâce à un module (widget)."
      />

      <Section>
        <Container narrow>
          <PageTitle>Intégrer le Code du travail numérique</PageTitle>

          <Wrapper variant="main">
            <p>
              L’équipe du Code du travail numérique vous propose d’intégrer son
              moteur de recherche sur votre site grâce à un module (widget).
            </p>
            <iframe
              src="/widget.html"
              width="100%"
              height="300px"
              title="widget - Code du travail numérique "
              style={{ border: "none" }}
            />
            <p>
              Ce module permettra à l’utilisateur de faire une recherche depuis
              votre site dans la barre de recherche du module. Une fois la
              recherche lancée, cela ouvrira la page de recherche sur le site du
              Code du travail numérique.
            </p>
            <p>
              Comment faire ? Nous vous proposons deux méthodes pour intégrer ce
              module à votre site :
            </p>
            <Accordion
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
                      <Code>
                        <pre style={{ lineHeight: "125%", margin: 0 }}>
                          {`<script src="https://code.travail.gouv.fr/widget.js"></script>`}
                        </pre>
                      </Code>
                      <p>
                        Ensuite, intégrez le code suivant à l’endroit où vous
                        souhaitez voir le module s’afficher&nbsp;:
                      </p>
                      <Code>
                        <pre style={{ lineHeight: "125%", margin: 0 }}>
                          {`<div id="cdtn-widget">
  <a href="https://code.travail.gouv.fr" class="cdtn-homelink">le Code du travail numérique - Obtenez les réponses à vos questions sur le droit du travail.</a>
</div>`}
                        </pre>
                      </Code>
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
                      <Code>
                        <pre>
                          {`<iframe
  src="https://code.travail.gouv.fr/widget.html"
  width="100%"
  height="300px"
  title="widget - Code du travail numérique "
  style="border: none"
></iframe>
`}
                        </pre>
                      </Code>
                      <p>
                        En revanche, c’est à vous de décider de la hauteur que
                        prendra le module. Vous pouvez spécifier la valeur{" "}
                        <code>height</code> qui vous convient le mieux en
                        fonction de la largeur de la balise parente.
                        <br />
                        Par exemple, une hauteur de <code>210px</code> est
                        suffisante si la largeur de la balise parente n’excède
                        pas <code>300px</code>, mais sera trop petite si la
                        largeur dépasse cette valeur.
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
}

const Code = styled.div`
  width: auto;
  padding: 0.2em 0.6em;
  overflow: auto;
  background: #ffffff;
  border: solid gray;
  border-width: 0.1em 0.1em 0.1em 0.8em;
`;
