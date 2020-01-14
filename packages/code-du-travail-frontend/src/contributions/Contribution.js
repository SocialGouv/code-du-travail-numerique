import React from "react";
import styled from "styled-components";
import Link from "next/link";
import {
  Badge,
  Button,
  Heading,
  icons,
  IconStripe,
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
              <CustomTitle>Page personnalisable</CustomTitle>
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
                  renseigner votre covention collective.
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

const { breakpoints, fonts, spacings } = theme;

const LineRef = styled.li`
  margin: 5px 0;
  list-style-type: none;
`;

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

const CustomTitle = styled.div`
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
  font-size: ${fonts.sizes.headings.small};
  @media (max-width: ${breakpoints.mobile}) {
    font-size: ${fonts.sizes.default};
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
  margin: ${spacings.base} 0;
  text-align: center;
`;

const StyledCloseIcon = styled(icons.Close)`
  width: 2.8rem;
  margin-left: ${spacings.base};
`;

export default Contribution;
