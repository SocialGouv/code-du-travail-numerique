import * as Sentry from "@sentry/nextjs";
import { SOURCES } from "@socialgouv/cdtn-utils";
import { Container } from "@socialgouv/cdtn-ui";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";

import { Feedback } from "../../../src/common/Feedback";
import Metas from "../../../src/common/Metas";
import { RelatedItems } from "../../../src/common/RelatedItems";
import { Share } from "../../../src/common/Share";
import { SITE_URL } from "../../../src/config";
import { Layout } from "../../../src/layout/Layout";
import { AgreementSearch, fetchTool } from "../../../src/outils";
import { ScreenType } from "../../../src/outils/ConventionCollective/common/NavContext";
import { Flex, ShareContainer } from "../[slug]";

export interface Props {
  description: string;
  icon: string;
  relatedItems: Array<any>;
  title: string;
  displayTitle: string;
  metaTitle: string;
  metaDescription: string;
  screenType: ScreenType;
}

function Outils({
  description,
  icon,
  relatedItems,
  title,
  metaTitle,
  metaDescription,
  displayTitle,
  screenType,
}: Props): JSX.Element {
  const router = useRouter();
  return (
    <Layout>
      <Metas title={metaTitle} description={metaDescription} />
      <Container>
        <Flex>
          <AgreementSearch
            icon={icon}
            title={title}
            displayTitle={displayTitle}
            screenType={screenType}
          />

          <ShareContainer>
            <Share title={title} metaDescription={description} />
          </ShareContainer>
        </Flex>
        <RelatedItems items={relatedItems} />
        <Feedback url={router.asPath} />
      </Container>
    </Layout>
  );
}

export default Outils;

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const slug = query.slug as string;
  if (slug !== "convention" && slug !== "entreprise") {
    return {
      notFound: true,
    };
  }
  const tool = await fetchTool("convention-collective");
  if (!tool) {
    return {
      notFound: true,
    };
  }

  const { description, icon, title, displayTitle, metaTitle, metaDescription } =
    tool;
  let relatedItems = [];
  try {
    const response = await fetch(
      `${SITE_URL}/api/items/${SOURCES.TOOLS}/convention-collective`
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
      title,
      displayTitle,
      metaTitle,
      metaDescription,
      screenType:
        slug === "convention" ? ScreenType.agreement : ScreenType.enterprise,
    },
  };
};
