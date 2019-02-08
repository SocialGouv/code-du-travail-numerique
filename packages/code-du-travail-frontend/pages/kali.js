import React from "react";
import { withRouter } from "next/router";
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

const fetchKali = ({ slug }) =>
  fetch(`${API_URL}/items/kali/${slug}`).then(r => r.json());

class Kali extends React.Component {
  static async getInitialProps({ query }) {
    const data = await fetchKali(query);
    return { data };
  }

  render() {
    const { data } = this.props;
    if (data.status === 404) {
      return (
        <Answer emptyMessage="Cette convention collective n'a pas été trouvée" />
      );
    }
    return (
      <PageLayout>
        <Answer
          title={data._source.title}
          emptyMessage="Cette convention collective n'a pas été trouvée"
          footer="Informations fournies par la DILA"
          sourceType="Convention collective"
          icon={ArticleIcon}
        >
          <p>
            Cliquez sur le lien ci dessous pour accéder à la convention
            collective sur LegiFrance :
          </p>
          <a target="_blank" rel="noopener noreferrer" href={data._source.url}>
            <Button primary>
              <ExternalLink
                style={{ verticalAlign: "middle", marginRight: 10 }}
              />
              {data._source.title}
            </Button>{" "}
          </a>
        </Answer>
      </PageLayout>
    );
  }
}

export default withRouter(Kali);
