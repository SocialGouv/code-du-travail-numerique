import React from "react";
import { withRouter } from "next/router";
import getConfig from "next/config";
import Link from "next/link";
import dynamic from "next/dynamic";
import fetch from "isomorphic-unfetch";
import styled from "styled-components";
import createPersistedState from "use-persisted-state";

import { Accordion, Alert, icons, Button } from "@cdt/ui-old";
import slugify from "@cdt/data/slugify";

import Answer from "../../src/common/Answer";
import SearchConvention from "../../src/conventions/Search/Form";
import { PageLayout } from "../../src/layout/PageLayout";
import Metas from "../../src/common/Metas";

// store selected convention in localStorage
const useConventionState = createPersistedState("convention");

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

const DynamicMdx = dynamic(() => import("../../src/common/Mdx"));

const fetchQuestion = ({ slug }) =>
  fetch(`${API_URL}/items/contributions/${slug}`);

// basic article matcher for internal links
const makeArticlesLinks = markdown => {
  const articleRegex = /([^[])([LRD]\d+[^\s]+)\b/gi;
  let match;
  let str2 = markdown;
  while ((match = articleRegex.exec(markdown))) {
    str2 = str2.replace(
      new RegExp(`[^[](${match[2]})`),
      (_, match2) =>
        `${match[1]}[${match[2]}](/code-du-travail/${match2.toLowerCase()})`
    );
  }
  return str2;
};

// Tus : TODO
// const tests = [
//   "Article L3123-5",
//   "Article L3123-5 et L234-12",
//   "Article L3123-5 et [L234-12](http://travail.gouv.fr)",
//   "Article L3123-5, L3123-7, L3123-52-1",
//   "Article L3123-5, L3123-7, L3123-52-1 et L3123-7, L3123-52-1",
//   "XD2432-1",
//   "D12"
// ];

// wrap section in custom components if section has a @data-type
const AnswerSection = props => {
  switch (props["data-type"]) {
    // situations
    case "tab":
      return (
        <StyledAccordion
          items={[
            {
              title: <h3>{props["data-title"]}</h3>,
              body: props.children
            }
          ]}
        />
      );
    // sources juridiques
    case "source":
      return (
        <Alert variant="info">
          SOURCE
          <div {...props} />
        </Alert>
      );
    // hierarchie des normes
    case "hdn":
      return (
        <Alert variant="secondary">
          HDN
          <div {...props} />
        </Alert>
      );
    default:
      return <section {...props} />;
  }
};

const components = {
  section: AnswerSection
};

// following data/populate.js slug rules
const getConventionSlug = convention =>
  slugify(`${convention.num}-${convention.title}`.substring(0, 80));

// search CC + display filtered answer
const AnswersConventions = ({ answers }) => {
  const [convention, setConvention] = useConventionState(null);
  const answer = convention && answers.find(a => a.idcc === convention.num);

  const slugConvention = convention && getConventionSlug(convention);

  return (
    <Section>
      <h3>Que dit votre convention collective ?</h3>
      {!convention && (
        <StyledSearchConvention title="" onSelectConvention={setConvention} />
      )}
      {convention && (
        <React.Fragment>
          <h6>Convention {convention.title}</h6>
          {(answer && (
            <div>
              <DynamicMdx
                markdown={makeArticlesLinks(answer.markdown)}
                components={components}
              />
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
            <div>
              <Alert variant="warning">
                Désolé nous n&apos;avons pas de réponse pour cette convention
                collective
              </Alert>
              <Link
                href="/convention-collective/[slug]"
                as={`/convention-collective/${slugConvention}`}
              >
                <a>Consulter la convention collective complète</a>
              </Link>
            </div>
          )}
          <br />
          <Button variant="primary" onClick={() => setConvention(null)}>
            Changer de convention collective
          </Button>
        </React.Fragment>
      )}
    </Section>
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
            {answers.generic && (
              <Section style={{ marginBottom: 20 }}>
                <h3>Que dit le code du travail ?</h3>
                <DynamicMdx
                  markdown={makeArticlesLinks(answers.generic.markdown)}
                  components={components}
                />
              </Section>
            )}
            <AnswersConventions answers={answers.conventions} />
          </Answer>
        </PageLayout>
      </div>
    );
  }
}

const Section = styled.section`
  padding: 10px 20px;
  background: #f6f6f6;
  border-radius: 3px;
  border: 1px solid #efefef;
`;

const StyledSearchConvention = styled(SearchConvention)`
  padding: 10px;
  margin: 20px 0;
`;

const StyledAccordion = styled(Accordion)`
  *[data-accordion-component="AccordionItem"] {
    margin-bottom: 20px;
  }
  *[data-accordion-component="AccordionItemButton"] {
    padding-left: 10px;
  }
`;

const Spacer = styled.div`
  height: 40px;
`;

export default withRouter(Contribution);
