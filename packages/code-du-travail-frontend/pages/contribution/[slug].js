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

    // Check Content tag exist on markdown
    const markdown =
      ((((data || {})._source || {}).answers || {}).generic || {}).markdown ||
      "";

    const contentUrl = extractMdxContentUrl(markdown);
    if (contentUrl) {
      const fetchContent = await fetch(`${API_URL}/items?url=${contentUrl}`);
      const content = await fetchContent.json();
      return { data, content };
    }

    return { data };
  }

  render() {
    const {
      data: { _source: { title, answers, description }, relatedItems } = {
        _source: {}
      },
      content,
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
            source={{
              name: "Réponse personnalisée selon votre convention collective"
            }}
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
