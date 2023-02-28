import {
  getSupportedAgreement,
  SupportedCcIndemniteLicenciement,
} from "@socialgouv/modeles-social";
import React from "react";
import { IndemniteLicenciementStepName } from "../..";
import PubliReferences from "../../../common/PubliReferences";
import Disclaimer from "../../../common/Disclaimer";
import ShowDetails from "../../../common/ShowDetails";
import { AgreementsInjector } from "../../agreements";
import { getSupportedCcIndemniteLicenciement } from "../../common";

import { useIndemniteLicenciementStore } from "../../store";
import {
  DecryptResult,
  FilledElements,
  ForMoreInfo,
  FormulaInterpreter,
  Result,
} from "./components";

export default function Eligible() {
  const {
    publicodesLegalResult,
    publicodesAgreementResult,
    getPublicodesResult,
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
    agreementNotifications,
    agreementHasNoLegalIndemnity,
    isStepSalaryHidden,
    infoWarning,
    dateArretTravail,
    arretTravail,
    showHasTempsPartiel,
  } = useIndemniteLicenciementStore((state) => ({
    publicodesLegalResult: state.resultData.input.publicodesLegalResult,
    publicodesAgreementResult: state.resultData.input.publicodesAgreementResult,
    getPublicodesResult: state.resultFunction.getPublicodesResult,
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
    agreementNotifications: state.resultData.input.agreementNotifications,
    agreementHasNoLegalIndemnity:
      state.resultData.input.agreementHasNoLegalIndemnity,
    isStepSalaryHidden: state.informationsData.input.isStepSalaryHidden,
    infoWarning: state.resultData.input.infoWarning,
    dateArretTravail: state.contratTravailData.input.dateArretTravail,
    arretTravail: state.contratTravailData.input.arretTravail,
    showHasTempsPartiel: state.salairesData.input.showHasTempsPartiel,
  }));

  React.useEffect(() => {
    getPublicodesResult();
  }, []);

  const supportedCc = React.useMemo(
    () =>
      getSupportedCcIndemniteLicenciement().find(
        (v) => v.fullySupported && v.idcc === agreement?.num
      ),
    [agreement]
  );

  return (
    <>
      <Result
        maxResult={
          isAgreementBetter
            ? publicodesAgreementResult?.value?.toString() ?? ""
            : publicodesLegalResult.value?.toString() ?? ""
        }
        notifications={isAgreementBetter ? agreementNotifications : []}
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
            agreement && (
              <AgreementsInjector
                idcc={getSupportedAgreement(agreement.num)}
                step={IndemniteLicenciementStepName.Resultat}
              />
            )
          }
          isStepSalaryHidden={isStepSalaryHidden}
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
            isAgreementSupported={!!supportedCc}
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
      {!agreementHasNoLegalIndemnity && infoWarning && (
        <Disclaimer
          title={infoWarning.title}
          dataTestId="eligible-cc-disclaimer"
        >
          <p>{infoWarning.message}</p>
        </Disclaimer>
      )}
      <ForMoreInfo />
    </>
  );
}
