import React from "react";
import { withRouter } from "next/router";
import getConfig from "next/config";
import fetch from "isomorphic-unfetch";

import { icons } from "@cdt/ui-old";

import Answer from "../../src/common/Answer";

import { PageLayout } from "../../src/layout/PageLayout";
import Metas from "../../src/common/Metas";

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

const fetchQuestion = ({ slug }) =>
  fetch(`${API_URL}/items/contributions/${slug}`);

class Contribution extends React.Component {
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
      <PageLayout>
        <Metas
          url={pageUrl}
          title={title}
          description={description}
          image={ogImage}
        />
        <Answer
          title={title}
          emptyMessage="Cette question n'a pas été trouvée"
          html={answers.general.html}
          sourceType="Réponse détaillée"
          icon={icons.Question}
        >
          {answers.conventions.map(answer => {
            return (
              <div>
                <h3>Convention {answer.idcc}</h3>
                <div dangerouslySetInnerHTML={{ __html: answer.html }}></div>
              </div>
            );
          })}
        </Answer>
      </PageLayout>
    );
  }
}

export default withRouter(Contribution);
