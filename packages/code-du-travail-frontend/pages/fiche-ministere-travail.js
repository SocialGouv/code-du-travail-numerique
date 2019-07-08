import React from "react";
import { withRouter } from "next/router";
import Head from "next/head";
import getConfig from "next/config";
import fetch from "isomorphic-unfetch";
import styled from "styled-components";
import Answer from "../src/common/Answer";
import ReponseIcon from "../src/icons/ReponseIcon";
import { PageLayout } from "../src/layout/PageLayout";
import Metas from "../src/common/Metas";

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

const fetchFiche = ({ slug }) =>
  fetch(`${API_URL}/items/fiches_ministere_travail/${slug}`);

const Source = ({ name, url }) => (
  <a href={url} target="_blank" rel="noopener noreferrer">
    Voir le contenu original sur : {name}{" "}
  </a>
);

class Fiche extends React.Component {
  static async getInitialProps({ query }) {
    const response = await fetchFiche(query);
    if (!response.ok) {
      return { statusCode: response.status };
    }

    const data = await response.json();
    return { data };
  }

  render() {
    const { data = { _source: {} }, pageUrl, ogImage } = this.props;
    const footer = (
      <Source name="Ministère du travail" url={data._source.url} />
    );
    return (
      <PageLayout>
        <Metas
          url={pageUrl}
          title={data._source.title}
          description={data._source.description}
          image={ogImage}
        />
        <Head>
          <link href={data._source.url} rel="canonical" />
        </Head>
        <Answer
          title={data._source.title}
          emptyMessage="Cette fiche n'a pas été trouvée"
          intro={
            <Intro dangerouslySetInnerHTML={{ __html: data._source.intro }} />
          }
          html={data._source.html}
          footer={footer}
          icon={ReponseIcon}
          date={data._source.date}
          sourceType="Fiche ministère du travail"
          breadcrumbs={data._source.breadcrumbs}
        />
      </PageLayout>
    );
  }
}

export default withRouter(Fiche);

const Intro = styled.div`
  & > *:first-child {
    margin-top: 0;
  }
  & > *:last-child {
    margin-bottom: 0;
  }
`;
