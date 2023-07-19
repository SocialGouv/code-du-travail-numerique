import { Agreement, getLabelBySource } from "@socialgouv/cdtn-utils";
import React, { useState } from "react";
import styled from "styled-components";

import Mdx from "../../src/common/Mdx";
import { A11yLink } from "../common/A11yLink";
import { useLocalStorageOnPageLoad } from "../lib/useLocalStorage";
import rehypeToReact from "./rehypeToReact";
import ReferencesJuridiques, { filteredRefs } from "./References";
import {
  ArrowLink,
  Badge,
  Button,
  icons,
  Paragraph,
  Section,
  theme,
  Title,
  Wrapper,
} from "@socialgouv/cdtn-ui";
import { RadioQuestion } from "../outils/Components";
import { AgreementRoute } from "../outils/common/type/WizardType";
import { SearchAgreementInput } from "../outils/common/Agreement/AgreementSearch/AgreementInput/SearchAgreementInput";
import router from "next/router";
import { Toast } from "@socialgouv/cdtn-ui/lib";
import { EnterpriseSearch } from "../outils/CommonSteps/Agreement/components";
import { AgreementSearchValue } from "../outils/CommonSteps/Agreement/store";
import { AgreementSupportInfo } from "../outils/common/Agreement/types";

const { DirectionRight } = icons;

const onUserAction = (agreement) => {
  console.log("Track ?????", agreement);
};

const ContributionGeneric = ({ answers, content, slug }) => {
  console.log(answers);
  const hasConventionAnswers =
    answers.conventions && answers.conventions.length > 0;
  const [showAnswer, setShowAnswer] = useState(false);

  const [convention, setConvention] =
    useLocalStorageOnPageLoad<Agreement>("convention");

  const [selectedRoute, setSelectedRoute] = useState<
    AgreementRoute | undefined
  >();

  const onSelectAgreement = (agreement) => {
    console.log("track event onSelectAgreement", agreement);
    setConvention(agreement);
  };
  const supportedAgreements: AgreementSupportInfo[] = answers.conventions.map(
    (c) => {
      return {
        idcc: parseInt(c.idcc, 10),
        fullySupported: true,
      };
    }
  );
  return (
    <>
      {hasConventionAnswers && (
        <>
          <Badge />
          <section>
            <Wrapper variant="light">
              <Title shift={spacings.xmedium} variant="primary">
                Votre Situtation
              </Title>

              <RadioQuestion
                questions={[
                  {
                    label:
                      "Je sais quelle est ma convention collective (je la saisis)",
                    value: "agreement" as AgreementRoute,
                    id: "route-agreement",
                  },
                  {
                    label:
                      "Je ne sais pas quelle est ma convention collective (je la recherche)",
                    value: "enterprise" as AgreementRoute,
                    id: "route-enterprise",
                  },
                ]}
                name="route"
                label=" Quel est le nom de la convention collective applicable&nbsp;?"
                selectedOption={selectedRoute}
                onChangeSelectedOption={(value: AgreementRoute) => {
                  setConvention();
                  setSelectedRoute(value);
                }}
                tooltip={{
                  content: (
                    <p>
                      Vous pouvez trouver le nom de votre convention collective
                      sur votre <strong>bulletin de paie</strong>.
                    </p>
                  ),
                }}
              />
              {selectedRoute === "agreement" && (
                <>
                  {convention ? (
                    <Toast variant="secondary" onRemove={() => setConvention()}>
                      {convention.shortTitle}
                      {convention.highlight &&
                        convention.highlight.searchInfo && (
                          <Paragraph variant="altText" noMargin>
                            {convention.highlight.searchInfo}
                          </Paragraph>
                        )}
                    </Toast>
                  ) : (
                    <>
                      <Paragraph noMargin fontWeight="600" fontSize="default">
                        Précisez et sélectionnez votre convention collective
                      </Paragraph>
                      <SearchAgreementInput
                        onUserAction={onUserAction}
                        onSelectAgreement={onSelectAgreement}
                      />
                    </>
                  )}
                </>
              )}
              {selectedRoute === "enterprise" && (
                <EnterpriseSearch
                  supportedAgreements={supportedAgreements}
                  selectedAgreement={convention}
                  onSelectAgreement={setConvention}
                  onUserAction={(action, value: AgreementSearchValue) =>
                    onUserAction(value)
                  }
                  alertAgreementNotSupported={() => <></>}
                  simulator="QUESTIONNAIRE"
                />
              )}
              {convention && (
                <Div>
                  <Button
                    variant="primary"
                    onClick={() => {
                      router.push(`/contribution/${convention.num}-${slug}`);
                    }}
                  >
                    Afficher les informations
                    <StyledDirectionRightIcon />
                  </Button>
                </Div>
              )}
            </Wrapper>

            {!showAnswer && (
              <p>
                <Button variant="navLink" onClick={() => setShowAnswer(true)}>
                  <ArrowLink arrowPosition="left">
                    Accéder aux informations générales sans renseigner ma
                    convention collective
                  </ArrowLink>
                </Button>
              </p>
            )}
          </section>
        </>
      )}
      {showAnswer && answers.generic && (
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
const Div = styled.div`
  text-align: center;
  margin-top: ${spacings.large};
`;

const StyledDirectionRightIcon = styled(DirectionRight)`
  width: 1.5em;
  margin-left: ${spacings.base};
`;

export default ContributionGeneric;
