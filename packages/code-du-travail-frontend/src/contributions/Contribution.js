import React from "react";
import Link from "next/link";
import styled from "styled-components";
import createPersistedState from "use-persisted-state";

import slugify from "@cdt/data/slugify";
import { Accordion, Alert, Button, theme } from "@cdt/ui-old";

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
        <Alert variant="info">
          <h4>Sources juridiques</h4>
          <div {...props} />
        </Alert>
      );
    // hierarchie des normes
    case "hdn":
      return (
        <Alert variant="info">
          <h4>Texte juridique applicable</h4>
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
      <SectionCdt bgColor="white" style={{ marginBottom: 20 }}>
        <h2>Que dit le code du travail ?</h2>
        <Mdx
          markdown={makeArticlesLinks(answers.generic.markdown)}
          components={components}
        />
      </SectionCdt>
    )}
    {answers.conventions && (
      <SectionConvention>
        <h2>Que dit votre convention collective ?</h2>
        <AnswersConventions answers={answers.conventions} />
      </SectionConvention>
    )}
  </React.Fragment>
);

const NoConventionAlert = styled(Alert)`
  margin: 40px 0;
`;

const SectionCdt = styled.section`
  padding: ${theme.spacing.small} ${theme.spacing.medium};
  background: white;
`;

const SectionConvention = styled.section`
  padding: ${theme.spacing.small} ${theme.spacing.medium};
  background: #f6f6f6;
  border-radius: ${theme.box.lightBorderRadius};
  border: 1px solid #efefef;
`;

const StyledSearchConvention = styled(SearchConvention)`
  padding: ${theme.spacing.small};
  margin: ${theme.spacing.medium} 0;
`;

const StyledAccordion = styled(Accordion)`
  *[data-accordion-component="AccordionItem"] {
    &:nth-of-type(1) {
      border-bottom: 1px solid ${theme.colors.elementBorder};
    }
  }
  *[data-accordion-component="AccordionItemButton"] {
    padding-left: ${theme.spacing.small};
  }
`;

export default Contribution;
