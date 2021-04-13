import tools from "@cdt/data...tools/internals.json";
import * as Sentry from "@sentry/browser";
import { Container, Section, theme, Wrapper } from "@socialgouv/cdtn-ui";
import getConfig from "next/config";
import React, { useEffect } from "react";
import styled from "styled-components";

import Metas from "../../src/common/Metas";
import { RelatedItems } from "../../src/common/RelatedItems";
import { Share } from "../../src/common/Share";
import { Layout } from "../../src/layout/Layout";
import { loadPublicodes } from "../../src/outils/api/LoadPublicodes";
import { ToolSurvey } from "../../src/outils/common/ToolSurvey";
import { DureePreavisDemission } from "../../src/outils/DureePreavisDemission";
import { DureePreavisLicenciement } from "../../src/outils/DureePreavisLicenciement";
import { SimulateurPreavisRetraite } from "../../src/outils/DureePreavisRetraite";
import { HeuresRechercheEmploi } from "../../src/outils/HeuresRechercheEmploi";
import { CalculateurIndemnite } from "../../src/outils/IndemniteLicenciement";
import { SimulateurIndemnitePrecarite } from "../../src/outils/IndemnitePrecarite";
import { SimulateurEmbauche } from "../../src/outils/SimulateurEmbauche";
import { matopush } from "../../src/piwik";

const { SOURCES } = require("@socialgouv/cdtn-sources");

const {
  publicRuntimeConfig: { API_URL },
} = getConfig();

const toolsBySlug = {
  "heures-recherche-emploi": HeuresRechercheEmploi,
  "indemnite-licenciement": CalculateurIndemnite,
  "indemnite-precarite": SimulateurIndemnitePrecarite,
  "preavis-demission": DureePreavisDemission,
  "preavis-licenciement": DureePreavisLicenciement,
  "preavis-retraite": SimulateurPreavisRetraite,
  "simulateur-embauche": SimulateurEmbauche,
};

function Outils({ description, icon, slug, relatedItems, title, publicodes }) {
  const Tool = toolsBySlug[slug];
  useEffect(() => {
    matopush(["trackEvent", "outil", `view_step_${title}`, "start"]);
  });
  return (
    <Layout currentPage="">
      <Metas
        title={`${title} - Code du travail numérique - Ministère du travail`}
        description={description}
      />
      <StyledSection>
        <Container>
          <Flex>
            <Wrapper variant="main">
              <Tool icon={icon} title={title} />
            </Wrapper>
            <ShareContainer>
              <Share title={title} metaDescription={description} />
            </ShareContainer>
          </Flex>
          <ToolSurvey />
          <RelatedItems disableSurvey items={relatedItems} />
        </Container>
      </StyledSection>
    </Layout>
  );
}

export default Outils;

Outils.getInitialProps = async ({ query }) => {
  const { slug } = query;
  const { description, icon, title } = tools.find((tool) => tool.slug === slug);
  let relatedItems = [];
  try {
    const response = await fetch(`${API_URL}/items/${SOURCES.TOOLS}/${slug}`);
    if (response.ok) {
      relatedItems = await response.json().then((data) => data.relatedItems);
    }
  } catch (e) {
    console.error(e);
    Sentry.captureException(e);
  }

  const publicodes = loadPublicodes(slug);

  return {
    description,
    icon,
    publicodes,
    relatedItems,
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

const Flex = styled.div`
  display: flex;
  flex-direction: column-reverse;
`;
