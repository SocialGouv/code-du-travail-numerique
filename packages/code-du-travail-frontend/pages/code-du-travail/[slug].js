import React from "react";
import { withRouter } from "next/router";
import fetch from "isomorphic-unfetch";
import { format, parseISO } from "date-fns";
import frLocale from "date-fns/locale/fr";
import getConfig from "next/config";

import Answer from "../../src/common/Answer";
import { Layout } from "../../src/layout/Layout";
import Metas from "../../src/common/Metas";
import { replaceArticlesRefs } from "../../src/lib/replaceArticlesRefs";

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

const fetchFiche = ({ slug }) =>
  fetch(`${API_URL}/items/code_du_travail/${slug}`);

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
        _source: { title, description, date_debut, html, url },
        relatedItems
      } = {
        _source: {}
      },
      pageUrl,
      ogImage
    } = this.props;

    const fixedHtml = replaceArticlesRefs(html);
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
          date={
            date_debut &&
            format(parseISO(date_debut), "dd MMMM yyyy", {
              locale: frLocale
            })
          }
          emptyMessage="Article introuvable"
          html={fixedHtml}
          source={{ name: "Code du travail", url }}
        />
      </Layout>
    );
  }
}

export default withRouter(Fiche);
