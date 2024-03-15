import { getSupportedAgreement } from "@socialgouv/modeles-social";
import React, { useContext } from "react";
import PubliReferences from "../../../common/PubliReferences";
import Disclaimer from "../../../common/Disclaimer";
import ShowDetails from "../../../common/ShowDetails";
import {
  DecryptResult,
  FilledElements,
  ForMoreInfo,
  FormulaInterpreter,
  Result,
} from "../../../CommonIndemniteDepart/steps/Resultat/components";
import { informationToSituation } from "../../../CommonSteps/Informations/utils";
import {
  IndemniteDepartContext,
  useIndemniteDepartStore,
} from "../../../CommonIndemniteDepart/store";
import { getResultMessage } from "../../../RuptureCoventionnelle/steps/Resultat/utils";
import {
  AgreementsInjector,
  getForMoreInfoMessage,
} from "../../../CommonIndemniteDepart/agreements";
import { IndemniteDepartStepName } from "../../../CommonIndemniteDepart";
import { IndemniteDepartType } from "../../../types";
import Link from "next/link";

export default function Eligible() {
  const store = useContext(IndemniteDepartContext);
  const {
    publicodesLegalResult,
    publicodesAgreementResult,
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
    legalFormula,
    legalReferences,
    agreementReferences,
    hasTempsPartiel,
    isAgreementBetter,
    agreementFormula,
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
    legalFormula: state.resultData.input.legalFormula,
    legalReferences: state.resultData.input.legalReferences,
    agreementReferences: state.resultData.input.agreementReferences,
    hasTempsPartiel: state.salairesData.input.hasTempsPartiel,
    isAgreementBetter: state.resultData.input.isAgreementBetter,
    agreementFormula: state.resultData.input.agreementFormula,
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
  }));

  return (
    <>
      <Result
        maxResult={
          isAgreementBetter
            ? publicodesAgreementResult?.value?.toString() ?? ""
            : publicodesLegalResult.value?.toString() ?? ""
        }
        notifications={notifications}
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
                isAgreementBetter && licenciementInaptitude === "oui"
                  ? "Le salarié ayant été licencié pour inaptitude suite à un accident du travail ou une maladie professionnelle reconnue, le montant de l&apos;indemnité de licenciement légale est doublé"
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
              />
            )
          }
          isStepSalaryHidden={isStepSalaryHidden}
          disableParentalNotice={isParentalNoticeHidden}
        />
        <FormulaInterpreter
          formula={
            isAgreementBetter && agreementFormula
              ? agreementFormula
              : legalFormula
          }
        />
        {!agreementHasNoLegalIndemnity && (
          <DecryptResult
            hasSelectedAgreement={route !== "not-selected"}
            isAgreementSupported={isAgreementSupported}
            legalResult={publicodesLegalResult.value?.toString() ?? ""}
            agreementResult={publicodesAgreementResult?.value?.toString()}
            label="licenciement"
          />
        )}
        <PubliReferences
          references={
            isAgreementBetter ? agreementReferences ?? [] : legalReferences
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
      <ForMoreInfo
        article={
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
        }
        message={getForMoreInfoMessage(isAgreementBetter, agreement?.num)}
      />
    </>
  );
}
