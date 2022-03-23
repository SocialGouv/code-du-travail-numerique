import { getLabelBySource, SOURCES } from "@socialgouv/cdtn-sources";
import { Alert } from "@socialgouv/cdtn-ui";
import { format } from "date-fns";
import frLocale from "date-fns/locale/fr";
import getConfig from "next/config";
import { withRouter } from "next/router";
import React from "react";

import Answer from "../../src/common/Answer";
import Html from "../../src/common/Html";
import Metas from "../../src/common/Metas";
import { Layout } from "../../src/layout/Layout";
import { replaceArticlesRefs } from "../../src/lib/replaceArticlesRefs";

const {
  publicRuntimeConfig: { API_URL },
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
        _source: { title, description, dateDebut, html, url, notaHtml },
        relatedItems,
      } = {
        _source: {},
      },
    } = this.props;

    const fixedHtml = replaceArticlesRefs("https://legifrance.gouv.fr", html);
    return (
      <Layout>
        <Metas title={title} description={description} />
        <Answer
          suptitle={getLabelBySource(SOURCES.CDT)}
          title={title}
          relatedItems={relatedItems}
          date={
            dateDebut &&
            format(new Date(dateDebut), "dd/MM/yyyy", {
              locale: frLocale,
            })
          }
          emptyMessage="Article introuvable"
          html={fixedHtml}
          source={{ name: "Code du travail", url }}
        >
          {notaHtml && (
            <Alert>
              <strong>NOTA</strong>
              <Html>{notaHtml}</Html>
            </Alert>
          )}
        </Answer>
      </Layout>
    );
  }
}

export default withRouter(Fiche);
