import tools from "@cdt/data...tools/internals.json";
import { Container, Section, Wrapper } from "@soocialgouv/cdtn-ui";
import React, { useEffect } from "react";

import Metas from "../../src/common/Metas";
import { Layout } from "../../src/layout/Layout";
import { DureePreavisDemission } from "../../src/outils/DureePreavisDemission";
import { DureePreavisLicenciement } from "../../src/outils/DureePreavisLicenciement";
import { HeuresRechercheEmploi } from "../../src/outils/HeuresRechercheEmploi";
import { CalculateurIndemnite } from "../../src/outils/IndemniteLicenciement";
import { SimulateurIndemnitePrecarite } from "../../src/outils/IndemnitePrecarite";
import { SimulateurEmbauche } from "../../src/outils/SimulateurEmbauche";
import { matopush } from "../../src/piwik";

const toolsBySlug = {
  "heures-recherche-emploi": HeuresRechercheEmploi,
  "indemnite-licenciement": CalculateurIndemnite,
  "indemnite-precarite": SimulateurIndemnitePrecarite,
  "preavis-demission": DureePreavisDemission,
  "preavis-licenciement": DureePreavisLicenciement,
  "simulateur-embauche": SimulateurEmbauche,
};

function Outils({ description, icon, ogImage, pageUrl, slug, title }) {
  const Tool = toolsBySlug[slug];
  useEffect(() => {
    matopush(["trackEvent", "outil", `view_step_${title}`, "start"]);
  });
  return (
    <Layout>
      <Metas
        url={pageUrl}
        title={`${title} - Code du travail numérique - Ministère du travail`}
        description={description}
        image={ogImage}
      />
      <Section>
        <Container>
          <Wrapper variant="main">
            <Tool icon={icon} title={title} />
          </Wrapper>
        </Container>
      </Section>
    </Layout>
  );
}

export default Outils;

Outils.getInitialProps = async ({ query }) => {
  const { slug } = query;
  const { description, icon, title } = tools.find((tool) => tool.slug === slug);

  return {
    description,
    icon,
    slug,
    title,
  };
};
