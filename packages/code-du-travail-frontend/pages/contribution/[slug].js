import React from "react";
import getConfig from "next/config";
import fetch from "isomorphic-unfetch";

import Answer from "../../src/common/Answer";
import Contribution from "../../src/contributions/Contribution";
import { Layout } from "../../src/layout/Layout";
import Metas from "../../src/common/Metas";

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

const fetchQuestion = ({ slug }) =>
  fetch(`${API_URL}/items/contributions/${slug}`);

class PageContribution extends React.Component {
  static async getInitialProps({ query }) {
    const response = await fetchQuestion(query);
    if (!response.ok) {
      return { statusCode: response.status };
    }
    const data = await response.json();
    return { data };
  }

  render() {
    const {
      data: { _source: { title, answers, description }, relatedItems } = {
        _source: {}
      },
      pageUrl,
      ogImage
    } = this.props;

    return (
      <div>
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
            sourceType="Réponse personnalisée selon votre convention collective"
            emptyMessage="Cette question n'a pas été trouvée"
          >
            <Contribution answers={answers} />
          </Answer>
        </Layout>
      </div>
    );
  }
}

export default PageContribution;
