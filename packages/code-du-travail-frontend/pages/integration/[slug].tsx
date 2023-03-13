import { Section } from "@socialgouv/cdtn-ui";
import React from "react";

import Breadcrumbs from "../../src/common/Breadcrumbs";
import Metas from "../../src/common/Metas";
import { Layout } from "../../src/layout/Layout";
import { integrationData, IntegrationContainer } from "../../src/integration";

const IntegrationPage = ({ slug, hostname, protocol }): JSX.Element => {
  const {
    description,
    metaDescription,
    metaTitle,
    title,
    shortTitle,
    url,
    id,
  } = integrationData[slug];
  return (
    <Layout>
      <Metas title={metaTitle} description={metaDescription} />
      <Section>
        <Breadcrumbs items={[{ label: "Integration", slug: "/integration" }]} />
        <IntegrationContainer
          id={id}
          description={description}
          title={title}
          shortTitle={shortTitle}
          url={url}
          host={`${protocol}://${hostname}`}
        ></IntegrationContainer>
      </Section>
    </Layout>
  );
};

export const getServerSideProps = async ({ query, req }) => {
  const slug: string = query.slug;
  const hostname: string = req.headers.host;
  const protocol =
    req.headers["x-forwarded-proto"] || req.connection.encrypted
      ? "https"
      : "http";
  return {
    props: {
      hostname,
      slug,
      protocol,
    },
  };
};

export default IntegrationPage;
