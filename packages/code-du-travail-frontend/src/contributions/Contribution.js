import React from "react";
import styled from "styled-components";
import Link from "next/link";
import {
  Alert,
  Button,
  Heading,
  Subtitle,
  theme,
  Title
} from "@socialgouv/react-ui";
import { SOURCES, getRouteBySource } from "@cdt/sources";
import slugify from "@cdt/data/slugify";
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

const References = ({ references = [] }) => {
  const agreementRefs = references.filter(ref => Boolean(ref.agreement));
  const laborCodeRef = references.filter(ref => ref.category === "labor_code");
  const othersRefs = references.filter(
    ref => !ref.agreement && ref.category !== "labor_code"
  );
  if (references.length === 0) {
    return null;
  }

  return (
    <>
      <Heading>Références</Heading>
      {agreementRefs.length !== 0 && (
        <>
          <Subtitle>Convention collective</Subtitle>
          {agreementRefs.map(({ agreement }) =>
            agreement.url ? (
              <RefLink
                key={agreement.id}
                title={agreement.title}
                url={agreement.url}
              />
            ) : (
              <div key={agreement.id}>{agreement.title}</div>
            )
          )}
        </>
      )}
      {laborCodeRef.length !== 0 && (
        <>
          <Subtitle>Code du travail</Subtitle>
          {laborCodeRef.map(ref => (
            <Link
              key={ref.title}
              href={{
                pathname: `/${getRouteBySource(SOURCES.CDT)}/[slug]`
              }}
              as={`/${getRouteBySource(SOURCES.CDT)}/${slugify(ref.title)}`}
            >
              <a>{ref.title}</a>
            </Link>
          ))}
        </>
      )}
      {othersRefs.length !== 0 && (
        <>
          <Subtitle>Autres sources</Subtitle>
          {othersRefs.map((ref, id) => (
            <RefLink
              key={`external-ref-${id}`}
              title={ref.title}
              url={ref.url}
            />
          ))}
        </>
      )}
    </>
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
        <SearchConvention
          title=""
          onSelectConvention={({ convention, label }) =>
            setCcInfo({ convention, label })
          }
        />
      )}
      {isCcDetected && (
        <>
          <Heading as="h4">
            <span role="img" aria-label="Icone convention collective">
              📖
            </span>{" "}
            {convention.url ? (
              <a
                href={convention.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {convention.title} (IDCC {formatIdcc(convention.num)})
              </a>
            ) : (
              <>
                {convention.title} (IDCC {formatIdcc(convention.num)})
              </>
            )}
          </Heading>
          {(answer && (
            <>
              <MdxWrapper>
                <Mdx markdown={answer.markdown} components={rehypeToReact} />
              </MdxWrapper>

              <References references={answer.references} />
            </>
          )) || (
            <>
              <NoConventionAlert variant="secondary">
                Désolé nous n&apos;avons pas de réponse pour cette convention
                collective
              </NoConventionAlert>
            </>
          )}
          <br />
          <Button variant="primary" onClick={() => setCcInfo({})}>
            Changer de convention collective
          </Button>
        </>
      )}
    </div>
  );
};

const Contribution = ({ answers, content }) => (
  <>
    {answers.generic && (
      <section>
        <Title leftStripped>Que dit le code du travail ?</Title>
        <Mdx
          markdown={answers.generic.markdown}
          components={rehypeToReact(content)}
        />
      </section>
    )}
    {answers.conventions && answers.conventions.length && (
      <section>
        <StyledTitle marginTop={Boolean(answers.generic)}>
          Que dit votre convention collective ?
        </StyledTitle>
        <AnswersConventions answers={answers.conventions} />
      </section>
    )}
  </>
);

const { spacings } = theme;

const LineRef = styled.li`
  margin: 5px 0;
  list-style-type: none;
`;

const MdxWrapper = styled.div`
  margin-bottom: ${spacings.medium};
`;

const StyledTitle = styled(Title)`
  margin-top: ${({ marginTop }) => (marginTop ? spacings.large : "0")};
`;

const NoConventionAlert = styled(Alert)`
  margin: 40px 0;
`;

export default Contribution;
