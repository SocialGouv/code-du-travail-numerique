import { Container } from "@socialgouv/cdtn-ui";
import { GetServerSideProps } from "next";
import React from "react";
import styled from "styled-components";
import { useIframeResizer } from "../../src/common/hooks";
import { useRouter } from "next/router";

import { Footer } from "../../src/widgets";

import {
  AgreementSearch,
  CalculateurIndemniteLicenciement,
  CalculateurRuptureConventionnelle,
  DismissalProcess,
  DureePreavisDemission,
  DureePreavisLicenciement,
  DureePreavisRetraite,
  fetchTool,
  SimulateurIndemnitePrecarite,
} from "../../src/outils";
import Metas from "../../src/common/Metas";
import { SITE_URL } from "../../src/config";

const toolsBySlug = {
  "preavis-licenciement": DureePreavisLicenciement,
  "preavis-retraite": DureePreavisRetraite,
  "procedure-licenciement": DismissalProcess,
  "indemnite-licenciement": CalculateurIndemniteLicenciement,
  "indemnite-rupture-conventionnelle": CalculateurRuptureConventionnelle,
  "indemnite-precarite": SimulateurIndemnitePrecarite,
  "convention-collective": AgreementSearch,
  "preavis-demission": DureePreavisDemission,
};
const allowedSlugs = Object.keys(toolsBySlug);

interface Props {
  icon: string;
  slug: string;
  title: string;
  displayTitle: string;
  metaTitle: string;
  metaDescription: string;
}

function Widgets({
  metaTitle,
  metaDescription,
  icon,
  slug,
  title,
  displayTitle,
}: Props): JSX.Element {
  useIframeResizer();
  const Tool = toolsBySlug[slug];
  const router = useRouter();

  return (
    <>
      <Metas
        title={metaTitle}
        description={metaDescription}
        overrideCanonical={`${SITE_URL}/outils/${slug}`}
      />
      <StyledContainer>
        <Tool
          icon={icon}
          title={title}
          displayTitle={displayTitle}
          slug={slug}
          widgetMode
          {...router.query}
        />
        <Footer />
      </StyledContainer>
    </>
  );
}

export default Widgets;

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const slug = query.slug as string;

  if (!allowedSlugs.includes(slug)) {
    return {
      notFound: true,
    };
  }

  const tool = await fetchTool(slug);
  if (!tool) {
    return {
      notFound: true,
    };
  }

  const { icon, title, displayTitle, metaDescription, metaTitle } = tool;

  return {
    props: {
      icon,
      slug,
      title,
      displayTitle,
      metaDescription,
      metaTitle,
    },
  };
};

const StyledContainer = styled(Container)`
  padding: 0;

  & > div:before {
    box-shadow: none;
  }
`;
