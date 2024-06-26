import * as Sentry from "@sentry/nextjs";
import { SOURCES } from "@socialgouv/cdtn-utils";
import { Container, theme } from "@socialgouv/cdtn-ui";
import { push as matopush } from "@socialgouv/matomo-next";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import styled from "styled-components";

import { Feedback } from "../../src/common/Feedback";
import Metas from "../../src/common/Metas";
import { RelatedItems } from "../../src/common/RelatedItems";
import { Share } from "../../src/common/Share";
import { SITE_URL } from "../../src/config";
import { Layout } from "../../src/layout/Layout";
import {
  AgreementSearch,
  CalculateurIndemniteLicenciement,
  CalculateurRuptureConventionnelle,
  DismissalProcess,
  DureePreavisDemission,
  DureePreavisLicenciement,
  DureePreavisRetraite,
  fetchTool,
  HeuresRechercheEmploi,
  SimulateurEmbauche,
  SimulateurIndemnitePrecarite,
} from "../../src/outils";

const toolsBySlug = {
  "convention-collective": AgreementSearch,
  "heures-recherche-emploi": HeuresRechercheEmploi,
  "indemnite-licenciement": CalculateurIndemniteLicenciement,
  "indemnite-precarite": SimulateurIndemnitePrecarite,
  "preavis-demission": DureePreavisDemission,
  "preavis-licenciement": DureePreavisLicenciement,
  "preavis-retraite": DureePreavisRetraite,
  "simulateur-embauche": SimulateurEmbauche,
  "procedure-licenciement": DismissalProcess,
  "indemnite-rupture-conventionnelle": CalculateurRuptureConventionnelle,
};

export interface Props {
  description: string;
  icon: string;
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
              slug={slug}
            />
            <ShareContainer>
              <Share title={title} metaDescription={description} />
            </ShareContainer>
          </Flex>
          <RelatedItems items={relatedItems} />
          {router.asPath !== "/outils/indemnite-licenciement" && (
            <Feedback url={router.asPath} />
          )}
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
  if (
    !tool ||
    (process.env.NEXT_PUBLIC_IS_PRODUCTION_DEPLOYMENT && !tool.displayTool) // En production, ne pas afficher les outils en displayTool à false
  ) {
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
    const response = await fetch(
      `${SITE_URL}/api/items/${SOURCES.TOOLS}/${slug}`
    );
    if (response.ok) {
      relatedItems = await response.json().then((data) => data.relatedItems);
    }
  } catch (e) {
    console.error(e);
    Sentry.captureException(e);
  }

  return {
    props: {
      description,
      icon,
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

export const ShareContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: ${spacings.base};
  @media (max-width: ${breakpoints.mobile}) {
    margin-bottom: ${spacings.small};
  }
`;

export const Flex = styled.div`
  display: flex;
  flex-direction: column-reverse;
`;
