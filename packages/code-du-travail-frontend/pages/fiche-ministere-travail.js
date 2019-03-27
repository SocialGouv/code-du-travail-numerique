import React from "react";
import { withRouter } from "next/router";
import getConfig from "next/config";
import fetch from "isomorphic-unfetch";
import { ExternalLink } from "react-feather";
import Answer from "../src/common/Answer";
import ReponseIcon from "../src/icons/ReponseIcon";
import { PageLayout } from "../src/layout/PageLayout";

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

const fetchFiche = ({ slug }) =>
  fetch(`${API_URL}/items/fiches_ministere_travail/${slug}`).then(r =>
    r.json()
  );

const Source = ({ name, url }) => (
  <a href={url} target="_blank" rel="noopener noreferrer">
    Voir le contenu original sur : {name}{" "}
    <ExternalLink
      style={{ verticalAlign: "middle", margin: "0 5px" }}
      size={16}
    />
  </a>
);

class Fiche extends React.Component {
  static async getInitialProps({ query }) {
    const data = await fetchFiche(query);
    if (data.status === 404) {
      return { data: { _source: {} } };
    }
    return { data };
  }

  render() {
    const { data } = this.props;
    const footer = (
      <Source name="Ministère du travail" url={data._source.url} />
    );
    return (
      <PageLayout>
        <Answer
          title={data._source.title}
          emptyMessage="Cette fiche n'a pas été trouvée"
          html={data._source.html}
          footer={footer}
          icon={ReponseIcon}
          date={data._source.date}
          sourceType="Fiche ministère du travail"
        />
      </PageLayout>
    );
  }
}

export default withRouter(Fiche);
