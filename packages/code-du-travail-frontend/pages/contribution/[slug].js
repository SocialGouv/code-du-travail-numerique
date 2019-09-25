import React, { useState } from "react";
import { withRouter } from "next/router";
import getConfig from "next/config";
import Link from "next/link";
import fetch from "isomorphic-unfetch";
import styled from "styled-components";
import MDX from "mdx-runtime-slim";

import { Accordion, Alert, icons } from "@cdt/ui-old";
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

// wrap section in Accordion if section has a @data-title
const AnswerSection = props =>
  props["data-title"] ? (
    <StyledAccordion
      items={[
        {
          title: (
            <h3 style={{ paddingLeft: 10, marginBottom: 10 }}>
              {props["data-title"]}
            </h3>
          ),
          body: props.children
        }
      ]}
    />
  ) : (
    <section {...props} />
  );

const components = {
  section: AnswerSection
};

// filter answers by CC
const AnswersCC = ({ answers }) => {
  const [convention, setConvention] = useState();
  const answer = convention && answers.find(a => a.idcc === convention.num);
  // following data/populate.js slug rules
  const slugConvention =
    convention &&
    slugify(`${convention.num}-${convention.title}`.substring(0, 80));

  return (
    <div style={{ marginTop: 40 }}>
      <h3>Que dit votre convention collective ?</h3>
      <div style={{ padding: 10, margin: "20px 0" }}>
        <SearchConvention title="" onSelectConvention={setConvention} />
      </div>
      {convention && (
        <div>
          <h3>Convention {convention.title}</h3>
          {(answer && (
            <div>
              <MDX components={components}>{answer.markdown}</MDX>
              <div>
                <Link
                  href="/convention-collective/[slug]"
                  as={`/convention-collective/${slugConvention}`}
                >
                  <a>Consulter la convention collective complète</a>
                </Link>
              </div>
            </div>
          )) || (
            <Alert variant="warning">
              Désolé nous n&apos;avons pas de réponse pour cette convention
              collective
            </Alert>
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
          sourceType="Réponse détaillée"
          emptyMessage="Cette question n'a pas été trouvée"
          icon={icons.Question}
        >
          <h3>Que dit le code du travail ?</h3>
          <MDX components={components}>
            {answers.general && answers.general.markdown}
          </MDX>
          <AnswersCC answers={answers.conventions} />
        </Answer>
      </PageLayout>
    );
  }
}

const StyledAccordion = styled(Accordion)``;

export default withRouter(Contribution);
