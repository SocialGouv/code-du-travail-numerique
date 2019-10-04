import React from "react";
import { withRouter } from "next/router";
import getConfig from "next/config";
import fetch from "isomorphic-unfetch";
import { Section, Wrapper } from "@cdt/ui-old";

import Html from "../../src/common/Html";
import { DownloadFile } from "../../src/common/DownloadFile";
import ModeleCourrierIcon from "../../src/icons/ModeleCourrierIcon";
import Answer from "../../src/common/Answer";
import { Layout } from "../../src/layout/Layout";
import Metas from "../../src/common/Metas";

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

const fetchCourrier = ({ slug }) =>
  fetch(`${API_URL}/items/modeles_de_courriers/${slug}`);

class ModeleCourrier extends React.Component {
  static async getInitialProps({ query }) {
    const response = await fetchCourrier(query);
    if (!response.ok) {
      return { statusCode: response.status };
    }

    const data = await response.json();
    return { data };
  }

  render() {
    const {
      data: {
        _source: { date, description = "", filename, html, title },
        status
      } = { _source: {} },
      pageUrl,
      ogImage
    } = this.props;
    if (status === 404) {
      return (
        <Answer
          emptyMessage="Modèle de courrier introuvable"
          icon={ModeleCourrierIcon}
        />
      );
    }
    return (
      <Layout>
        <Metas
          url={pageUrl}
          title={`Modèle de courrier :  ${title}`}
          description={
            description.slice(0, description.indexOf(" ", 150)) + "…"
          }
          image={ogImage}
        />

        <Answer
          title={`Modèle de courrier :  ${title}`}
          emptyMessage="Modèle de courrier introuvable"
          intro={description}
          footer="Modèles de courrier fournis par vos services de renseignement des DIRECCTE en région"
          icon={ModeleCourrierIcon}
          date={date}
          sourceType="Modèle de document"
        >
          <Section>
            <Wrapper variant="light">
              <Html>{html}</Html>
            </Wrapper>
          </Section>
          <h4>Télécharger le modèle</h4>
          <DownloadFile
            title={title || "modele"}
            file={`${API_URL}/docs/${filename}`}
            type="Modèle de document"
          />
        </Answer>
      </Layout>
    );
  }
}

export default withRouter(ModeleCourrier);
