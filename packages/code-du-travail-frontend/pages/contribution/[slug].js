import React, { useState } from "react";
import { withRouter } from "next/router";
import getConfig from "next/config";
import Link from "next/link";
import fetch from "isomorphic-unfetch";

import { icons } from "@cdt/ui-old";
import slugify from "@cdt/data/slugify";

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
  // following data/populate.js slug rule
  const slugConvention =
    convention &&
    slugify(`${convention.num}-${convention.title}`.substring(0, 80));
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
            <div>
              <div dangerouslySetInnerHTML={{ __html: answer.html }}></div>
              <div>
                <Link
                  href="/convention-collective/[slug]"
                  as={`/convention-collective/${slugConvention}`}
                >
                  <a>Lien vers la convention collective complète</a>
                </Link>
              </div>
            </div>
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
          intro={<h3>Que dit le code du travail ?</h3>}
          title={title}
          sourceType="Réponse détaillée"
          html={answers.general.html}
          emptyMessage="Cette question n'a pas été trouvée"
          icon={icons.Question}
        >
          <AnswersCC answers={answers.conventions} />
        </Answer>
      </PageLayout>
    );
  }
}

export default withRouter(Contribution);
