import { Section } from "@socialgouv/cdtn-ui";
import React from "react";

import Breadcrumbs from "../../src/common/Breadcrumbs";
import Metas from "../../src/common/Metas";
import { Layout } from "../../src/layout/Layout";
import { IntegrationContainer, integrationData } from "../../src/integration";
import { getAllModeles } from "../../src/api";

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
        <Breadcrumbs
          items={[
            {
              label: "Intégrer les outils du Code du travail numérique",
              slug: "/integration",
              position: 0,
            },
          ]}
        />
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
const keys = Object.keys(integrationData);

const getModelesList = async () => {
  const modeles = await getAllModeles();
  return modeles
    .map((item) => {
      return {
        label: item?.title ?? "",
        value: item?.cdtnId ?? "",
      };
    })
    ?.sort((a, b) => a.label.localeCompare(b.label));
};

export const getServerSideProps = async ({ query, req }) => {
  const slug: string = query.slug;
  if (!keys.includes(slug)) {
    return {
      notFound: true,
    };
  }
  const { isModele } = integrationData[slug];
  const selectOptions = isModele ? await getModelesList() : null;

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
