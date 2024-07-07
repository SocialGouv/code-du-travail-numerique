import React from "react";

import Metas from "../src/common/Metas";
import { Layout } from "../src/layout-dsf/Layout";
import Accordion from "@codegouvfr/react-dsfr/Accordion";
import { withDsfrWrapper } from "../src/dsfr/AppDsfr";
import { fr } from "@codegouvfr/react-dsfr";

const About = () => {
  return (
    <Layout>
      <Metas
        title="À propos"
        description="Service public gratuit pour faciliter l'accès au droit du travail. Obtenez une réponse détaillée à vos questions."
      />
      <div className={"fr-container"}>
        <div className={"fr-col-md-8 fr-col-sm-10 fr-col-12 fr-pb-md-12v"}>
          <h1 className={fr.cx("fr-mt-3w")}>À propos</h1>

          <h2>Qu’est-ce que le Code du travail numérique&nbsp;?</h2>

          <p>
            Le Code du travail numérique est un service public en ligne et
            gratuit vous permettant d’obtenir des réponses personnalisées sur le
            droit de travail.
          </p>
          <p>
            L’ouverture officielle du site a eu lieu le 1<sup>er</sup> janvier
            2020.
          </p>
          <div className={fr.cx("fr-accordions-group")}>
            <Accordion
              label="Pourquoi le Code du travail numérique&nbsp;?"
              onExpandedChange={function noRefCheck() {}}
              defaultExpanded={true}
              titleAs="h3"
            >
              Blabla 1
            </Accordion>
            <Accordion
              label="Que peut-on trouver sur le site&nbsp;?"
              onExpandedChange={function noRefCheck() {}}
              titleAs="h3"
            >
              Blabla 2
            </Accordion>
            <Accordion
              label="À qui ce service s’adresse-t-il&nbsp;?"
              onExpandedChange={function noRefCheck() {}}
              titleAs="h3"
            >
              Blabla 3
            </Accordion>
          </div>
          <h2 className={fr.cx("fr-mt-2w")}>Qui sommes-nous&nbsp;?</h2>

          <div className={fr.cx("fr-accordions-group")}>
            <Accordion label="Notre équipe">Blabla 1</Accordion>
            <Accordion label="Nos méthodes">Blabla 2</Accordion>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default withDsfrWrapper(About);
