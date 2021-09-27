import { Container, Section } from "@socialgouv/cdtn-ui";
import { FicheServicePublic } from "@socialgouv/react-fiche-service-public";
import getConfig from "next/config";
import { withRouter } from "next/router";
import React from "react";

import Answer from "../../src/common/Answer";
import Metas from "../../src/common/Metas";
import References from "../../src/common/References";
import { Layout } from "../../src/layout/Layout";

const {
  publicRuntimeConfig: { API_URL },
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
    const { data = { _source: {} } } = this.props;
    const {
      _source: {
        breadcrumbs,
        date,
        description,
        raw,
        referencedTexts,
        title,
        url,
      },
      relatedItems,
    } = data;
    return (
      <Layout>
        <Metas
          title={title}
          description={description}
          overrideCanonical={url}
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
                <References references={referencedTexts} />
              </Container>
            </Section>
          }
          breadcrumbs={breadcrumbs}
        >
          {
            // Without the check, the prop children of the Answer will evaluate to true
            // even if in the end, <FicheServicePublic /> returns null
            raw && (
              <FicheServicePublic
                data={raw.children}
                accordionButtonWrapper="h2"
              />
            )
          }
        </Answer>
      </Layout>
    );
  }
}

export default withRouter(Fiche);
