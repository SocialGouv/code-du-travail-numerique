import React from "react";
import styled from "styled-components";
import createPersistedState from "use-persisted-state";
import FicheServicePublic from "@socialgouv/react-fiche-service-public";
import { Accordion, Alert, Button, theme } from "@socialgouv/react-ui";

import SearchConvention from "../../src/conventions/Search/Form";
import Mdx from "../../src/common/Mdx";

// store selected convention in localStorage
const useConventionState = createPersistedState("convention");

const getConventionUrl = id =>
  `https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=${id}`;

//Custom MDX component
const Tab = props => (
  <StyledAccordion
    items={[
      {
        title: <h3>{props.title}</h3>,
        body: props.children
      }
    ]}
  />
);

const Hdn = props => (
  <Alert variant="info">
    <h4>Texte applicable</h4>
    <div {...props} />
  </Alert>
);

const customComponentsMdx = {
  tab: Tab,
  hdn: Hdn
};

const RefLink = ({ value, url }) => (
  <LineRef>
    <a href={url} target="_blank" rel="noopener noreferrer">
      {value}
    </a>
  </LineRef>
);

const References = ({ references }) => {
  const agreementRefs =
    (references && references.filter(ref => !!ref.agreement)) || [];
  const othersRefs =
    (references && references.filter(ref => !ref.agreement)) || [];

  return (
    <React.Fragment>
      {references && references.length && (
        <React.Fragment>
          <h3>Références</h3>
          {/* group CCs references */}
          {agreementRefs.length !== 0 && (
            <React.Fragment>
              <h4>Convention collective</h4>
              {agreementRefs.map(ref => (
                <RefLink
                  key={ref.id}
                  value={ref.value}
                  url={getConventionUrl(ref.agreement.id)}
                />
              ))}
            </React.Fragment>
          )}
          {othersRefs.length !== 0 && (
            <React.Fragment>
              <h4>Autres sources</h4>
              {othersRefs.map(ref => (
                <RefLink key={ref.id} value={ref.value} url={ref.url} />
              ))}
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

// search CC + display filtered answer
const AnswersConventions = ({ answers }) => {
  const [ccInfo, setCcInfo] = useConventionState(null);
  const answer = ccInfo && answers.find(a => a.idcc === ccInfo.num);
  return (
    <div>
      {!ccInfo && (
        <StyledSearchConvention
          title=""
          onSelectConvention={({ convention }) => setCcInfo(convention)}
        />
      )}
      {ccInfo && (
        <React.Fragment>
          <h6>
            <span role="img" aria-label="Icone convention collective">
              📖
            </span>{" "}
            <a
              href={getConventionUrl(ccInfo.id)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {ccInfo.title}
              {ccInfo.num && (
                <React.Fragment> (IDCC {ccInfo.num})</React.Fragment>
              )}
            </a>
          </h6>
          {(answer && (
            <React.Fragment>
              <Mdx
                markdown={answer.markdown}
                components={customComponentsMdx}
              />

              <References references={answer.references} />
            </React.Fragment>
          )) || (
            <React.Fragment>
              <NoConventionAlert variant="warning">
                Désolé nous n&apos;avons pas de réponse pour cette convention
                collective
              </NoConventionAlert>
            </React.Fragment>
          )}
          <br />
          <br />
          <Button variant="primary" onClick={() => setCcInfo(null)}>
            Changer de convention collective
          </Button>
        </React.Fragment>
      )}
    </div>
  );
};

const Contribution = ({ answers, content }) => (
  <React.Fragment>
    {answers.generic && (
      <SectionAnswer>
        <h2>Que dit le code du travail ?</h2>
        {content && content.raw && (
          <StyledContent>
            <FicheServicePublic data={JSON.parse(content.raw).children} />
          </StyledContent>
        )}
        <Mdx
          markdown={answers.generic.markdown}
          components={customComponentsMdx}
        />
      </SectionAnswer>
    )}
    {(answers.conventions && answers.conventions.length && (
      <SectionAnswer>
        <h2>Que dit votre convention collective ?</h2>
        <AnswersConventions answers={answers.conventions} />
      </SectionAnswer>
    )) ||
      null}
  </React.Fragment>
);

const { box, spacing } = theme;

const LineRef = styled.li`
  margin: 5px 0;
  list-style-type: none;
`;

const NoConventionAlert = styled(Alert)`
  margin: 40px 0;
`;

const StyledContent = styled.div`
  margin-bottom: ${spacing.large};
`;

const SectionAnswer = styled.section`
  margin-bottom: ${spacing.medium};
  padding: ${spacing.small} ${spacing.medium};
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
