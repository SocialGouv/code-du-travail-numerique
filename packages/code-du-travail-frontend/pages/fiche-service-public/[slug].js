import React from "react";
import fetch from "isomorphic-unfetch";
import getConfig from "next/config";
import FicheServicePublic from "@socialgouv/react-fiche-service-public";
import { Container, Section } from "@socialgouv/react-ui";
import ReferencesJuridiques from "../../src/common/ReferencesJuridiques";
import Answer from "../../src/common/Answer";
import { Layout } from "../../src/layout/Layout";
import Metas from "../../src/common/Metas";

const {
  publicRuntimeConfig: { API_URL },
} = getConfig();

export async function getServerSideProps({ query: { slug } }) {
  const response = await fetch(
    `${API_URL}/items/fiches_service_public/${slug}`
  );
  if (!response.ok) {
    return { props: { errorCode: response.status } };
  }

  const data = await response.json();
  if (data._source.raw) {
    data._source.raw = JSON.parse(data._source.raw);
  }
  return { props: { data, slug } };
}

const Fiche = ({
  data: {
    _source: {
      breadcrumbs,
      date,
      description,
      raw,
      references_juridiques,
      title,
      url,
    },
    relatedItems,
  } = { _source: {} },
  errorCode,
  slug,
}) => {
  return (
    <Layout errorCode={errorCode}>
      <Metas
        description={description}
        pathname={`/fiche-service-public/${slug}`}
        title={title}
      />
      <Answer
        title={title}
        relatedItems={relatedItems}
        date={date}
        source={{ name: "Fiche service-public.fr", url }}
        additionalContent={
          <Section>
            <Container>
              <ReferencesJuridiques references={references_juridiques} />
            </Container>
          </Section>
        }
        breadcrumbs={breadcrumbs}
      >
        {
          // Without the check, the prop children of the Answer will evaluate to true
          // even if in the end, <FicheServicePublic /> returns null
          raw && <FicheServicePublic data={raw.children} />
        }
      </Answer>
    </Layout>
  );
};

export default Fiche;
