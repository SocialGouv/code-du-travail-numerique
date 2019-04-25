import React from "react";
import { withRouter } from "next/router";
import Head from "next/head";
import getConfig from "next/config";
import fetch from "isomorphic-unfetch";
import { Button } from "@cdt/ui";
import { ExternalLink } from "react-feather";
import Answer from "../src/common/Answer";
import ArticleIcon from "../src/icons/ArticleIcon";
import { PageLayout } from "../src/layout/PageLayout";

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

// a FAQ answer

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
    return { convention };
  }

  render() {
    if (!this.props.convention) {
      return (
        <Answer emptyMessage="Cette convention collective n'a pas été trouvée" />
      );
    }
    const { title, url } = this.props.convention;
    return (
      <PageLayout>
        <Head>
          <meta name="description" content={title} />
        </Head>
        <Answer
          title={title}
          emptyMessage="Cette convention collective n'a pas été trouvée"
          footer="Informations fournies par la DILA"
          sourceType="Convention collective"
          icon={ArticleIcon}
        >
          <p>
            Cliquez sur le lien ci dessous pour accéder à la convention
            collective sur LegiFrance :
          </p>
          <a target="_blank" rel="noopener noreferrer" href={url}>
            <Button primary>
              <ExternalLink
                style={{ verticalAlign: "middle", marginRight: 10 }}
              />
              Contenu intégral de la convention sur Legifrance
            </Button>{" "}
          </a>
        </Answer>
      </PageLayout>
    );
  }
}

export default withRouter(Kali);
