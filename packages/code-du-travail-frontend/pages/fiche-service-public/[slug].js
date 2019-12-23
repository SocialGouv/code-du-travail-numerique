import React from "react";
import { withRouter } from "next/router";
import fetch from "isomorphic-unfetch";
import getConfig from "next/config";
import FicheServicePublic from "@socialgouv/react-fiche-service-public";
import { Container, Section } from "@socialgouv/react-ui";
import ReferencesJuridiques from "../../src/common/ReferencesJuridiques";
import Answer from "../../src/common/Answer";
import { Layout } from "../../src/layout/Layout";
import Metas from "../../src/common/Metas";

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

const fetchFiche = ({ slug }) =>
  fetch(`${API_URL}/items/fiches_service_public/${slug}`);

class Fiche extends React.Component {
  static async getInitialProps({ query }) {
    const response = await fetchFiche(query);
    if (!response.ok) {
      return { statusCode: response.status };
    }

    const data = await response.json();
    if (data._source.raw) {
      data._source.raw = JSON.parse(data._source.raw);
    }
    return { data };
  }

  render() {
    const { data = { _source: {} }, pageUrl, ogImage } = this.props;
    const {
      _source: {
        breadcrumbs,
        date,
        description,
        raw,
        references_juridiques,
        title,
        url
      },
      relatedItems
    } = data;
    return (
      <Layout title={title}>
        <Metas
          url={pageUrl}
          title={title}
          description={description}
          image={ogImage}
        />
        <Answer
          title={title}
          relatedItems={relatedItems}
          emptyMessage="Cette fiche n'a pas été trouvée"
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
          {// Without the check, the prop children of the Answer will evaluate to true
          // even if in the end, <FicheServicePublic /> returns null
          raw && <FicheServicePublic data={raw.children} />}
        </Answer>
      </Layout>
    );
  }
}

export default withRouter(Fiche);
