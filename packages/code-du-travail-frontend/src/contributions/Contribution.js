import React from "react";
import Link from "next/link";
import styled from "styled-components";
import createPersistedState from "use-persisted-state";

import slugify from "@cdt/data/slugify";
import { Accordion, Alert, Button } from "@cdt/ui-old";

import SearchConvention from "../../src/conventions/Search/Form";
import Mdx from "../../src/common/Mdx";
import makeArticlesLinks from "./makeArticlesLinks";

// store selected convention in localStorage
const useConventionState = createPersistedState("convention");

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
        <Alert variant="secondary">
          <h4>Sources juridiques</h4>
          <div {...props} />
        </Alert>
      );
    // hierarchie des normes
    case "hdn":
      return (
        <Alert variant="secondary">
          <h4>Hierarchie des normes</h4>
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
const getConventionSlug = ({ num, title }) =>
  slugify(`${num}-${title}`.substring(0, 80));

const LinkConvention = ({ num, title }) => {
  const slugConvention = getConventionSlug({ num, title });
  return (
    <Link
      href="/convention-collective/[slug]"
      as={`/convention-collective/${slugConvention}`}
    >
      <Button variant="secondary">
        Consulter la convention collective complète
      </Button>
    </Link>
  );
};

const AnswerConvention = ({ markdown }) => (
  <div
    style={{
      backgroundColor: "white",
      padding: 10,
      marginBottom: 20
    }}
  >
    <Mdx markdown={makeArticlesLinks(markdown)} components={components} />
  </div>
);

// search CC + display filtered answer
const AnswersConventions = ({ answers }) => {
  const [convention, setConvention] = useConventionState(null);
  const answer = convention && answers.find(a => a.idcc === convention.num);

  return (
    <React.Fragment>
      {!convention && (
        <StyledSearchConvention title="" onSelectConvention={setConvention} />
      )}
      {convention && (
        <React.Fragment>
          <h6>{convention.title}</h6>
          {(answer && (
            <React.Fragment>
              <AnswerConvention markdown={answer.markdown} />
              <LinkConvention num={convention.num} title={convention.title} />
            </React.Fragment>
          )) || (
            <React.Fragment>
              <NoConventionAlert variant="warning">
                Désolé nous n&apos;avons pas de réponse pour cette convention
                collective
              </NoConventionAlert>
              <LinkConvention num={convention.num} title={convention.title} />
            </React.Fragment>
          )}
          <br />
          <br />
          <Button variant="primary" onClick={() => setConvention(null)}>
            Changer de convention collective
          </Button>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

const Contribution = ({ answers }) => (
  <React.Fragment>
    {answers.generic && (
      <Section bgColor="white" style={{ marginBottom: 20 }}>
        <h3>Que dit le code du travail ?</h3>
        <Mdx
          markdown={makeArticlesLinks(answers.generic.markdown)}
          components={components}
        />
      </Section>
    )}
    {answers.conventions && (
      <Section>
        <h3>Que dit votre convention collective ?</h3>
        <AnswersConventions answers={answers.conventions} />
      </Section>
    )}
  </React.Fragment>
);

const NoConventionAlert = styled(Alert)`
  margin: 40px 0;
`;

const Section = styled.section`
  padding: 10px 20px;
  background: ${props => (props.bgColor ? props.bgColor : "#f6f6f6")};
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

export default Contribution;
