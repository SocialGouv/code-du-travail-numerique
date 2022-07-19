import { getSupportedCcIndemniteLicenciement } from "@socialgouv/modeles-social";
import React from "react";
import PubliReferences from "../../../common/PubliReferences";
import ShowDetails from "../../../common/ShowDetails";

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
  }));

  React.useEffect(() => {
    getPublicodesResult();
  }, []);

  return (
    <>
      <Result
        legalResult={publicodesLegalResult.value?.toString() ?? ""}
        agreementResult={publicodesAgreementResult?.value?.toString()}
      />
      <ShowDetails>
        <FilledElements
          absencesPeriods={absencePeriods}
          agreementName={agreement?.shortTitle}
          typeContrat={typeContratTravail!.toString()}
          isLicenciementFauteGrave={
            licenciementFauteGrave === "oui" ? true : false
          }
          isLicenciementInaptitude={
            licenciementInaptitude === "oui" ? true : false
          }
          dateEntree={dateEntree!}
          dateSortie={dateSortie!}
          dateNotification={dateNotification!}
          salaryPeriods={salaryPeriods}
        />
        <FormulaInterpreter formula={legalFormula} />
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
        <PubliReferences references={legalReferences} />
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
      </ShowDetails>
    </>
  );
};

export default StepResult;
