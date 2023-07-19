import { Agreement, getLabelBySource } from "@socialgouv/cdtn-utils";
import {
  Alert,
  Badge,
  Button,
  icons,
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
import { useLocalStorageOnPageLoad } from "../lib/useLocalStorage";
import rehypeToReact from "./rehypeToReact";
import ReferencesJuridiques, { filteredRefs } from "./References";

const Contribution = ({ answers, content }) => {
  /**
   * conventionalAnswer are special kind of contribution that include
   * only one a single ccn answer
   * this allows us to set conventional answer directly for a given ccn
   */
  const isConventionalAnswer = Object.prototype.hasOwnProperty.call(
    answers,
    "conventionAnswer"
  );

  const hasConventionAnswers =
    (answers.conventions && answers.conventions.length > 0) ||
    isConventionalAnswer;

  const [convention, setConvention] =
    useLocalStorageOnPageLoad<Agreement>("convention");
  const isConventionDetected = () =>
    convention && convention.id && convention.num && convention.title;

  let conventionAnswer;
  if (isConventionalAnswer) {
    conventionAnswer = answers.conventionAnswer;
  } else if (convention && answers.conventions) {
    conventionAnswer = answers.conventions.find(
      (answer) => parseInt(answer.idcc, 10) === convention.num
    );
  }
  return (
    <>
      {hasConventionAnswers && (
        <>
          <Badge />
          <section>
            <Wrapper variant="dark">
              <Title shift={spacings.xmedium} variant="primary">
                {isConventionalAnswer ? (
                  <>
                    Que dit la convention <i>{conventionAnswer.shortName}</i>
                    &nbsp;?
                  </>
                ) : (
                  <>Que dit votre convention collective&nbsp;?</>
                )}
              </Title>
              {!isConventionDetected() && !isConventionalAnswer ? (
                <SearchConvention onSelectConvention={setConvention} />
              ) : (
                <>
                  {!isConventionalAnswer && (
                    <>
                      <StyledParagraph noMargin>
                        Ce contenu est personnalisé avec les informations de la
                        convention collective&nbsp;:
                      </StyledParagraph>
                      <Toast
                        variant="secondary"
                        onRemove={() => setConvention()}
                      >
                        {convention.shortTitle}
                        {convention.highlight &&
                          convention.highlight.searchInfo && (
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
                            <StyledParagraph
                              variant="primary"
                              fontSize="small"
                              fontWeight="700"
                              noMargin
                            >
                              {conventionAnswer.highlight.title}
                            </StyledParagraph>
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
                      <p>
                        Consultez les questions-réponses fréquentes pour{" "}
                        <a
                          href={`/convention-collective/${
                            isConventionalAnswer
                              ? conventionAnswer.slug
                              : convention.slug
                          }`}
                        >
                          la convention collective{" "}
                          {isConventionalAnswer
                            ? conventionAnswer.shortName
                            : convention.shortTitle}
                        </a>
                      </p>
                    </>
                  ) : (
                    <Section>
                      Désolé, nous n’avons pas de réponse pour cette convention
                      collective.
                    </Section>
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
          </section>
        </>
      )}
      {answers.generic && (
        <Section>
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
          <ReferencesJuridiques
            references={filteredRefs(answers?.generic?.references, content.url)}
          />
        </Section>
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

const StyledParagraph = styled(Paragraph)`
  margin-bottom: ${spacings.tiny};
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
