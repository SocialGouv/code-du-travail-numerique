import React from "react";
import { withRouter } from "next/router";
import fetch from "isomorphic-unfetch";
import styled from "styled-components";
import getConfig from "next/config";
import FicheServicePublic from "@socialgouv/react-fiche-service-public";
import ReferencesJuridiques from "../src/ReferencesJuridiques";
import Answer from "../src/common/Answer";
import ReponseIcon from "../src/icons/ReponseIcon";
import { PageLayout } from "../src/layout/PageLayout";
import { Metas } from "../src/common/Metas";

const ServicePublic = styled.div`
  .sp__Titre {
    font-size: 1.5rem;
  }
`;

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

const fetchFiche = ({ slug }) =>
  fetch(`${API_URL}/items/fiches_service_public/${slug}`).then(r => r.json());

const Source = ({ name, url }) => (
  <a href={url} target="_blank" rel="noopener noreferrer">
    Voir le contenu original sur : {name}{" "}
  </a>
);

class Fiche extends React.Component {
  static async getInitialProps({ query }) {
    const data = await fetchFiche(query);
    if (data.status === 404) {
      return { data: { _source: {} } };
    }
    if (data._source.raw) {
      data._source.raw = JSON.parse(data._source.raw);
    }
    return { data };
  }

  render() {
    const { data, pageUrl, ogImage } = this.props;
    const {
      _source: {
        breadcrumbs,
        date,
        description,
        html,
        raw,
        references_juridiques,
        title,
        url
      }
    } = data;
    const footer = <Source name="service-public.fr" url={url} />;
    return (
      <PageLayout>
        <Metas
          url={pageUrl}
          title={title}
          description={description}
          image={ogImage}
        />
        <ServicePublic>
          <Answer
            title={title}
            emptyMessage="Cette fiche n'a pas été trouvée"
            html={html}
            footer={footer}
            date={date}
            icon={ReponseIcon}
            sourceType="Fiche service-public.fr"
            additionalContent={
              <ReferencesJuridiques references={references_juridiques} />
            }
            breadcrumbs={breadcrumbs}
          >
            {// Without the check, the prop children of the Answer will evaluate to true
            // even if in the end, <FicheServicePublic /> returns null
            raw && <FicheServicePublic data={raw.$} />}
          </Answer>
        </ServicePublic>
      </PageLayout>
    );
  }
}

export default withRouter(Fiche);
