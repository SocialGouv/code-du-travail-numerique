import React from "react";
import styled from "styled-components";
import { Alert, Button, Heading, theme, Title } from "@socialgouv/react-ui";
import { formatIdcc } from "@cdt/data/lib";

import SearchConvention from "../../src/conventions/Search/Form";
import rehypeToReact from "./rehypeToReact";
import Mdx from "../../src/common/Mdx";
import { useLocalStorage } from "../lib/useLocalStorage";

const getConventionUrl = id =>
  `https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=${id}`;

const RefLink = ({ title, url }) => (
  <LineRef>
    <a href={url} target="_blank" rel="noopener noreferrer">
      {title}
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
                  title={ref.title}
                  url={getConventionUrl(ref.agreement.id)}
                />
              ))}
            </React.Fragment>
          )}
          {othersRefs.length !== 0 && (
            <React.Fragment>
              <Heading as="h4">Autres sources</Heading>
              {othersRefs.map(ref => (
                <RefLink key={ref.id} title={ref.title} url={ref.url} />
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
  const [ccInfo, setCcInfo] = useLocalStorage("convention", {});
  const { convention = {} } = ccInfo;
  const answer =
    convention && answers.find(a => parseInt(a.idcc, 10) === convention.num);
  // ensure we have valid data in ccInfo
  const isCcDetected =
    ccInfo && convention.id && convention.num && convention.title;
  return (
    <div>
      {!isCcDetected && (
        <StyledSearchConvention
          title=""
          onSelectConvention={({ convention, label }) =>
            setCcInfo({ convention, label })
          }
        />
      )}
      {isCcDetected && (
        <React.Fragment>
          <Heading as="h6">
            <span role="img" aria-label="Icone convention collective">
              📖
            </span>{" "}
            <a
              href={getConventionUrl(convention.id)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {convention.title}
              {convention.num && (
                <React.Fragment>
                  {" "}
                  (IDCC {formatIdcc(convention.num)})
                </React.Fragment>
              )}
            </a>
          </Heading>
          {(answer && (
            <React.Fragment>
              <Mdx markdown={answer.markdown} components={rehypeToReact} />

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
          <Button variant="primary" onClick={() => setCcInfo({})}>
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
        <Title leftStripped>Que dit le code du travail ?</Title>
        <Mdx
          markdown={answers.generic.markdown}
          components={rehypeToReact(content)}
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
