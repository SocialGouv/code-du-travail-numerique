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
import { Layout } from "../../../src/layout/Layout";
import { AgreementSearch } from "../../../src/outils";
import { Flex, ShareContainer } from "../[slug]";
import {
  getBySlugTools,
  getBySourceAndSlugItems,
  RelatedItem,
} from "../../../src/api";
import { Tool } from "@socialgouv/cdtn-types";

export interface Props {
  description: string;
  icon: string;
  relatedItems: Array<any>;
  title: string;
  displayTitle: string;
  metaTitle: string;
  metaDescription: string;
}

function Outils({
  description,
  icon,
  relatedItems,
  title,
  metaTitle,
  metaDescription,
  displayTitle,
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
  if (slug !== "convention" && slug !== "entreprise" && slug !== "selection") {
    return {
      notFound: true,
    };
  }
  const tool = await getBySlugTools("convention-collective");
  if (!tool) {
    return {
      notFound: true,
    };
  }

  const { description, icon, title, displayTitle, metaTitle, metaDescription } =
    tool;
  let relatedItems: RelatedItem[] = [];
  try {
    const data = await getBySourceAndSlugItems<Tool>(
      SOURCES.TOOLS,
      "convention-collective"
    );
    if (!data) {
      return {
        notFound: true,
      };
    }
    relatedItems = data.relatedItems;
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
    },
  };
};
