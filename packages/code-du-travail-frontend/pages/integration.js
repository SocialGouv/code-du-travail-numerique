import React from "react";
import styled from "styled-components";

import {
  Accordion,
  Container,
  PageTitle,
  Section,
  Title,
  Wrapper,
} from "@socialgouv/react-ui";

import { Layout } from "../src/layout/Layout";
import Metas from "../src/common/Metas";
import { FocusRoot } from "../src/a11y";

export default function IntegrationPage({ pageUrl, ogImage }) {
  return (
    <Layout>
      <Metas
        url={pageUrl}
        title="widget - Code du travail numérique"
        description="Intégrer le Code du travail numérique à votre site"
        image={ogImage}
      />

      <Section>
        <Container narrow>
          <FocusRoot>
            <PageTitle>Intégrer le Code du travail numérique</PageTitle>
          </FocusRoot>
          <Wrapper variant="main">
            <p>
              L’équipe du Code du travail numérique propose un module de
              recherche à intégrer dans votre site.
            </p>
            <p>
              Ce module permettra de lancer une recherche depuis votre site et
              d’ouvrir la page de recherche sur le site du Code du travail
              numérique
            </p>
            <p>Pour cela, nous vous proposons 2 methodes.</p>
            <Accordion
              preExpanded={["id-js"]}
              items={[
                {
                  id: "id-js",
                  title: "javascript",
                  body: (
                    <>
                      <Title>Instalation</Title>
                      <p>Ajouter le code suivant dans votre page</p>
                      <Code>
                        <pre style={{ margin: 0, lineHeight: "125%" }}>
                          {`<div id="cdtn-widget"></div>
<script src="https://code.travail.gouv.fr/widget.js" async></script>
`}
                        </pre>
                      </Code>
                    </>
                  ),
                },
                {
                  title: "iframe",
                  body: (
                    <>
                      <Code>
                        <pre>
                          {`<iframe
  src="/widget.html"
  width="100%"
  height="250px"
  title="widget - Code du travail numérique "
  style="border: none"
></iframe>
`}
                        </pre>
                      </Code>
                    </>
                  ),
                },
              ]}
            />
            <p>Ce qui donnera :</p>
            <iframe
              src="/widget.html"
              width="100%"
              height="250px"
              title="widget - Code du travail numérique "
              style={{ border: "none" }}
            ></iframe>
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
