import { getSupportedAgreement } from "@socialgouv/modeles-social";
import React, { useContext } from "react";
import { IndemniteLicenciementStepName } from "../..";
import PubliReferences from "../../../common/PubliReferences";
import Disclaimer from "../../../common/Disclaimer";
import ShowDetails from "../../../common/ShowDetails";
import { AgreementsInjector } from "../../agreements";
import {
  IndemniteLicenciementContext,
  useIndemniteLicenciementStore,
} from "../../store";
import { getResultMessage } from "../../agreements/ui-customizations";
import { getForMoreInfoMessage } from "../../agreements/ui-customizations/messages";
import {
  DecryptResult,
  FilledElements,
  ForMoreInfo,
  FormulaInterpreter,
  Result,
} from "./components";
import { informationToSituation } from "../../../CommonSteps/Informations/utils";

export default function Eligible() {
  const store = useContext(IndemniteLicenciementContext);
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
  } = useIndemniteLicenciementStore(store, (state) => ({
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
      <ShowDetails>
        <FilledElements
          showHasTempsPartiel={showHasTempsPartiel}
          absencesPeriods={absencePeriods}
          agreementName={agreement?.shortTitle}
          typeContrat={typeContratTravail!.toString()}
          isLicenciementFauteGrave={licenciementFauteGrave === "oui"}
          isLicenciementInaptitude={licenciementInaptitude === "oui"}
          isArretTravail={arretTravail === "oui"}
          dateArretTravail={dateArretTravail}
          dateEntree={dateEntree!}
          dateSortie={dateSortie!}
          dateNotification={dateNotification!}
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
                step={IndemniteLicenciementStepName.Resultat}
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
        message={getForMoreInfoMessage(isAgreementBetter, agreement?.num)}
      />
    </>
  );
}
