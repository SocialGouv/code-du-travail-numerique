import * as Sentry from "@sentry/nextjs";
import { SOURCES } from "@socialgouv/cdtn-sources";
import { Container, Section, theme } from "@socialgouv/cdtn-ui";
import { push as matopush } from "@socialgouv/matomo-next";
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
import {
  AgreementSearch,
  CalculateurIndemnite,
  DureePreavisDemission,
  DureePreavisLicenciement,
  DureePreavisRetraite,
  HeuresRechercheEmploi,
  loadPublicodesRules,
  SimulateurEmbauche,
  SimulateurIndemnitePrecarite,
  DismissalProcess,
  fetchTool,
} from "../../src/outils";

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
  "preavis-retraite": DureePreavisRetraite,
  "simulateur-embauche": SimulateurEmbauche,
  "procedure-licenciement": DismissalProcess,
};

export interface Props {
  description: string;
  icon: string;
  publicodesRules: any;
  relatedItems: Array<any>;
  slug: string;
  title: string;
  displayTitle: string;
  metaTitle: string;
  metaDescription: string;
}

function Outils({
  description,
  icon,
  slug,
  relatedItems,
  title,
  metaTitle,
  metaDescription,
  displayTitle,
  publicodesRules,
}: Props): JSX.Element {
  const Tool = toolsBySlug[slug];
  useEffect(() => {
    matopush(["trackEvent", "outil", `view_step_${title}`, "start"]);
  }, [title]);
  const router = useRouter();
  return (
    <Layout>
      <Metas title={metaTitle} description={metaDescription} />
      <div>
        <Container>
          <Flex>
            <Tool
              icon={icon}
              title={title}
              displayTitle={displayTitle}
              publicodesRules={publicodesRules}
            />
            <ShareContainer>
              <Share title={title} metaDescription={description} />
            </ShareContainer>
          </Flex>
          <RelatedItems items={relatedItems} />
          <Feedback url={router.asPath} />
        </Container>
      </div>
    </Layout>
  );
}

export default Outils;

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const tool = await fetchTool(query.slug as string);
  if (!tool) {
    return {
      notFound: true,
    };
  }

  const {
    slug,
    description,
    icon,
    title,
    displayTitle,
    metaTitle,
    metaDescription,
  } = tool;
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

  const publicodesRules = loadPublicodesRules(slug);

  return {
    props: {
      description,
      icon,
      publicodesRules,
      relatedItems,
      slug,
      title,
      displayTitle,
      metaTitle,
      metaDescription,
    },
  };
};

const { breakpoints, spacings } = theme;

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
