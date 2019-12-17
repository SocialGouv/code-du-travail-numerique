import React from "react";
import tools from "@cdt/data...tools";
import { Badge, Container, Section, Wrapper } from "@socialgouv/react-ui";

import { Layout } from "../../src/layout/Layout";
import Metas from "../../src/common/Metas";

import { CalculateurIndemnite } from "../../src/outils/IndemniteLicenciement";
import { DureePreavisLicenciement } from "../../src/outils/DureePreavisLicenciement";
import { SimulateurEmbauche } from "../../src/outils/SimulateurEmbauche";
import { SimulateurIndemnitePrecarite } from "../../src/outils/IndemnitePrecarite";
import { DureePreavisDemission } from "../../src/outils/DureePreavisDemission";

const toolsBySlug = {
  "indemnite-licenciement": CalculateurIndemnite,
  "preavis-licenciement": DureePreavisLicenciement,
  "simulateur-embauche": SimulateurEmbauche,
  "indemnite-precarite": SimulateurIndemnitePrecarite,
  "preavis-demission": DureePreavisDemission
};

function Outils({ description, icon, ogImage, pageUrl, slug, title }) {
  const Tool = toolsBySlug[slug];
  return (
    <Layout>
      <Metas
        url={pageUrl}
        title={title}
        description={description}
        image={ogImage}
      />
      <Section>
        <Container>
          <Wrapper variant="main">
            <Badge />
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
  const { description, icon, title } = tools.find(tool => tool.slug === slug);
  return {
    description,
    icon,
    slug,
    title
  };
};
