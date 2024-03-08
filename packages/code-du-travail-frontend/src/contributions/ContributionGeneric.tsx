import {
  Agreement,
  ElasticSearchContributionGeneric,
} from "@socialgouv/cdtn-utils";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { push as matopush } from "@socialgouv/matomo-next";
import { useLocalStorageOnPageLoad } from "../lib/useLocalStorage";
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
import {
  Alert,
  Badge,
  Button,
  icons,
  Paragraph,
  Section,
  theme,
  Title,
  Wrapper,
  Heading,
  Text,
} from "@socialgouv/cdtn-ui";
import { ReferencesJuridiques } from "./References";
import { LinkedContent } from "./LinkedContent";
import { ContributionContent } from "./ContributionContent";
import { ContributionMessageBlock } from "./ContributionMessageBlock";
import {
  AlertAgreementNotSupportedNoContent,
  AlertAgreementSupported,
  AlertAgreementUnextended,
} from "./AlertAgreementNotSupportedNoContent";

const { DirectionRight } = icons;

type Props = {
  contribution: ElasticSearchContributionGeneric;
};

const ContributionGeneric = ({ contribution }: Props) => {
  const titleRef = useRef<HTMLDivElement>(null);
  const onUserAction: OnUserAction = (action, extra) => {
    handleTrackEvent(getTitle(), action, extra);
  };
  const getTitle = () => router.asPath;

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

  const ccUnextended =
    (contribution.ccUnextended ?? []).map((cc) => parseInt(cc, 10)) ?? [];
  const supportedAgreements: AgreementSupportInfo[] = contribution.ccSupported
    .map((c) => {
      return {
        idcc: parseInt(c, 10),
        fullySupported: true,
      };
    })
    .filter(({ idcc }) => !ccUnextended || !ccUnextended.includes(idcc));

  const isSupportedInList = (agreements, agreement) =>
    agreement && !!agreements.find((item) => item.idcc === agreement.num);
  const isSupported = (agreement) =>
    isSupportedInList(supportedAgreements, agreement);
  const isUnextended = (agreement) =>
    contribution.ccUnextended &&
    contribution.ccUnextended.includes(agreement?.id);

  const isNoCDT = () => contribution && contribution.type === "generic-no-cdt";
  const showButtonToDisplayCDTContent = () =>
    !isNoCDT() &&
    (!showAnswer || convention || entreprise?.conventions.length === 0);
  const showGeneralInformationButton = () =>
    !isNoCDT() && !showAnswer && !convention;

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

  const alertAgreementNotSupported = (url: string) => {
    if (isUnextended(convention)) {
      return <AlertAgreementUnextended url={url} />;
    } else if (contribution.type === "generic-no-cdt") {
      return (
        <AlertAgreementNotSupportedNoContent
          url={url}
          message={contribution.messageBlockGenericNoCDT}
        />
      );
    } else {
      return <AlertAgreementSupported showAnswer={showAnswer} />;
    }
  };

  const scrollToTitle = () => {
    setTimeout(() => {
      titleRef &&
        titleRef.current &&
        titleRef.current.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <>
      <Badge />
      <SectionNoPadding>
        {isNoCDT() ? (
          <p>
            La convention collective est nécessaire pour obtenir une réponse car
            le code du travail ne prévoit rien sur ce sujet :
          </p>
        ) : (
          <p>
            La réponse dépend de la convention collective à laquelle votre
            entreprise est rattachée. Veuillez renseigner votre situation afin
            d’obtenir une réponse adaptée :
          </p>
        )}

        <Wrapper variant="light">
          <Title size="small" as="p" shift={spacings.xmedium} variant="primary">
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
                  Vous pouvez trouver le nom de votre convention collective sur
                  votre <strong>bulletin de paie</strong>.
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
              alertAgreementNotSupported={alertAgreementNotSupported}
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
                    alertAgreementNotSupported={alertAgreementNotSupported}
                    simulator="QUESTIONNAIRE"
                    noAgreementFoundComponent={
                      isNoCDT() ? (
                        <Alert variant="primary">
                          Aucune convention collective n&apos;a été déclarée
                          pour l&apos;entreprise {entreprise?.simpleLabel}.
                          Rapprochez vous blabla....
                        </Alert>
                      ) : (
                        <Alert>
                          <Heading as="p">
                            Aucune convention collective n&apos;a été déclarée
                            pour cette entreprise.
                          </Heading>
                          <Text>
                            Vous pouvez tout de même poursuivre pour obtenir les
                            informations générales
                          </Text>
                        </Alert>
                      )
                    }
                  />
                </form>
              )}
              {!entreprise && (
                <>
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
                  {convention && !isSupported(convention) && (
                    <Div>
                      <Alert variant="primary">
                        {alertAgreementNotSupported(convention.url)}
                      </Alert>
                    </Div>
                  )}
                </>
              )}
            </>
          )}

          <DivCentered>
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
                  router.push(
                    `/contribution/${convention.num}-${contribution.slug}`
                  );
                }}
              >
                Afficher les informations
                <StyledDirectionRightIcon />
              </Button>
            ) : (
              <>
                {showButtonToDisplayCDTContent() && (
                  <Button
                    variant="primary"
                    onClick={() => {
                      matopush([
                        MatomoBaseEvent.TRACK_EVENT,
                        "contribution",
                        convention
                          ? "click_afficher_les_informations_générales"
                          : "click_afficher_les_informations_sans_CC",
                        getTitle(),
                      ]);
                      setShowAnswer(true);
                      scrollToTitle();
                    }}
                  >
                    Afficher les informations {convention && " générales"}
                  </Button>
                )}
              </>
            )}
          </DivCentered>
        </Wrapper>

        {showGeneralInformationButton() && (
          <StyledButton
            variant="link"
            onClick={() => {
              pushAgreementEvents(
                getTitle(),
                { route: "not-selected" },
                false,
                false
              );
              setShowAnswer(true);
              scrollToTitle();
            }}
          >
            Accéder aux informations générales sans renseigner ma convention
            collective
          </StyledButton>
        )}
      </SectionNoPadding>
      <SectionHidden show={showAnswer}>
        <Title variant="secondary" stripe="none" size="small" ref={titleRef}>
          Que dit le code du travail&nbsp;?
        </Title>
        {convention && !isSupported(convention) && (
          <Paragraph italic>
            Cette réponse correspond à ce que prévoit le code du travail, elle
            ne tient pas compte des spécificités de la convention collective{" "}
            {convention.shortTitle}
          </Paragraph>
        )}

        <ContributionContent contribution={contribution} titleLevel={3} />
        <ReferencesJuridiques references={contribution.references} />
        <ContributionMessageBlock message={contribution.messageBlock} />
        <LinkedContent linkedContent={contribution.linkedContent} />
      </SectionHidden>
    </>
  );
};

const { spacings } = theme;

const SectionHidden = styled(Section)`
  display: ${({ show }) => (show ? "block" : "none")};
`;
const DivCentered = styled.div`
  text-align: center;
  margin-top: ${spacings.large};
`;

const Div = styled.div`
  margin-top: ${spacings.base};
`;

const StyledButton = styled(Button)`
  margin-top: ${spacings.base};

  :not(:hover) {
    color: ${theme.colors.paragraph};
  }
`;

const StyledDirectionRightIcon = styled(DirectionRight)`
  width: 1.5em;
  margin-left: ${spacings.base};
`;
const SectionNoPadding = styled(Section)`
  padding: 0 !important;
`;

export default ContributionGeneric;
