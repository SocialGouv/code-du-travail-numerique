import React from "react";
import { withRouter } from "next/router";
import getConfig from "next/config";
import fetch from "isomorphic-unfetch";
import Answer from "../../src/common/Answer";
import { Layout } from "../../src/layout/Layout";
import Convention from "../../src/conventions/Convention";
import Metas from "../../src/common/Metas";

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

class ConventionCollective extends React.Component {
  static async getInitialProps({ query: { slug } }) {
    const responseContainer = await fetch(`${API_URL}/conventions/${slug}`);
    if (!responseContainer.ok) {
      return { statusCode: responseContainer.status };
    }
    const convention = await responseContainer.json();
    return { convention };
  }

  render() {
    if (!this.props.convention) {
      return (
        <Answer emptyMessage="Cette convention collective n'a pas été trouvée" />
      );
    }
    const { pageUrl, ogImage, convention } = this.props;
    const { shortTitle, title } = convention;
    return (
      <Layout>
        <Metas
          url={pageUrl}
          title={`Convention collective ${shortTitle}`}
          description={title}
          image={ogImage}
        />
        <Answer
          title={shortTitle}
          emptyMessage="Cette convention collective n'a pas été trouvée"
          wide
        >
          <Convention convention={convention} />
        </Answer>
      </Layout>
    );
  }
}

export default withRouter(ConventionCollective);
