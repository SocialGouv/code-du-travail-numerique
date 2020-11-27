import tools from "@cdt/data...tools/internals.json";
import { Container, Section, theme, Wrapper } from "@socialgouv/cdtn-ui";
import React, { useEffect } from "react";
import styled from "styled-components";

import Metas from "../../src/common/Metas";
import { Share } from "../../src/common/Share";
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

function Outils({ description, icon, slug, title }) {
  const Tool = toolsBySlug[slug];
  useEffect(() => {
    matopush(["trackEvent", "outil", `view_step_${title}`, "start"]);
  });
  return (
    <Layout>
      <Metas
        title={`${title} - Code du travail numérique - Ministère du travail`}
        description={description}
      />
      <StyledSection>
        <Container>
          <ShareContainer>
            <Share title={title} metaDescription={description} />
          </ShareContainer>
          <Wrapper variant="main">
            <Tool icon={icon} title={title} />
          </Wrapper>
        </Container>
      </StyledSection>
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

const { breakpoints, spacings } = theme;

const StyledSection = styled(Section)`
  padding-top: 0;
`;

const ShareContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: ${spacings.base};
  @media (max-width: ${breakpoints.mobile}) {
    margin-bottom: ${spacings.small};
  }
`;
