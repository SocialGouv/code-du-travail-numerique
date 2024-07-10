import { Container, Section } from "@socialgouv/cdtn-ui";
import React from "react";

import { FicheServicePublic } from "../../src/fiche-service-public";
import Answer from "../../src/common/Answer";
import Metas from "../../src/common/Metas";
import References from "../../src/common/References";
import { Layout } from "../../src/layout/Layout";
import { Breadcrumb } from "@socialgouv/cdtn-types";
import { handleError } from "../../src/lib/fetch-error";
import { SITE_URL } from "../../src/config";
import { getBySourceAndSlugItems } from "../../src/api";

const fetchFiche = ({ slug }) =>
  fetch(`${SITE_URL}/api/items/fiches_service_public/${slug}`);

interface Props {
  breadcrumbs: Breadcrumb[];
  date: string;
  description: string;
  title: string;
  url: string;
  raw;
  referencedTexts;
  relatedItems: Array<any>;
}

function Fiche(props: Props): JSX.Element {
  const {
    breadcrumbs,
    date,
    description,
    raw,
    referencedTexts,
    title,
    url,
    relatedItems,
  } = props;

  return (
    <Layout>
      <Metas title={title} description={description} overrideCanonical={url} />
      <Answer
        title={title}
        relatedItems={relatedItems}
        date={date}
        source={{ name: "Fiche service-public.fr", url }}
        additionalContent={
          <Section>
            <Container>
              <References references={referencedTexts} />
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
}

export const getServerSideProps = async ({ query }) => {
  const data = await getBySourceAndSlugItems<
    FicheServicePublic & { raw: string }
  >("fiches_service_public", query.slug);
  if (data && data._source && data._source.raw) {
    data._source.raw = JSON.parse(data._source.raw);
  }
  return { props: { relatedItems: data.relatedItems, ...data._source } };
};
export default Fiche;
