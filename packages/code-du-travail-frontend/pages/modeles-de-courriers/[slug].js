import React from "react";
import { withRouter } from "next/router";
import getConfig from "next/config";
import fetch from "isomorphic-unfetch";
import { Heading, Section, Wrapper } from "@socialgouv/react-ui";

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
      return <Answer emptyMessage="Modèle de courrier introuvable" />;
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
          title={title}
          relatedItems={relatedItems}
          emptyMessage="Modèle de courrier introuvable"
          intro={description}
          date={date}
          sourceType="Modèle de document"
        >
          <Section>
            <Wrapper variant="light">
              <Html>{html}</Html>
            </Wrapper>
          </Section>
          <Heading as="h4">Télécharger le modèle</Heading>
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
