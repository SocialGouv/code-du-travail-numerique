import React, { useEffect } from "react";
import tools from "@cdt/data...tools/internals.json";
import { Container, Section, Wrapper } from "@socialgouv/react-ui";

import { Layout } from "../../src/layout/Layout";
import { matopush } from "../../src/piwik";
import Metas from "../../src/common/Metas";

import { CalculateurIndemnite } from "../../src/outils/IndemniteLicenciement";
import { DureePreavisLicenciement } from "../../src/outils/DureePreavisLicenciement";
import { SimulateurEmbauche } from "../../src/outils/SimulateurEmbauche";
import { SimulateurIndemnitePrecarite } from "../../src/outils/IndemnitePrecarite";
import { DureePreavisDemission } from "../../src/outils/DureePreavisDemission";
import { HeuresRechercheEmploi } from "../../src/outils/HeuresRechercheEmploi";

const toolsBySlug = {
  "indemnite-licenciement": CalculateurIndemnite,
  "preavis-licenciement": DureePreavisLicenciement,
  "simulateur-embauche": SimulateurEmbauche,
  "indemnite-precarite": SimulateurIndemnitePrecarite,
  "preavis-demission": DureePreavisDemission,
  "heures-recherche-emploi": HeuresRechercheEmploi,
};

export async function getServerSideProps({ query: { slug } }) {
  const { description, icon, title } = tools.find((tool) => tool.slug === slug);
  return {
    props: {
      description,
      icon,
      slug,
      title,
    },
  };
}

const Outils = ({ description, icon, slug, title }) => {
  const Tool = toolsBySlug[slug];
  useEffect(() => {
    matopush(["trackEvent", "outil", `view_step_${title}`, "start"]);
  });
  return (
    <Layout>
      <Metas
        description={description}
        pathname={`/outils/${slug}`}
        title={title}
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
};

export default Outils;
