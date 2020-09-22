import slugify from "@socialgouv/cdtn-slugify";
import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-sources";
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
  Wrapper,
} from "@socialgouv/cdtn-ui";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

import Mdx from "../../src/common/Mdx";
import SearchConvention from "../../src/conventions/Search";
import { useLocalStorage } from "../lib/useLocalStorage";
import rehypeToReact from "./rehypeToReact";

const RefLink = ({ title, url }) =>
  url ? (
    <a href={url} target="_blank" rel="noopener noreferrer">
      {title}
    </a>
  ) : (
    <span>{title}</span>
  );

const References = ({ references = [] }) => {
  const agreementRefs = references.filter(
    (ref) => ref.category === "agreement"
  );
  const laborCodeRef = references.filter(
    (ref) => ref.category === "labor_code"
  );
  const othersRefs = references.filter(
    (ref) => !["agreement", "labor_code"].includes(ref.category)
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
            {agreementRefs.map(({ url, title, index }) => (
              <li key={`agreement_ref${index}`}>
                <RefLink title={title} url={url} />
              </li>
            ))}
          </ul>
        </>
      )}
      {laborCodeRef.length !== 0 && (
        <>
          <Subtitle>Code du travail</Subtitle>
          <ul>
            {laborCodeRef.map((ref, index) => (
              <li key={`laborCode_ref${index}`}>
                <Link
                  href={{
                    pathname: `/${getRouteBySource(SOURCES.CDT)}/[slug]`,
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
            {othersRefs.map(({ title, url }, index) => (
              <li key={`otherRef_${index}`}>
                <RefLink title={title} url={url} />
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
  const [convention, setConvention] = useLocalStorage("convention");
  const conventionAnswer =
    convention &&
    answers.conventions &&
    answers.conventions.find(
      (answer) => parseInt(answer.idcc, 10) === convention.num
    );
  // ensure we have valid data in ccInfo
  const isConventionDetected =
    convention && convention.id && convention.num && convention.title;
  return (
    <>
      {hasConventionAnswers && (
        <>
          <Badge />
          <CustomWrapper variant="dark">
            <IconStripe icon={icons.Custom}>
              <InsertTitle>Page personnalisable</InsertTitle>
              {isConventionDetected ? (
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
                  votre situation.
                  <br />
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
          <Title stripe="left">Que dit le code du travail&nbsp;?</Title>
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
            {!isConventionDetected ? (
              <SearchConvention onSelectConvention={setConvention} />
            ) : (
              <>
                <StyledDiv>
                  Ce contenu est personnalisé avec les informations de la
                  convention collective:
                </StyledDiv>
                <Toast variant="secondary" onRemove={() => setConvention()}>
                  {convention.shortTitle}
                </Toast>
                {conventionAnswer ? (
                  <>
                    <MdxWrapper>
                      <Mdx
                        markdown={conventionAnswer.markdown}
                        components={rehypeToReact}
                      />
                    </MdxWrapper>

                    <References references={conventionAnswer.references} />
                  </>
                ) : (
                  <>
                    <Section>
                      Désolé, nous n’avons pas de réponse pour cette convention
                      collective.
                    </Section>
                  </>
                )}
                <ButtonWrapper>
                  <Button variant="primary" onClick={() => setConvention()}>
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
