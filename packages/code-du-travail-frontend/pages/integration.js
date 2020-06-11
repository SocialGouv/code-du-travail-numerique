import React from "react";
import styled from "styled-components";

import {
  Accordion,
  Container,
  PageTitle,
  Section,
  Wrapper,
} from "@socialgouv/react-ui";

import { Layout } from "../src/layout/Layout";
import Metas from "../src/common/Metas";
import { FocusRoot } from "../src/a11y";

export default function IntegrationPage() {
  return (
    <Layout>
      <Metas
        description="Intégrer le Code du travail numérique à votre site"
        pathname="/integration"
        title="widget - Code du travail numérique"
      />

      <Section>
        <Container narrow>
          <FocusRoot>
            <PageTitle>Intégrer le Code du travail numérique</PageTitle>
          </FocusRoot>
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
            ></iframe>
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
                  id: "id-js",
                  title: "javascript",
                  body: (
                    <>
                      <p>
                        L’installation se passe en deux temps.
                        <br />
                        Premièrement, ajoutez le code suivant dans la balise{" "}
                        <code>&lt;body&gt;</code> de votre page&nbsp;:
                      </p>
                      <Code>
                        <pre style={{ margin: 0, lineHeight: "125%" }}>
                          {`<script src="https://code.travail.gouv.fr/widget.js" async></script>`}
                        </pre>
                      </Code>
                      <p>
                        Ensuite, intégrez le code suivant à l’endroit où vous
                        souhaitez voir le module s’afficher&nbsp;:
                      </p>
                      <Code>
                        <pre style={{ margin: 0, lineHeight: "125%" }}>
                          {`<div id="cdtn-widget"></div>`}
                        </pre>
                      </Code>
                    </>
                  ),
                },
                {
                  title: "iframe",
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
                },
              ]}
            />

            <p>
              En cas de difficulté, nous vous invitons à ouvrir un{" "}
              <a href="https://github.com/SocialGouv/code-du-travail-numerique/issues/new">
                ticket d’erreur
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
