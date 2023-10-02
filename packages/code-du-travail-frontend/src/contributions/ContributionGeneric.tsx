import { Agreement, getLabelBySource } from "@socialgouv/cdtn-utils";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { push as matopush } from "@socialgouv/matomo-next";

import Mdx from "../../src/common/Mdx";
import { A11yLink } from "../common/A11yLink";
import { useLocalStorageOnPageLoad } from "../lib/useLocalStorage";
import rehypeToReact from "./rehypeToReact";
import ReferencesJuridiques, { filteredRefs } from "./References";
import {
  Alert,
  ArrowLink,
  Badge,
  Button,
  Grid,
  Heading,
  icons,
  IconStripe,
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
import { ListLink } from "../search/SearchResults/Results";

const { DirectionRight } = icons;

const ContributionGeneric = ({ answers, content, slug, relatedItems }) => {
  const titleRef = useRef<HTMLDivElement>(null);
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

  const scrollToTitle = () => {
    setTimeout(() => {
      titleRef &&
        titleRef.current &&
        titleRef.current.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

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
                            scrollToTitle();
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
                    scrollToTitle();
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
      <SectionHidden show={showAnswer && answers.generic}>
        <Title stripe="none" ref={titleRef}>
          Informations générales
        </Title>

        <Paragraph fontStyle="italic">
          Cette réponse correspond à ce que prévoit le code du travail, elle ne
          tient pas compte des spécificités de la convention collective{" "}
          {convention ? convention.shortTitle : "dont vous dépendez"}.
        </Paragraph>

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
          <Heading as="p" variant="primary">
            <IconStripe icon={icons.Warning}>Attention</IconStripe>
          </Heading>
          <p>
            Les informations présentes sur cette page sont issues du Code du
            travail. D’autres textes ou votre contrat de travail peuvent
            également prévoir des règles spécifiques sur ce sujet qui
            s’appliqueront à condition d’être au moins aussi favorables que le
            Code du travail. Plusieurs cas de figure peuvent se présenter :
          </p>

          <ul>
            <li>
              si un accord d’entreprise (ou de groupe ou d’établissement) traite
              de ce sujet : c’est ce texte qui s’appliquera ;
            </li>
            <li>
              à défaut, si une convention de branche traite de ce sujet : c’est
              ce texte qui s’appliquera ;
            </li>
            <li>
              dans tous les cas, si le contrat de travail prévoit des règles
              plus favorables que ces textes : il s’appliquera.
            </li>
          </ul>

          <p>
            Attention, d’autres règles non étendues peuvent potentiellement vous
            être applicables.
          </p>
        </Alert>
        <ReferencesJuridiques
          references={filteredRefs(answers.generic.references, content.url)}
        />
        {relatedItems && (
          <Section>
            <Title shift={spacings.xmedium} variant="secondary">
              Pour aller plus loin
            </Title>
            <Grid columns={2}>
              {relatedItems.map((item) => {
                return (
                  <ListLink
                    item={item}
                    key={item.slug}
                    titleTagType="h3"
                    hideAction
                  />
                );
              })}
            </Grid>
          </Section>
        )}
      </SectionHidden>
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
const SectionHidden = styled(Section)`
  display: ${({ show }) => (show ? "block" : "none")};
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
  padding: 0;
  margin: 0;
`;

export default ContributionGeneric;
