import { extractMdxContentUrl } from "@cdt/data";
import fetch from "isomorphic-unfetch";
import getConfig from "next/config";
import React from "react";

import Answer from "../../src/common/Answer";
import Metas from "../../src/common/Metas";
import Contribution from "../../src/contributions/Contribution";
import { Layout } from "../../src/layout/Layout";

const {
  publicRuntimeConfig: { API_URL },
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
      return { content, data };
    }

    return { data };
  }

  render() {
    const {
      data: {
        _source: { breadcrumbs, title, answers, description },
        relatedItems,
      } = {
        _source: {},
      },
      content,
    } = this.props;

    return (
      <div>
        <Layout>
          <Metas title={title} description={description} />
          <Answer
            title={title}
            relatedItems={relatedItems}
            breadcrumbs={breadcrumbs}
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
