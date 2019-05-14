import React from "react";
import { withRouter } from "next/router";
import Head from "next/head";
import getConfig from "next/config";
import fetch from "isomorphic-unfetch";
import { AsideTitle, Section, Wrapper } from "@cdt/ui";

import Html from "../src/common/Html";
import { DownloadFile } from "../src/common/DownloadFile";
import ModeleCourrierIcon from "../src/icons/ModeleCourrierIcon";
import Answer from "../src/common/Answer";
import { PageLayout } from "../src/layout/PageLayout";

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

const fetchCourrier = ({ slug }) =>
  fetch(`${API_URL}/items/modeles_de_courriers/${slug}`).then(r => r.json());

class ModeleCourrier extends React.Component {
  static async getInitialProps({ query }) {
    const data = await fetchCourrier(query);
    return { data };
  }

  render() {
    const { data } = this.props;
    const { description } = data._source;
    if (data.status === 404) {
      return <Answer emptyMessage="Modèle de courrier introuvable" />;
    }
    return (
      <PageLayout>
        <Head>
          <meta
            name="description"
            content={description.slice(0, description.indexOf(" ", 150)) + "…"}
          />
        </Head>
        <Answer
          title={`Modèle de courrier :  ${data._source.title}`}
          emptyMessage="Modèle de courrier introuvable"
          intro={<p>{description}</p>}
          footer="Modèles de courrier fournis par vos services de renseignement des DIRECCTE en région"
          icon={ModeleCourrierIcon}
          date={data._source.date}
          sourceType="Modèle de document"
        >
          <Section>
            <Wrapper variant="outline">
              <Html className="courrier-type">{data._source.html}</Html>
            </Wrapper>
          </Section>
          <AsideTitle>Télécharger le modèle</AsideTitle>
          <DownloadFile
            title={data._source.title}
            file={`${API_URL}/docs/${data._source.filename}`}
            type="Modèle de document"
            icon={ModeleCourrierIcon}
          />
        </Answer>
      </PageLayout>
    );
  }
}

export default withRouter(ModeleCourrier);
