import { Section } from "@socialgouv/cdtn-ui";
import React from "react";

import Breadcrumbs from "../../src/common/Breadcrumbs";
import Metas from "../../src/common/Metas";
import { Layout } from "../../src/layout/Layout";
import { integrationData, IntegrationContainer } from "../../src/integration";
import { SITE_URL } from "../../src/config";

const IntegrationPage = (props): JSX.Element => {
  const {
    description,
    metaDescription,
    metaTitle,
    title,
    shortTitle,
    url,
    id,
    messages,
  } = integrationData[props.slug];
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
          host={`${props.protocol}://${props.hostname}`}
          messages={messages}
          selectOptions={props?.selectOptions}
        ></IntegrationContainer>
      </Section>
    </Layout>
  );
};

export const getServerSideProps = async ({ query, req }) => {
  const slug: string = query.slug;
  const keys = Object.keys(integrationData);
  if (!keys.includes(slug)) {
    return {
      notFound: true,
    };
  }
  const { select } = integrationData[slug];
  let selectOptions: any[] | null = null;
  if (select) {
    const responseContainer = await fetch(`${SITE_URL}${select?.url}`);
    selectOptions = await responseContainer.json();
    selectOptions =
      selectOptions
        ?.map((item) => {
          return {
            label: item[select.labelPath],
            value: item[select.valuePath],
          };
        })
        ?.sort((a, b) => a.label.localeCompare(b.label)) ?? null;
  }

  const hostname: string = req.headers.host;
  const [protocol] = req.headers["x-forwarded-proto"]
    ? req.headers["x-forwarded-proto"].split(",")
    : ["https"];

  return {
    props: {
      hostname,
      slug,
      protocol,
      selectOptions,
    },
  };
};

export default IntegrationPage;
