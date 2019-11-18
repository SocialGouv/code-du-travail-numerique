import React from "react";
import getConfig from "next/config";
import fetch from "isomorphic-unfetch";

import Answer from "../../src/common/Answer";
import Contribution from "../../src/contributions/Contribution";
import extractMdxContentUrl from "../../src/contributions/extractMdxContentUrl";
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

    const contentUrl = extractMdxContentUrl(
      data._source.answers.generic && data._source.answers.generic.markdown
    );

    if (contentUrl) {
      const fetchContent = await fetch(`${API_URL}/items?url=${contentUrl}`);
      const content = await fetchContent.json();

      return { data, content };
    }
    return { data };
  }

  render() {
    const { data = { _source: {} }, content, pageUrl, ogImage } = this.props;
    const {
      _source: { title, answers, description },
      relatedItems
    } = data;

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
            title={title || ""}
            relatedItems={relatedItems}
            sourceType="Réponse personnalisée selon votre convention collective"
            emptyMessage="Cette question n'a pas été trouvée"
          >
            <Contribution
              answers={answers}
              content={(content && content._source) || {}}
            />
          </Answer>
        </Layout>
      </div>
    );
  }
}

export default PageContribution;
