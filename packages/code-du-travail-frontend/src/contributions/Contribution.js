import React from "react";
import styled from "styled-components";
import createPersistedState from "use-persisted-state";
import { Alert, Button, Heading, theme, Title } from "@socialgouv/react-ui";

import SearchConvention from "../../src/conventions/Search/Form";
import customComponentsMdx from "./externalContent";
import Mdx from "../../src/common/Mdx";

// store selected convention in localStorage
const useConventionState = createPersistedState("convention");

const getConventionUrl = id =>
  `https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=${id}`;

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
      {references && references.length !== 0 && (
        <React.Fragment>
          <Title as="h3">Références</Title>
          {/* group CCs references */}
          {agreementRefs.length !== 0 && (
            <React.Fragment>
              <Heading as="h4">Convention collective</Heading>
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
              <Heading as="h4">Autres sources</Heading>
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
          <Heading as="h6">
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
          </Heading>
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
              <NoConventionAlert variant="secondary">
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
        <Title>Que dit le code du travail ?</Title>
        <Mdx
          markdown={answers.generic.markdown}
          components={customComponentsMdx(content)}
        />
      </SectionAnswer>
    )}
    {(answers.conventions && answers.conventions.length && (
      <SectionAnswer>
        <Title>Que dit votre convention collective ?</Title>
        <AnswersConventions answers={answers.conventions} />
      </SectionAnswer>
    )) ||
      null}
  </React.Fragment>
);

const { spacings } = theme;

const LineRef = styled.li`
  margin: 5px 0;
  list-style-type: none;
`;

const NoConventionAlert = styled(Alert)`
  margin: 40px 0;
`;

const SectionAnswer = styled.section`
  margin-bottom: ${spacings.medium};
  padding: ${spacings.small} ${spacings.medium};
`;

const StyledSearchConvention = styled(SearchConvention)`
  margin: ${spacings.medium} 0;
  padding: ${spacings.small};
`;

export default Contribution;
