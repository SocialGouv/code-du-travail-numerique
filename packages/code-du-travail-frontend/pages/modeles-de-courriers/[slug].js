import React from "react";
import { withRouter } from "next/router";
import getConfig from "next/config";
import fetch from "isomorphic-unfetch";
import { Heading, Section, Wrapper, Alert } from "@socialgouv/react-ui";

import Html from "../../src/common/Html";
import { DownloadFile } from "../../src/common/DownloadFile";
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
        relatedItems,
        status
      } = { _source: {} },
      pageUrl,
      ogImage
    } = this.props;
    if (status === 404) {
      return <Answer emptyMessage="Modèle de document introuvable" />;
    }
    return (
      <Layout>
        <Metas
          url={pageUrl}
          title={`Modèle de document :  ${title}`}
          description={
            description.slice(0, description.indexOf(" ", 150)) + "…"
          }
          image={ogImage}
        />

        <Answer
          title={`Modèle : ${title}`}
          relatedItems={relatedItems}
          emptyMessage="Modèle de document introuvable"
          intro={description}
          date={date}
          source={{ name: "Modèle de document" }}
        >
          <Section>
            <Wrapper variant="light">
              <Html>{html}</Html>
            </Wrapper>
          </Section>
          <Heading as="h4">Télécharger le modèle</Heading>
          <Alert varaint="primary">
            Attention, chaque modèle de document proposé est à personnaliser
            selon votre situation et est susceptible d’évoluer suite à des
            changements de règlementation. Assurez-vous d’avoir la dernière
            version mise à jour avant toute utilisation.
          </Alert>
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
