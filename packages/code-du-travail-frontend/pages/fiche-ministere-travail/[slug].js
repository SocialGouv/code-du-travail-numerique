import React from "react";
import { withRouter } from "next/router";
import getConfig from "next/config";
import fetch from "isomorphic-unfetch";
import styled from "styled-components";
import Answer from "../../src/common/Answer";
import ReponseIcon from "../../src/icons/ReponseIcon";
import { Layout } from "../../src/layout/Layout";
import Metas from "../../src/common/Metas";
import Html from "../../src/common/Html";

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
    const {
      data: {
        _source: { title, description, date, html, breadcrumbs, intro, url },
        relatedItems
      } = {
        _source: {}
      },
      pageUrl,
      ogImage
    } = this.props;
    const footer = <Source name="Ministère du travail" url={url} />;
    return (
      <Layout>
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
          intro={intro && <Intro>{intro} </Intro>}
          html={html}
          footer={footer}
          icon={ReponseIcon}
          date={date}
          sourceType="Fiche ministère du Travail"
          breadcrumbs={breadcrumbs}
        />
      </Layout>
    );
  }
}

export default withRouter(Fiche);

const Intro = styled(Html)`
  & > *:first-child {
    margin-top: 0;
  }
  & > *:last-child {
    margin-bottom: 0;
  }
`;
