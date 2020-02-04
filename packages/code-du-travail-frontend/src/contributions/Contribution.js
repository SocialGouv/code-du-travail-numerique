import React from "react";
import styled from "styled-components";
import Link from "next/link";
import {
  Badge,
  Button,
  Heading,
  icons,
  IconStripe,
  InsertTitle,
  Section,
  Subtitle,
  theme,
  Title,
  Toast,
  Wrapper
} from "@socialgouv/react-ui";
import { SOURCES, getRouteBySource } from "@cdt/sources";
import slugify from "@cdt/data/slugify";

import SearchConvention from "../../src/conventions/Search/Form";
import rehypeToReact from "./rehypeToReact";
import Mdx from "../../src/common/Mdx";
import { useLocalStorage } from "../lib/useLocalStorage";

const RefLink = ({ title, url }) => (
  <a href={url} target="_blank" rel="noopener noreferrer">
    {title}
  </a>
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
          <ul>
            {agreementRefs.map(({ agreement, title, index }) => (
              <li key={`${index}-${agreement.id}`}>
                {agreement.url ? (
                  <RefLink
                    key={agreement.id}
                    title={title}
                    url={agreement.url}
                  />
                ) : (
                  <div key={agreement.id}>{title}</div>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
      {laborCodeRef.length !== 0 && (
        <>
          <Subtitle>Code du travail</Subtitle>
          <ul>
            {laborCodeRef.map(ref => (
              <li key={ref.title}>
                <Link
                  href={{
                    pathname: `/${getRouteBySource(SOURCES.CDT)}/[slug]`
                  }}
                  as={`/${getRouteBySource(SOURCES.CDT)}/${slugify(ref.title)}`}
                >
                  <a>{ref.title}</a>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
      {othersRefs.length !== 0 && (
        <>
          <Subtitle>Autres sources</Subtitle>
          <ul>
            {othersRefs.map((ref, index) => (
              <li key={`external-ref-${ref.id}-${index}`}>
                <RefLink title={ref.title} url={ref.url} />
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

const Contribution = ({ answers, content }) => {
  const hasConventionAnswers =
    answers.conventions && answers.conventions.length > 0;
  const [{ convention = {} }, setCcInfo] = useLocalStorage("convention", {});
  const conventionAnswer =
    answers.conventions &&
    answers.conventions.find(
      answer => parseInt(answer.idcc, 10) === convention.num
    );
  // ensure we have valid data in ccInfo
  const isCcDetected = convention.id && convention.num && convention.title;
  return (
    <>
      {hasConventionAnswers && (
        <>
          <Badge />
          <CustomWrapper variant="dark">
            <IconStripe icon={icons.Custom}>
              <InsertTitle>Page personnalisable</InsertTitle>
              {isCcDetected ? (
                <>
                  Cette page a été personnalisée avec l’ajout des{" "}
                  <a href="#customisation">
                    informations de la convention collective :{" "}
                    {convention.shortTitle}
                  </a>
                </>
              ) : (
                <>
                  Le contenu de cette page peut être personnalisé en fonction de
                  votre situation.{" "}
                  <a href="#customisation">Voir en bas de page</a> pour
                  renseigner votre convention collective.
                </>
              )}
            </IconStripe>
          </CustomWrapper>
        </>
      )}
      {answers.generic && (
        <section>
          <Title leftStripped>Que dit le code du travail&nbsp;?</Title>
          <Mdx
            markdown={answers.generic.markdown}
            components={rehypeToReact(content)}
          />
        </section>
      )}
      {hasConventionAnswers && (
        <StyledSection>
          <Wrapper variant="dark">
            <StyledTitle
              shift={spacings.xmedium}
              variant="primary"
              hasMarginTop={Boolean(answers.generic)}
              id="customisation"
            >
              Que dit votre convention collective&nbsp;?
            </StyledTitle>
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
                <StyledDiv>
                  Ce contenu est personnalisé avec les informations de la
                  convention collective:
                </StyledDiv>
                <Toast variant="primary" onRemove={() => setCcInfo({})}>
                  {convention.shortTitle}
                </Toast>
                {(conventionAnswer && (
                  <>
                    <MdxWrapper>
                      <Mdx
                        markdown={conventionAnswer.markdown}
                        components={rehypeToReact}
                      />
                    </MdxWrapper>

                    <References references={conventionAnswer.references} />
                  </>
                )) || (
                  <>
                    <Section>
                      Désolé, nous n’avons pas de réponse pour cette convention
                      collective.
                    </Section>
                  </>
                )}
                <ButtonWrapper>
                  <Button variant="primary" onClick={() => setCcInfo({})}>
                    Changer de convention collective
                    <StyledCloseIcon />
                  </Button>
                </ButtonWrapper>
              </>
            )}
          </Wrapper>
        </StyledSection>
      )}
    </>
  );
};

const { breakpoints, spacings } = theme;

const MdxWrapper = styled.div`
  margin-bottom: ${spacings.medium};
`;

const StyledSection = styled(Section)`
  padding-bottom: 0;
`;

const CustomWrapper = styled(Wrapper)`
  margin-bottom: ${spacings.large};
  @media (max-width: ${breakpoints.mobile}) {
    margin-bottom: ${spacings.medium};
  }
`;

const StyledDiv = styled.div`
  margin-bottom: ${spacings.tiny};
  color: ${({ theme }) => theme.primary};
`;

const StyledTitle = styled(Title)`
  margin-top: ${({ hasMarginTop }) => (hasMarginTop ? spacings.large : "0")};
`;

const ButtonWrapper = styled.div`
  margin: ${spacings.base} 0 !important;
  text-align: center;
`;

const StyledCloseIcon = styled(icons.Close)`
  width: 2.8rem;
  margin-left: ${spacings.base};
`;

export default Contribution;
