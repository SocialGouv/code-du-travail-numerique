import { Section } from "@socialgouv/cdtn-ui";
import Script from "next/script";
import React from "react";

import Breadcrumbs from "../../src/common/Breadcrumbs";
import Metas from "../../src/common/Metas";
import { Layout } from "../../src/layout/Layout";
import { integrationData, IntegrationContainer } from "../../src/integration";

const IntegrationPage = ({ slug }): JSX.Element => {
  const {
    description,
    metaDescription,
    metaTitle,
    title,
    url,
    id,
  } = integrationData[slug];
  return (
    <Layout>
      <Metas title={metaTitle} description={metaDescription} />
      <Section>
        <Script src="/widget.js" defer></Script>
        <Breadcrumbs items={[{ label: "Integration", slug: "/integration" }]} />
        <IntegrationContainer
          id={id}
          description={description}
          title={title}
          url={url}
        ></IntegrationContainer>
      </Section>
    </Layout>
  );
};

export const getServerSideProps = async ({ query }) => {
  const slug: string = query.slug;
  return {
    props: {
      slug,
    },
  };
};

export default IntegrationPage;
