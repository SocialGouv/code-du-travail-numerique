import React from "react";
import getConfig from "next/config";
import fetch from "isomorphic-unfetch";

import Answer from "../../src/common/Answer";
import Contribution from "../../src/contributions/Contribution";
import { extractMdxContentUrl } from "@cdt/data";
import { Layout } from "../../src/layout/Layout";
import Metas from "../../src/common/Metas";

const {
  publicRuntimeConfig: { API_URL },
} = getConfig();

class PageContribution extends React.Component {
  static async getInitialProps({ query: { slug } }) {
    const response = await fetch(`${API_URL}/items/contributions/${slug}`);
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
      return { data, content, slug };
    }

    return { data, slug };
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
      slug,
    } = this.props;

    return (
      <div>
        <Layout>
          <Metas
            description={description}
            pathname={`/contribution/${slug}`}
            title={title}
          />
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
