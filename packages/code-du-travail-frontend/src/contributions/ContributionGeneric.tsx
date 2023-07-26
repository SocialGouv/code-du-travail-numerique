import { Agreement, getLabelBySource } from "@socialgouv/cdtn-utils";
import React, { useState } from "react";
import styled from "styled-components";
import { push as matopush } from "@socialgouv/matomo-next";

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
import router from "next/router";
import {
  EnterpriseSearch,
  NoEnterprise,
} from "../outils/CommonSteps/Agreement/components";
import { AgreementSupportInfo } from "../outils/common/Agreement/types";
import AgreementSearch from "../outils/CommonSteps/Agreement/components/AgreementSearch";
import { pushAgreementEvents } from "../outils/common";
import { OnUserAction } from "../outils/ConventionCollective/types";
import { handleTrackEvent } from "../outils/common/Agreement/tracking";
import { MatomoBaseEvent } from "../lib";
import { getCc3239Informations } from "../outils";
import { Enterprise } from "../conventions/Search/api/enterprises.service";
import { Alert, Heading } from "@socialgouv/cdtn-ui/lib";

const { DirectionRight } = icons;

const ContributionGeneric = ({ answers, content, slug }) => {
  const onUserAction: OnUserAction = (action, extra) => {
    handleTrackEvent(getTitle(), action, extra);
  };
  const getTitle = () => router.asPath;

  const hasConventionAnswers =
    answers.conventions && answers.conventions.length > 0;
  const [showAnswer, setShowAnswer] = useState(false);
  const [hasNoEnterpriseSelected, setHasNoEnterpriseSelected] = useState(false);
  const [entreprise, setEnterprise] = useState<Enterprise | undefined>();

  const [convention, setConvention] =
    useLocalStorageOnPageLoad<Agreement>("convention");

  const [selectedRoute, setSelectedRoute] = useState<
    AgreementRoute | undefined
  >();

  if (convention && !selectedRoute) {
    setSelectedRoute("agreement");
  }
  const supportedAgreements: AgreementSupportInfo[] = answers.conventions.map(
    (c) => {
      return {
        idcc: parseInt(c.idcc, 10),
        fullySupported: true,
      };
    }
  );
  const isSupported = (agreement) =>
    !!supportedAgreements.find((item) => item.idcc == agreement.num);

  const onSelectAgreement = (
    agreement: Agreement | null,
    enterprise?: Enterprise | undefined,
    hasNoEntrepriseSelected?: boolean
  ) => {
    let agreementTreated;
    if (agreement) {
      agreementTreated = isSupported(agreement);

      pushAgreementEvents(
        getTitle(),
        {
          route: selectedRoute!,
          enterprise: enterprise,
          selected: agreement,
        },
        agreementTreated,
        !!hasNoEntrepriseSelected
      );
    }

    setConvention(agreement);
    setEnterprise(enterprise);
    if (agreementTreated) {
      setShowAnswer(false);
    }
  };

  const CC_NOT_SUPPORTED = (
    <>
      <Paragraph variant="primary" fontSize="default" fontWeight="700" noMargin>
        Nous n’avons pas de réponse pour cette convention collective
      </Paragraph>
      {showAnswer ? (
        <p>Vous pouvez consulter les informations générales ci-dessous.</p>
      ) : (
        <p>
          Vous pouvez tout de même poursuivre pour obtenir les informations
          générales.
        </p>
      )}
    </>
  );
  return (
    <>
      {hasConventionAnswers && (
        <>
          <Badge />
          <SectionNoPadding>
            <p>
              La réponse dépend de la convention collective à laquelle votre
              entreprise est rattachée. Veuillez renseigner votre situation afin
              d’obtenir une réponse adaptée :
            </p>
            <Wrapper variant="light">
              <Title shift={spacings.xmedium} variant="primary">
                Votre situation
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
                label="Quel est le nom de la convention collective applicable&nbsp;?"
                selectedOption={selectedRoute}
                onChangeSelectedOption={(value: AgreementRoute) => {
                  setConvention();
                  setHasNoEnterpriseSelected(false);
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
                <AgreementSearch
                  supportedAgreements={supportedAgreements}
                  selectedAgreement={convention}
                  onSelectAgreement={onSelectAgreement}
                  onUserAction={onUserAction}
                  alertAgreementNotSupported={() => CC_NOT_SUPPORTED}
                  simulator="QUESTIONNAIRE"
                />
              )}
              {selectedRoute === "enterprise" && (
                <>
                  {!hasNoEnterpriseSelected && (
                    <form onSubmit={(event) => event.preventDefault()}>
                      <EnterpriseSearch
                        supportedAgreements={supportedAgreements}
                        selectedAgreement={convention}
                        onSelectAgreement={onSelectAgreement}
                        onUserAction={onUserAction}
                        alertAgreementNotSupported={() => CC_NOT_SUPPORTED}
                        simulator="QUESTIONNAIRE"
                      />
                    </form>
                  )}
                  {!entreprise && (
                    <NoEnterprise
                      isCheckboxChecked={hasNoEnterpriseSelected}
                      setIsCheckboxChecked={setHasNoEnterpriseSelected}
                      onCheckboxChange={async (isCheckboxChecked) => {
                        const cc3239 = isCheckboxChecked
                          ? await getCc3239Informations()
                          : null;
                        onSelectAgreement(cc3239, undefined, isCheckboxChecked);
                      }}
                      isQuestionnaire
                    />
                  )}
                </>
              )}

              {convention && (
                <Div>
                  {isSupported(convention) ? (
                    <Button
                      variant="primary"
                      onClick={() => {
                        matopush([
                          MatomoBaseEvent.TRACK_EVENT,
                          "contribution",
                          "click_afficher_les_informations_CC",
                          getTitle(),
                        ]);
                        router.push(`/contribution/${convention.num}-${slug}`);
                      }}
                    >
                      Afficher les informations
                      <StyledDirectionRightIcon />
                    </Button>
                  ) : (
                    <>
                      {!showAnswer && (
                        <Button
                          variant="primary"
                          onClick={() => {
                            matopush([
                              MatomoBaseEvent.TRACK_EVENT,
                              "contribution",
                              "click_afficher_les_informations_générales",
                              getTitle(),
                            ]);
                            setShowAnswer(true);
                          }}
                        >
                          Afficher les informations générales
                        </Button>
                      )}
                    </>
                  )}
                </Div>
              )}
            </Wrapper>

            {!showAnswer && !convention && (
              <p>
                <Button
                  variant="navLink"
                  onClick={() => {
                    pushAgreementEvents(
                      getTitle(),
                      { route: "not-selected" },
                      false,
                      false
                    );
                    setShowAnswer(true);
                  }}
                >
                  <ArrowLink arrowPosition="left">
                    Accéder aux informations générales sans renseigner ma
                    convention collective
                  </ArrowLink>
                </Button>
              </p>
            )}
          </SectionNoPadding>
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
          <Alert>
            <Heading as="p">Texte applicable</Heading>
            <p>
              Une convention collective de branche ou un accord collectif
              d’entreprise peut prévoir des durées plus longues. Si les durées
              fixées sont plus courtes que celles prévues par le code du
              travail, le salarié a droit aux congés prévus par le code du
              travail.
            </p>

            <p>
              Une convention collective de branche ou un accord collectif
              d’entreprise peut aussi prévoir des congés pour d’autres
              événements familiaux.
            </p>

            <p>
              Le contrat de travail peut toujours prévoir des mesures plus
              favorables, qui s’appliqueront.
            </p>
          </Alert>
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
const SectionNoPadding = styled(Section)`
  margin-top: -${spacings.larger} !important;
  padding-top: 0 !important;
`;

export default ContributionGeneric;
