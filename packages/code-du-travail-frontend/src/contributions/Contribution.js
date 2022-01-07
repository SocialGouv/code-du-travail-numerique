import slugify from "@socialgouv/cdtn-slugify";
import { getLabelBySource, SOURCES } from "@socialgouv/cdtn-sources";
import {
  Alert,
  Badge,
  Button,
  icons,
  IconStripe,
  InsertTitle,
  Paragraph,
  Section,
  theme,
  Title,
  Toast,
  Wrapper,
} from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";

import Mdx from "../../src/common/Mdx";
import SearchConvention from "../../src/conventions/Search";
import { A11yLink } from "../common/A11yLink";
import Html from "../common/Html";
import References from "../common/References";
import { useLocalStorage } from "../lib/useLocalStorage";
import rehypeToReact from "./rehypeToReact";

const ReferencesJuridiques = ({ references = [] }) => {
  const refs = references.flatMap(({ category, title, url }) => {
    if (category === "labor_code") {
      return {
        slug: slugify(title),
        title,
        type: SOURCES.CDT,
      };
    }
    if (category === "agreement") {
      return {
        title: `${title} de la convention collective`,
        type: SOURCES.EXTERNALS,
        url,
      };
    }
    return { title, type: SOURCES.EXTERNALS, url };
  });

  if (references.length === 0) {
    return null;
  }
  return <References label="Références" references={refs} accordionList="3" />;
};

const Contribution = ({ answers, content }) => {
  /**
   * conventionalAnswer are special kind of contribution that include
   * only one a single ccn answer
   * this allow us to set conventional answer directly for a given ccn
   */
  const isConventionalAnswer = Object.prototype.hasOwnProperty.call(
    answers,
    "conventionAnswer"
  );

  const filteredRefs = answers?.generic?.references?.filter(
    ({ category, url }) => {
      if (category !== null) return true;
      return url !== content.url;
    }
  );

  const hasConventionAnswers =
    (answers.conventions && answers.conventions.length > 0) ||
    isConventionalAnswer;

  const [convention, setConvention] = useLocalStorage("convention");

  const isConventionDetected =
    convention && convention.id && convention.num && convention.title;

  let conventionAnswer;
  if (isConventionalAnswer) {
    conventionAnswer = answers.conventionAnswer;
  } else if (convention && answers.conventions) {
    conventionAnswer = answers.conventions.find(
      (answer) => parseInt(answer.idcc, 10) === convention.num
    );
  }
  // ensure we have valid data in ccInfo
  return (
    <>
      {hasConventionAnswers && (
        <>
          <Badge />
          <CustomWrapper variant="dark">
            <IconStripe icon={icons.Custom}>
              <StyledInsertTitle as="p">Page personnalisable</StyledInsertTitle>
              {isConventionDetected || isConventionalAnswer ? (
                <Paragraph noMargin>
                  Cette page a été personnalisée avec l’ajout des {}
                  {isConventionalAnswer ? (
                    <a href="#customisation">
                      informations de la convention collective :{" "}
                      {conventionAnswer.shortName}
                    </a>
                  ) : (
                    <a href="#customisation">
                      informations de la convention collective :{" "}
                      {convention.shortTitle}
                    </a>
                  )}
                </Paragraph>
              ) : (
                <Paragraph noMargin>
                  Le contenu de cette page peut être personnalisé en fonction de
                  votre situation.
                  <br />
                  <a href="#customisation">Voir en bas de page</a> pour
                  renseigner votre convention collective.
                </Paragraph>
              )}
            </IconStripe>
          </CustomWrapper>
        </>
      )}
      {answers.generic && (
        <section>
          <Title stripe="left">Que dit le code du travail&nbsp;?</Title>
          {content && (
            <Meta>
              {content.url && (
                <span>
                  Source&nbsp;:{" "}
                  <A11yLink
                    href={content.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {`Fiche: ${getLabelBySource(content.source)}`}
                  </A11yLink>
                </span>
              )}
              {content.url && content.date && (
                <HideOnMobile aria-hidden="true">&nbsp;-&nbsp;</HideOnMobile>
              )}
              {content.date && <span>Mis à jour le&nbsp;: {content.date}</span>}
            </Meta>
          )}

          <Mdx
            markdown={answers.generic.markdown}
            components={rehypeToReact(content)}
          />
          <ReferencesJuridiques references={filteredRefs} />
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
              {isConventionalAnswer ? (
                <>
                  Que dit la convention <i>{conventionAnswer.shortName}</i>
                  &nbsp;?
                </>
              ) : (
                <>Que dit votre convention collective&nbsp;?</>
              )}
            </StyledTitle>
            {!isConventionDetected && !isConventionalAnswer ? (
              <SearchConvention onSelectConvention={setConvention} />
            ) : (
              <>
                {!isConventionalAnswer && (
                  <>
                    <StyledParagraph noMargin>
                      Ce contenu est personnalisé avec les informations de la
                      convention collective&nbsp;:
                    </StyledParagraph>
                    <Toast variant="secondary" onRemove={() => setConvention()}>
                      {convention.shortTitle}
                      {convention.highlight && convention.highlight.searchInfo && (
                        <Paragraph variant="altText" noMargin>
                          {convention.highlight.searchInfo}
                        </Paragraph>
                      )}
                    </Toast>
                  </>
                )}
                {conventionAnswer ? (
                  <>
                    {conventionAnswer.highlight &&
                      conventionAnswer.highlight.content && (
                        <StyledAlert variant="primary">
                          <TitleAlert
                            variant="primary"
                            fontSize="small"
                            fontWeight="700"
                            noMargin
                          >
                            {conventionAnswer.highlight.title}
                          </TitleAlert>
                          <Paragraph fontSize="small" noMargin>
                            <Html>{conventionAnswer.highlight.content}</Html>
                          </Paragraph>
                        </StyledAlert>
                      )}
                    <MdxWrapper>
                      <Mdx
                        markdown={conventionAnswer.markdown}
                        components={rehypeToReact}
                      />
                    </MdxWrapper>

                    <ReferencesJuridiques
                      references={conventionAnswer.references}
                    />
                  </>
                ) : (
                  <>
                    <Section>
                      Désolé, nous n’avons pas de réponse pour cette convention
                      collective.
                    </Section>
                  </>
                )}
                {!isConventionalAnswer && (
                  <ButtonWrapper>
                    <Button variant="primary" onClick={() => setConvention()}>
                      Changer de convention collective
                      <StyledCloseIcon />
                    </Button>
                  </ButtonWrapper>
                )}
              </>
            )}
          </Wrapper>
        </StyledSection>
      )}
    </>
  );
};

const { breakpoints, fonts, spacings } = theme;

const Meta = styled.div`
  display: flex;
  margin-bottom: ${spacings.medium};
  font-size: ${fonts.sizes.small};
  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
  }
`;
const HideOnMobile = styled.span`
  @media (max-width: ${breakpoints.mobile}) {
    display: none;
  }
`;

const MdxWrapper = styled.div`
  margin-bottom: ${spacings.medium};
`;

const StyledInsertTitle = styled(InsertTitle).attrs({
  "aria-level": "2",
  role: "heading",
})``;

const StyledSection = styled(Section)`
  padding-bottom: 0;
`;

const CustomWrapper = styled(Wrapper)`
  margin-bottom: ${spacings.large};
  @media (max-width: ${breakpoints.mobile}) {
    margin-bottom: ${spacings.medium};
  }
`;

const StyledParagraph = styled(Paragraph)`
  margin-bottom: ${spacings.tiny};
`;

const TitleAlert = styled(Paragraph)`
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

const StyledAlert = styled(Alert)`
  margin-top: ${spacings.base};
  background-color: ${({ theme }) => theme.bgPrimary};
`;

export default Contribution;
