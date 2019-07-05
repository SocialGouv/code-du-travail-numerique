import React from "react";
import { withRouter } from "next/router";
import getConfig from "next/config";
import fetch from "isomorphic-unfetch";
import { Section, Wrapper } from "@cdt/ui";

import Html from "../src/common/Html";
import { DownloadFile } from "../src/common/DownloadFile";
import ModeleCourrierIcon from "../src/icons/ModeleCourrierIcon";
import Answer from "../src/common/Answer";
import { PageLayout } from "../src/layout/PageLayout";
import Metas from "../src/common/Metas";
import withError from "../src/lib/withError";

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
    const { data = { _source: {} }, pageUrl, ogImage } = this.props;
    const { description = "" } = data._source;
    if (data.status === 404) {
      return (
        <Answer
          emptyMessage="Modèle de courrier introuvable"
          icon={ModeleCourrierIcon}
        />
      );
    }
    return (
      <PageLayout>
        <Metas
          url={pageUrl}
          title={`Modèle de courrier :  ${data._source.title}`}
          description={
            description.slice(0, description.indexOf(" ", 150)) + "…"
          }
          image={ogImage}
        />

        <Answer
          title={`Modèle de courrier :  ${data._source.title}`}
          emptyMessage="Modèle de courrier introuvable"
          intro={description}
          footer="Modèles de courrier fournis par vos services de renseignement des DIRECCTE en région"
          icon={ModeleCourrierIcon}
          date={data._source.date}
          sourceType="Modèle de document"
        >
          <Section>
            <Wrapper variant="light">
              <Html>{data._source.html}</Html>
            </Wrapper>
          </Section>
          <h4>Télécharger le modèle</h4>
          <DownloadFile
            title={data._source.title || "modele"}
            file={`${API_URL}/docs/${data._source.filename}`}
            type="Modèle de document"
          />
        </Answer>
      </PageLayout>
    );
  }
}

export default withRouter(withError(ModeleCourrier));
