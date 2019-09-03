import React from "react";
import { withRouter } from "next/router";
import fetch from "isomorphic-unfetch";
import { format, parseISO } from "date-fns";
import frLocale from "date-fns/locale/fr";
import getConfig from "next/config";

import ArticleIcon from "../../src/icons/ArticleIcon";
import Answer from "../../src/common/Answer";
import { PageLayout } from "../../src/layout/PageLayout";
import Metas from "../../src/common/Metas";

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

const fetchFiche = ({ slug }) =>
  fetch(`${API_URL}/items/code_du_travail/${slug}`);

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
      data: { _source: { title, description, date_debut, html, url } } = {
        _source: {}
      },
      pageUrl,
      ogImage
    } = this.props;

    const footer = <Source name="https://www.legifrance.gouv.fr" url={url} />;
    return (
      <PageLayout>
        <Metas
          url={pageUrl}
          title={title}
          description={description}
          image={ogImage}
        />
        <Answer
          title={title}
          date={
            date_debut &&
            format(parseISO(date_debut), "dd MMMM yyyy", {
              locale: frLocale
            })
          }
          icon={ArticleIcon}
          emptyMessage="Article introuvable"
          html={html}
          footer={footer}
          sourceType="Code du travail"
        />
      </PageLayout>
    );
  }
}

export default withRouter(Fiche);
