import {
  Notification,
  getSupportedAgreement,
} from "@socialgouv/modeles-social";
import React, { useContext } from "react";
import PubliReferences from "../../../common/PubliReferences";
import Disclaimer from "../../../common/Disclaimer";
import ShowDetails from "../../../common/ShowDetails";
import {
  DecryptResult,
  FilledElements,
  FormulaInterpreter,
  Result,
} from "../../../CommonIndemniteDepart/steps/Resultat/components";
import { informationToSituation } from "../../../Components/Informations/utils";
import {
  IndemniteDepartContext,
  useIndemniteDepartStore,
} from "../../../CommonIndemniteDepart/store";
// Do not optimize the following import
import { IndemniteDepartStepName } from "../../../CommonIndemniteDepart";
import { IndemniteDepartType } from "../../../types";
import Link from "next/link";
import { AgreementsInjector } from "../../../CommonIndemniteDepart/agreements";
import { Paragraph } from "@socialgouv/cdtn-ui";
import {
  getForMoreInfoMessage,
  getResultMessage,
} from "../../agreements/ui-customizations";
import { StyledLink } from "../../../CommonIndemniteDepart/steps/Resultat/components/Result";

export default function Eligible() {
  const store = useContext(IndemniteDepartContext);
  const {
    result,
    publicodesLegalResult,
    publicodesAgreementResult,
    agreementExplanation,
    resultExplanation,
    typeContratTravail,
    licenciementInaptitude,
    licenciementFauteGrave,
    agreement,
    route,
    dateEntree,
    dateSortie,
    dateNotification,
    absencePeriods,
    salaryPeriods,
    formula,
    legalReferences,
    agreementReferences,
    hasTempsPartiel,
    isAgreementBetter,
    agreementInformations,
    salary,
    hasSameSalary,
    notifications,
    agreementHasNoLegalIndemnity,
    agreementHasNoBetterAllowance,
    isStepSalaryHidden,
    infoWarning,
    dateArretTravail,
    arretTravail,
    showHasTempsPartiel,
    informationData,
    isAgreementSupported,
    isParentalNoticeHidden,
  } = useIndemniteDepartStore(store, (state) => ({
    result: state.resultData.input.result,
    publicodesLegalResult: state.resultData.input.publicodesLegalResult,
    publicodesAgreementResult: state.resultData.input.publicodesAgreementResult,
    typeContratTravail: state.contratTravailData.input.typeContratTravail,
    licenciementInaptitude:
      state.contratTravailData.input.licenciementInaptitude,
    licenciementFauteGrave:
      state.contratTravailData.input.licenciementFauteGrave,
    agreement: state.agreementData.input.agreement,
    route: state.agreementData.input.route,
    dateEntree: state.ancienneteData.input.dateEntree,
    dateSortie: state.ancienneteData.input.dateSortie,
    dateNotification: state.ancienneteData.input.dateNotification,
    absencePeriods: state.ancienneteData.input.absencePeriods,
    salaryPeriods: state.salairesData.input.salaryPeriods,
    formula: state.resultData.input.formula,
    legalReferences: state.resultData.input.legalReferences,
    agreementReferences: state.resultData.input.agreementReferences,
    hasTempsPartiel: state.salairesData.input.hasTempsPartiel,
    isAgreementBetter: state.resultData.input.isAgreementBetter,
    agreementInformations: state.resultData.input.agreementInformations,
    salary: state.salairesData.input.salary,
    hasSameSalary: state.salairesData.input.hasSameSalary,
    notifications: state.resultData.input.notifications,
    agreementHasNoLegalIndemnity:
      state.resultData.input.agreementHasNoLegalIndemnity,
    agreementHasNoBetterAllowance:
      state.resultData.input.agreementHasNoBetterAllowance,
    isStepSalaryHidden: state.informationsData.input.isStepSalaryHidden,
    infoWarning: state.resultData.input.infoWarning,
    dateArretTravail: state.contratTravailData.input.dateArretTravail,
    arretTravail: state.contratTravailData.input.arretTravail,
    showHasTempsPartiel: state.salairesData.input.showHasTempsPartiel,
    informationData: informationToSituation(
      state.informationsData.input.publicodesInformations
    ),
    isAgreementSupported:
      state.agreementData.input.isAgreementSupportedIndemniteLicenciement,
    isParentalNoticeHidden: state.resultData.input.isParentalNoticeHidden,
    agreementExplanation: state.resultData.input.agreementExplanation,
    resultExplanation: state.resultData.input.resultExplanation,
  }));

  const defaultNotification = [
    {
      dottedName: "default notification 1",
      description: (
        <span>
          Ce montant est exonéré d’impôt sur le revenu et de cotisations
          sociales sous certaines conditions,{" "}
          <StyledLink
            href="/fiche-service-public/indemnite-de-licenciement-du-salarie-en-cdi#lindemnite-de-licenciement-est-elle-imposable"
            target="_blank"
          >
            en savoir plus
          </StyledLink>
        </span>
      ),
    } as Notification,
  ];

  return (
    <>
      <Result
        maxResult={result?.value?.toString() ?? ""}
        notifications={defaultNotification.concat(notifications ?? [])}
        resultMessage={getResultMessage(informationData)}
      />
      <ShowDetails autoFocus>
        <FilledElements
          type={IndemniteDepartType.LICENCIEMENT}
          contractTravail={[
            {
              text: "Type de contrat",
              value: typeContratTravail!.toString().toUpperCase(),
            },
            {
              text: "Licenciement dû à une faute grave (ou lourde)",
              value: licenciementFauteGrave === "oui" ? "Oui" : "Non",
            },
            {
              text: "Licenciement dû à une inaptitude d’origine professionnelle",
              value: licenciementInaptitude === "oui" ? "Oui" : "Non",
              detail:
                !isAgreementBetter && licenciementInaptitude === "oui"
                  ? "Le salarié ayant été licencié pour inaptitude suite à un accident du travail ou une maladie professionnelle reconnue, le montant de l'indemnité de licenciement légale est doublé"
                  : undefined,
            },
            {
              text: "Arrêt de travail au moment du licenciement",
              value: arretTravail === "oui" ? "Oui" : "Non",
            },
          ].concat(
            dateArretTravail
              ? [
                  {
                    text: "Date de début de l'arrêt de travail",
                    value: dateArretTravail,
                  },
                ]
              : []
          )}
          isArretTravail={arretTravail === "oui"}
          showHasTempsPartiel={showHasTempsPartiel}
          absencesPeriods={absencePeriods}
          agreementName={agreement?.shortTitle}
          dateEntree={dateEntree!}
          dateSortie={dateSortie!}
          dateNotification={dateNotification}
          salaryPeriods={salaryPeriods}
          hasTempsPartiel={hasTempsPartiel === "oui"}
          hasSameSalary={hasSameSalary === "oui"}
          salary={salary}
          isAgreementBetter={isAgreementBetter}
          agreementInformations={agreementInformations}
          agreementRefSalaryInfo={
            agreement &&
            isAgreementSupported && (
              <AgreementsInjector
                idcc={getSupportedAgreement(agreement.num)}
                step={IndemniteDepartStepName.Resultat}
                type={IndemniteDepartType.LICENCIEMENT}
              />
            )
          }
          isStepSalaryHidden={isStepSalaryHidden}
          disableParentalNotice={isParentalNoticeHidden}
        />
        <FormulaInterpreter formula={formula} />
        {!agreementHasNoLegalIndemnity && (
          <DecryptResult
            legalResult={
              publicodesLegalResult.value
                ? publicodesLegalResult.value.toString()
                : "0"
            }
            agreementResult={
              publicodesAgreementResult && publicodesAgreementResult.value
                ? publicodesAgreementResult.value.toString()
                : undefined
            }
            label="licenciement"
            resultExplanation={resultExplanation}
            agreementExplanation={agreementExplanation}
          />
        )}
        <PubliReferences
          references={
            isAgreementBetter ? (agreementReferences ?? []) : legalReferences
          }
        />
      </ShowDetails>
      {!agreementHasNoBetterAllowance && infoWarning && (
        <Disclaimer
          title={infoWarning.title}
          dataTestId="eligible-cc-disclaimer"
        >
          <p>{infoWarning.message}</p>
        </Disclaimer>
      )}
      <p>
        Pour en savoir plus sur l’indemnité de licenciement et son mode de
        calcul, consultez{" "}
        <Link
          href={`/fiche-service-public/indemnite-de-licenciement-du-salarie-en-cdi`}
          passHref
          target={"_blank"}
        >
          cet article
        </Link>
        .
      </p>
      <Paragraph italic fontSize="small">
        {getForMoreInfoMessage(isAgreementBetter, agreement?.num)}
      </Paragraph>
    </>
  );
}
