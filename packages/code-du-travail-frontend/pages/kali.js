import React from "react";
import { withRouter } from "next/router";
import getConfig from "next/config";
import fetch from "isomorphic-unfetch";
import Answer from "../src/common/Answer";
import { PageLayout } from "../src/layout/PageLayout";
import Convention from "../src/conventions/Convention";
import Metas from "../src/common/Metas";

const {
  publicRuntimeConfig: { API_URL, API_DILA2SQL_URL }
} = getConfig();

const fetchKali = ({ slug, idccNum }) => {
  const url = slug
    ? `${API_URL}/items/kali/${slug}`
    : `${API_URL}/idcc/${idccNum}`;
  return fetch(url)
    .then(r => r.json())
    .then(r => r.status != 404 && r._source);
};

class Kali extends React.Component {
  static async getInitialProps({ query }) {
    const convention = await fetchKali(query);

    const conteneurResponse = await fetch(
      `${API_DILA2SQL_URL}/base/KALI/conteneur/${convention.id}`
    );
    if (!conteneurResponse.ok) {
      return { statusCode: conteneurResponse.status };
    }
    const conteneur = await conteneurResponse.json();
    return { convention, conteneur: conteneur.data };
  }

  render() {
    if (!this.props.convention) {
      return (
        <Answer emptyMessage="Cette convention collective n'a pas été trouvée" />
      );
    }
    const { pageUrl, ogImage, convention, conteneur } = this.props;
    const { title } = convention;
    return (
      <PageLayout>
        <Metas
          url={pageUrl}
          title={title}
          description={title}
          image={ogImage}
        />
        <Answer
          title={title}
          emptyMessage="Cette convention collective n'a pas été trouvée"
          footer="Informations fournies par la DILA"
          wide
        >
          <Convention convention={convention} conteneur={conteneur} />
        </Answer>
      </PageLayout>
    );
  }
}

export default withRouter(Kali);
