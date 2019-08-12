import React from "react";
import { withRouter } from "next/router";
import getConfig from "next/config";
import fetch from "isomorphic-unfetch";
import Answer from "../src/common/Answer";
import { PageLayout } from "../src/layout/PageLayout";
import Convention from "../src/conventions/Convention";
import Metas from "../src/common/Metas";

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

class ConventionCollective extends React.Component {
  static async getInitialProps({ query: { slug, idccNum } }) {
    const responseConvention = slug
      ? await fetch(`${API_URL}/items/conventions_collectives/${slug}`)
      : await fetch(`${API_URL}/idcc/${idccNum}`);
    if (!responseConvention.ok) {
      return { statusCode: responseConvention.status };
    }
    const convention = await responseConvention
      .json()
      .then(data => data._source);

    const responseContainer = await fetch(
      `${API_URL}/conventions/${convention.id}`
    );
    if (!responseContainer.ok) {
      return { statusCode: responseContainer.status };
    }
    const container = await responseContainer.json().then(data => data._source);

    return { convention, container };
  }

  render() {
    if (!this.props.convention) {
      return (
        <Answer emptyMessage="Cette convention collective n'a pas été trouvée" />
      );
    }
    const { pageUrl, ogImage, convention, container } = this.props;
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
          <Convention convention={convention} container={container} />
        </Answer>
      </PageLayout>
    );
  }
}

export default withRouter(ConventionCollective);
