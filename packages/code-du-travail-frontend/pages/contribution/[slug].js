import React, { useState } from "react";
import { withRouter } from "next/router";
import getConfig from "next/config";
import fetch from "isomorphic-unfetch";

import { icons } from "@cdt/ui-old";

import Answer from "../../src/common/Answer";
import SearchConvention from "../../src/conventions/Search/Form";
import { PageLayout } from "../../src/layout/PageLayout";
import Metas from "../../src/common/Metas";

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

const fetchQuestion = ({ slug }) =>
  fetch(`${API_URL}/items/contributions/${slug}`);

// filter answers by CC
const AnswersCC = ({ answers }) => {
  const [convention, setConvention] = useState();
  const answer = convention && answers.find(a => a.idcc === convention.num);
  return (
    <div>
      <div style={{ background: "#efefef", padding: 10, margin: "20px 0" }}>
        <SearchConvention
          title="Que dit votre convention collective ?"
          onSelectConvention={setConvention}
        />
      </div>
      {convention && (
        <div>
          <h3>Convention {convention.title}</h3>
          {(answer && (
            <div dangerouslySetInnerHTML={{ __html: answer.html }}></div>
          )) || (
            <div>
              Désolé nous n&apos;avons pas de réponse pour cette convention
              collective
            </div>
          )}
        </div>
      )}
    </div>
  );
};

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
          intro={<h3>Que dit le code du travail ?</h3>}
        >
          <AnswersCC answers={answers.conventions} />
        </Answer>
      </PageLayout>
    );
  }
}

export default withRouter(Contribution);
