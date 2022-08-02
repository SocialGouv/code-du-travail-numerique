import {
  getSupportedCcIndemniteLicenciement,
  SupportedCcIndemniteLicenciement,
} from "@socialgouv/modeles-social";
import React from "react";
import { IndemniteLicenciementStepName } from "../..";
import PubliReferences from "../../../common/PubliReferences";
import ShowDetails from "../../../common/ShowDetails";
import { AgreementsInjector } from "../../agreements";

import { useIndemniteLicenciementStore } from "../../store";
import {
  AgreementInfo,
  DecryptResult,
  FilledElements,
  ForMoreInfo,
  FormulaInterpreter,
  Result,
} from "./components";

const StepResult = () => {
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
  }));

  React.useEffect(() => {
    getPublicodesResult();
  }, []);

  return (
    <>
      <Result
        maxResult={
          isAgreementBetter
            ? publicodesAgreementResult?.value?.toString() ?? ""
            : publicodesLegalResult.value?.toString() ?? ""
        }
      />
      <ShowDetails>
        <FilledElements
          absencesPeriods={absencePeriods}
          agreementName={agreement?.shortTitle}
          typeContrat={typeContratTravail!.toString()}
          isLicenciementFauteGrave={licenciementFauteGrave === "oui"}
          isLicenciementInaptitude={licenciementInaptitude === "oui"}
          dateEntree={dateEntree!}
          dateSortie={dateSortie!}
          dateNotification={dateNotification!}
          salaryPeriods={salaryPeriods}
          hasTempsPartiel={hasTempsPartiel === "oui"}
          isAgreementBetter={isAgreementBetter}
          agreementRefSalaryInfo={
            agreement && (
              <AgreementsInjector
                idcc={
                  `IDCC${agreement.num}` as SupportedCcIndemniteLicenciement
                }
                step={IndemniteLicenciementStepName.Resultat}
              />
            )
          }
        />
        <FormulaInterpreter
          formula={
            isAgreementBetter && agreementFormula
              ? agreementFormula
              : legalFormula
          }
        />
        <DecryptResult
          hasSelectedAgreement={route === "agreement"}
          isAgreementSupported={
            getSupportedCcIndemniteLicenciement().find(
              (v) => v.value === `IDCC${agreement?.num}`
            )
              ? true
              : false
          }
          legalResult={publicodesLegalResult.value?.toString() ?? ""}
          agreementResult={publicodesAgreementResult?.value?.toString()}
        />
        <PubliReferences
          references={
            isAgreementBetter ? agreementReferences ?? [] : legalReferences
          }
        />
      </ShowDetails>
      <AgreementInfo
        hasSelectedAgreement={route === "agreement"}
        isAgreementSupported={
          getSupportedCcIndemniteLicenciement().find(
            (v) => v.value === `IDCC${agreement?.num}`
          )
            ? true
            : false
        }
      />
      <ForMoreInfo />
    </>
  );
};

export default StepResult;
