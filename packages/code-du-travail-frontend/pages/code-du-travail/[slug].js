import React from "react";
import { withRouter } from "next/router";
import fetch from "isomorphic-unfetch";
import { format } from "date-fns";
import frLocale from "date-fns/locale/fr";
import getConfig from "next/config";
import { Alert } from "@socialgouv/react-ui";

import Answer from "../../src/common/Answer";
import { Layout } from "../../src/layout/Layout";
import Metas from "../../src/common/Metas";
import { replaceArticlesRefs } from "../../src/lib/replaceArticlesRefs";
import Html from "../../src/common/Html";

const {
  publicRuntimeConfig: { API_URL },
} = getConfig();

class Fiche extends React.Component {
  static async getInitialProps({ query: { slug } }) {
    const response = await fetch(`${API_URL}/items/code_du_travail/${slug}`);
    if (!response.ok) {
      return { statusCode: response.status };
    }
    const data = await response.json();
    return { data, slug };
  }

  render() {
    const {
      data: {
        _source: { title, description, dateDebut, html, url, notaHtml },
        relatedItems,
      } = {
        _source: {},
      },
      slug,
    } = this.props;

    const fixedHtml = replaceArticlesRefs(html);
    return (
      <Layout>
        <Metas
          description={description}
          pathname={`/code-du-travail/${slug}`}
          title={title}
        />
        <Answer
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
