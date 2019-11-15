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

    // Check Content tag exist on markdown
    const contentRegExp = new RegExp("<s*Content[^](.*?)s*/>", "g");
    const {
      _source: {
        answers: {
          generic: { markdown }
        }
      } = {
        _source: {}
      }
    } = data;
    const contentTag = (markdown || {}).match(contentRegExp)[0];
    if (contentTag) {
      // Extract URL from Content tag, only one for now
      const contentUrl = contentTag.match(
        /\bhttps?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/gi
      )[0];

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
      content: { _source: contentSource },
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
            <Contribution answers={answers} content={contentSource || {}} />
          </Answer>
        </Layout>
      </div>
    );
  }
}

export default PageContribution;
