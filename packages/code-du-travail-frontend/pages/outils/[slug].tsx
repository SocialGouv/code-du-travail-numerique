import tools from "@cdt/data...tools/internals.json";
import * as Sentry from "@sentry/nextjs";
import { SOURCES } from "@socialgouv/cdtn-sources";
import { Container, Section, theme } from "@socialgouv/cdtn-ui";
import { GetServerSideProps } from "next";
import getConfig from "next/config";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import styled from "styled-components";

import { Feedback } from "../../src/common/Feedback";
import Metas from "../../src/common/Metas";
import { RelatedItems } from "../../src/common/RelatedItems";
import { Share } from "../../src/common/Share";
import { Layout } from "../../src/layout/Layout";
import { createError } from "../../src/lib";
import EventTracker from "../../src/lib/tracking/EventTracker";
import { loadPublicodes } from "../../src/outils/api/LoadPublicodes";
import { AgreementSearch } from "../../src/outils/ConventionCollective";
import { DureePreavisDemission } from "../../src/outils/DureePreavisDemission";
import { DureePreavisLicenciement } from "../../src/outils/DureePreavisLicenciement";
import { SimulateurPreavisRetraite } from "../../src/outils/DureePreavisRetraite";
import { HeuresRechercheEmploi } from "../../src/outils/HeuresRechercheEmploi";
import { CalculateurIndemnite } from "../../src/outils/IndemniteLicenciement";
import { SimulateurIndemnitePrecarite } from "../../src/outils/IndemnitePrecarite";
import { SimulateurEmbauche } from "../../src/outils/SimulateurEmbauche";
import { matopush } from "../../src/piwik";

const {
  publicRuntimeConfig: { API_URL },
} = getConfig();

const toolsBySlug = {
  "convention-collective": AgreementSearch,
  "heures-recherche-emploi": HeuresRechercheEmploi,
  "indemnite-licenciement": CalculateurIndemnite,
  "indemnite-precarite": SimulateurIndemnitePrecarite,
  "preavis-demission": DureePreavisDemission,
  "preavis-licenciement": DureePreavisLicenciement,
  "preavis-retraite": SimulateurPreavisRetraite,
  "simulateur-embauche": SimulateurEmbauche,
};

interface Props {
  description: string;
  icon: string;
  publicodesRules: any;
  relatedItems: Array<any>;
  slug: string;
  title: string;
}

function Outils({
  description,
  icon,
  slug,
  relatedItems,
  title,
  publicodesRules,
}: Props): JSX.Element {
  const Tool = toolsBySlug[slug];
  useEffect(() => {
    matopush(["trackEvent", "outil", `view_step_${title}`, "start"]);
  }, [title]);
  const router = useRouter();
  return (
    <Layout>
      <Metas title={title} description={description} />
      <StyledSection>
        <Container>
          <Flex>
            <Tool icon={icon} title={title} publicodesRules={publicodesRules} />
            <ShareContainer>
              <Share title={title} metaDescription={description} />
            </ShareContainer>
          </Flex>
          <RelatedItems items={relatedItems} />
          <Feedback url={router.asPath} />
        </Container>
      </StyledSection>
      <EventTracker />
    </Layout>
  );
}

export default Outils;

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const { slug, description, icon, title } = tools.find(
    (tool) => tool.slug === query.slug
  );
  let relatedItems = [];
  try {
    const response = await fetch(`${API_URL}/items/${SOURCES.TOOLS}/${slug}`);
    if (response.ok) {
      relatedItems = await response.json().then((data) => data.relatedItems);
    }
  } catch (e) {
    console.error(e);
    Sentry.captureException(createError(e));
  }

  const publicodesRules = loadPublicodes(slug);

  return {
    props: {
      description,
      icon,
      publicodesRules,
      relatedItems,
      slug,
      title,
    },
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
