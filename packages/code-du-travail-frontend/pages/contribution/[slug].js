import React from "react";
import getConfig from "next/config";
import fetch from "isomorphic-unfetch";

import { icons } from "@cdt/ui-old";

import Answer from "../../src/common/Answer";
import Contribution from "../../src/contributions/Contribution";
import { PageLayout } from "../../src/layout/PageLayout";
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
      data = {
        _source: {},
        relatedItems: {}
      },
      pageUrl,
      ogImage
    } = this.props;

    const { title, answers, description } = data._source;
    return (
      <div>
        <PageLayout>
          <Metas
            url={pageUrl}
            title={title}
            description={description}
            image={ogImage}
          />
          <Answer
            title={title}
            sourceType="Réponse détaillée"
            emptyMessage="Cette question n'a pas été trouvée"
            icon={icons.Question}
          >
            <Contribution answers={answers} />
          </Answer>
        </PageLayout>
      </div>
    );
  }
}

export default PageContribution;
