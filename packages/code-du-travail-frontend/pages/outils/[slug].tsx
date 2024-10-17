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
import { Layout } from "../../src/layout/Layout";
import {
  AgreementSearch,
  CalculateurIndemniteLicenciement,
  CalculateurRuptureConventionnelle,
  DismissalProcess,
  DureePreavisDemission,
  DureePreavisLicenciement,
  HeuresRechercheEmploi,
  SimulateurIndemnitePrecarite,
  CalculateurPreavisRetraite,
} from "../../src/outils";
import {
  getBySlugTools,
  getBySourceAndSlugItems,
  RelatedItem,
} from "../../src/api";
import { Tool } from "@socialgouv/cdtn-types";

const toolsBySlug = {
  "convention-collective": AgreementSearch,
  "heures-recherche-emploi": HeuresRechercheEmploi,
  "indemnite-licenciement": CalculateurIndemniteLicenciement,
  "indemnite-precarite": SimulateurIndemnitePrecarite,
  "preavis-demission": DureePreavisDemission,
  "preavis-licenciement": DureePreavisLicenciement,
  "preavis-retraite": CalculateurPreavisRetraite,
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
          {router.asPath !== "/outils/indemnite-licenciement" &&
            router.asPath !== "/outils/indemnite-rupture-conventionnelle" && (
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
  const tool = await getBySlugTools(query.slug as string);

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
  const data = await getBySourceAndSlugItems<Tool>(SOURCES.TOOLS, slug);
  const relatedItems = filterRelatedItems(slug, data?.relatedItems ?? []);

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

/**
 * Hack pour éviter que les deux outils ne se référencent pour améliorer la recherche sur Google
 */
const filterRelatedItems = (
  slug: string,
  relatedItems: RelatedItem[]
): RelatedItem[] =>
  slug !== "indemnite-licenciement" &&
  slug !== "indemnite-rupture-conventionnelle"
    ? relatedItems
    : relatedItems?.filter(
        (item) =>
          item.slug !== "indemnite-rupture-conventionnelle" &&
          item.slug !== "indemnite-licenciement"
      );

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
