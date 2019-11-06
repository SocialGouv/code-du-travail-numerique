import React from "react";
import Link from "next/link";
import styled from "styled-components";
import createPersistedState from "use-persisted-state";

import slugify from "@cdt/data/slugify";
import { Accordion, Alert, Button, theme } from "@socialgouv/react-ui";

import SearchConvention from "../../src/conventions/Search/Form";
import Mdx from "../../src/common/Mdx";
import makeArticlesLinks from "./makeArticlesLinks";

// store selected convention in localStorage
const useConventionState = createPersistedState("convention");

// hack: todo: remove
// will be fixed at source level
const fixMarkdown = md =>
  md &&
  md
    .replace(/<Tab([^>]+)>/g, '<section type="tab"$1>')
    .replace(/<\/Tab>/g, "</section>")
    .replace(/<HDN>/g, '<section type="hdn">')
    .replace(/<\/HDN>/g, "</section>");

// wrap section in custom components if section has a @data-type
const AnswerSection = props => {
  switch (props["type"]) {
    // situations
    case "tab":
      return (
        <StyledAccordion
          items={[
            {
              title: <h3>{props["title"]}</h3>,
              body: props.children
            }
          ]}
        />
      );
    case "hdn":
      return (
        <Alert variant="info">
          <h4>Texte applicable</h4>
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
      <Button variant="secondary">Consulter la convention collective</Button>
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
  const [ccInfo, setCcInfo] = useConventionState(null);
  const answer = ccInfo && answers.find(a => a.idcc === ccInfo.num);
  return (
    <React.Fragment>
      {!ccInfo && (
        <StyledSearchConvention
          title=""
          onSelectConvention={({ convention }) => setCcInfo(convention)}
        />
      )}
      {ccInfo && (
        <React.Fragment>
          <h6>
            {ccInfo.title}
            {ccInfo.num && (
              <React.Fragment> (IDCC {ccInfo.num})</React.Fragment>
            )}
          </h6>
          {(answer && (
            <React.Fragment>
              <AnswerConvention markdown={fixMarkdown(answer.markdown)} />
              <LinkConvention num={ccInfo.num} title={ccInfo.title} />
            </React.Fragment>
          )) || (
            <React.Fragment>
              <NoConventionAlert variant="warning">
                Désolé nous n&apos;avons pas de réponse pour cette convention
                collective
              </NoConventionAlert>
              <LinkConvention num={ccInfo.num} title={ccInfo.title} />
            </React.Fragment>
          )}
          <br />
          <br />
          <Button variant="primary" onClick={() => setCcInfo(null)}>
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
          markdown={fixMarkdown(answers.generic.markdown)}
          components={components}
        />
      </SectionCdt>
    )}
    {(answers.conventions && answers.conventions.length && (
      <section>
        <h2>Que dit votre convention collective ?</h2>
        <AnswersConventions answers={answers.conventions} />
      </section>
    )) ||
      null}
  </React.Fragment>
);

const { box, spacing } = theme;

const NoConventionAlert = styled(Alert)`
  margin: 40px 0;
`;

const SectionCdt = styled.section`
  padding: ${spacing.small} ${spacing.medium};
  background: white;
`;

const StyledSearchConvention = styled(SearchConvention)`
  margin: ${spacing.medium} 0;
  padding: ${spacing.small};
`;

const StyledAccordion = styled(Accordion)`
  *[data-accordion-component="AccordionItem"] {
    &:nth-of-type(1) {
      border-bottom: ${box.border};
    }
  }
  *[data-accordion-component="AccordionItemButton"] {
    padding-left: ${spacing.small};
  }
`;

export default Contribution;
