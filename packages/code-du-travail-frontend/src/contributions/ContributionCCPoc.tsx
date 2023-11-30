import { Agreement, getLabelBySource } from "@socialgouv/cdtn-utils";
import {
  Alert,
  Badge,
  Button,
  Heading,
  icons,
  Paragraph,
  Section,
  Text,
  theme,
  Title,
  Toast,
  Wrapper,
} from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";

import Mdx from "../common/Mdx";
import SearchConvention from "../conventions/Search";
import { A11yLink } from "../common/A11yLink";
import Html from "../common/Html";
import { useLocalStorageOnPageLoad } from "../lib/useLocalStorage";
import rehypeToReact from "./rehypeToReact";
import ReferencesJuridiques, { filteredRefs } from "./OldReferences";

const ContributionCCPoc = ({ answers, content, slug }) => {
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
                    Que dit la convention{" "}
                    <Text italic>{conventionAnswer.shortName}</Text>
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
                    <>
                      <p>
                        Désolé, nous n’avons pas de réponse pour cette
                        convention collective.
                      </p>
                      <p>
                        Vous pouvez consulter les informations prévues par le
                        code du travail ci-dessous.
                      </p>
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
          </section>
        </>
      )}
      {conventionAnswer && (
        <StyledSection>
          <Alert>
            <Heading as="p">Texte applicable</Heading>
            {slug.endsWith("les-conges-pour-evenements-familiaux") ? (
              <>
                <p>
                  Si les durées prévues par le code du travail sont plus longues
                  que celles prévues par la convention collective, le salarié a
                  droit aux congés prévus par le code du travail (voir
                  ci-dessous).
                </p>
                <p>
                  Un accord collectif d’entreprise peut également prévoir des
                  durées plus longues qui s’appliqueront.
                </p>
                <p>
                  Le code du travail ou un accord collectif d’entreprise peut
                  aussi prévoir des congés pour d’autres événements familiaux
                  qui ne sont pas prévus par la convention collective. Dans ce
                  cas ces congés s’appliqueront aux salariés.
                </p>
                <p>
                  Notez enfin que le contrat de travail peut toujours prévoir
                  des mesures plus favorables pour le salarié, qui
                  s’appliqueront.
                </p>
              </>
            ) : slug.endsWith("la-periode-dessai-peut-elle-etre-renouvelee") ? (
              <>
                <p>
                  Les mesures prévues par la convention ou l’accord collectif de
                  branche ou le contrat de travail s’appliquent en plus de
                  celles prévues par le code du travail (ci-dessous).
                </p>
                <p>
                  Exemple : la convention collective peut prévoir que l’accord
                  écrit pour le renouvellement de la période d’essai doit être
                  signé 3 jours avant la fin de la période d’essai d’initiale.
                </p>
              </>
            ) : (
              <>
                <p>
                  Si le code du travail (voir ci-dessous) prévoit des conditions
                  - durée du préavis et/ou ancienneté - plus favorables que la
                  convention collective pour le salarié, l’employeur les
                  applique.
                </p>

                <p>
                  Un accord d’entreprise ou un usage peut également prévoir des
                  conditions - durée du préavis et/ou ancienneté - plus
                  favorables pour le salarié qui s’appliqueront.
                </p>
                <p>
                  Notez enfin que le contrat de travail peut toujours prévoir
                  des mesures plus favorables pour le salarié qui
                  s’appliqueront.
                </p>
              </>
            )}
          </Alert>
        </StyledSection>
      )}
      {answers.generic && (
        <SectionNoPadding>
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
          {slug === "quelle-est-la-duree-de-preavis-en-cas-de-licenciement" &&
            !conventionAnswer && (
              <Alert>
                <Heading as="p">Texte applicable</Heading>
                <p>
                  <p>
                    Si la convention ou l’accord collectif ou un usage prévoit
                    des conditions - durée du préavis et/ou ancienneté - plus
                    favorables que le code du travail pour le salarié,
                    l’employeur les applique.
                  </p>
                  Le contrat de travail peut toujours prévoir des mesures plus
                  favorables, qui s’appliqueront.
                </p>
              </Alert>
            )}
          <ReferencesJuridiques
            references={filteredRefs(answers?.generic?.references, content.url)}
          />
        </SectionNoPadding>
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
const StyledSection = styled(Section)`
  margin-top: ${spacings.base};
  padding-bottom: 0;

  > div {
    margin-bottom: 0;
  }
`;
const SectionNoPadding = styled(Section)`
  padding-top: 0;
`;

export default ContributionCCPoc;
