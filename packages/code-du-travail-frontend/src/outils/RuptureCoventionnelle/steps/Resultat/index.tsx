import React, { useContext, useEffect } from "react";
import {
  IndemniteDepartContext,
  useIndemniteDepartStore,
} from "../../../CommonIndemniteDepart/store";
import { informationToSituation } from "../../../CommonSteps/Informations/utils";
import {
  DecryptResult,
  ErrorPublicodes,
  FilledElements,
  ForMoreInfo,
  FormulaInterpreter,
  Result,
} from "../../../CommonIndemniteDepart/steps/Resultat/components";
import {
  AgreementsInjector,
  getForMoreInfoMessage,
  getResultMessage,
} from "../../../CommonIndemniteDepart/agreements";
import ShowDetails from "../../../common/ShowDetails";
import { getSupportedAgreement } from "@socialgouv/modeles-social";
import { IndemniteDepartStepName } from "../../../CommonIndemniteDepart";
import PubliReferences from "../../../common/PubliReferences";
import Disclaimer from "../../../common/Disclaimer";

const StepResult = () => {
  const store = useContext(IndemniteDepartContext);
  const { init, errorPublicodes, getPublicodesResult } =
    useIndemniteDepartStore(store, (state) => ({
      isEligible: state.resultData.input.isEligible,
      init: state.resultFunction.init,
      errorPublicodes: state.resultData.error.errorPublicodes,
      getPublicodesResult: state.resultFunction.getPublicodesResult,
    }));

  const {
    publicodesLegalResult,
    publicodesAgreementResult,
    typeContratTravail,
    licenciementInaptitude,
    agreement,
    route,
    dateEntree,
    dateSortie,
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

  useEffect(() => {
    init();
    getPublicodesResult();
  }, [init, getPublicodesResult]);

  if (errorPublicodes) {
    return <ErrorPublicodes />;
  }

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
          contractTravail={[
            {
              text: "Type de contrat",
              value: typeContratTravail!.toString().toUpperCase(),
            },
            {
              text: "Rupture conventionnelle dûe à une inaptitude d’origine professionnelle",
              value: licenciementInaptitude === "oui" ? "Oui" : "Non",
              detail:
                isAgreementBetter && licenciementInaptitude === "oui"
                  ? "Le salarié ayant été licencié pour inaptitude suite à un accident du travail ou une maladie professionnelle reconnue, le montant de l&apos;indemnité de licenciement légale est doublé"
                  : undefined,
            },
            {
              text: "Arrêt de travail au moment de la rupture conventionnelle",
              value: arretTravail === "oui" ? "Oui" : "Non",
            },
            {
              text: "Date de début de l'arrêt de travail",
              value: dateArretTravail ?? "",
            },
          ]}
          showHasTempsPartiel={showHasTempsPartiel}
          absencesPeriods={absencePeriods}
          agreementName={agreement?.shortTitle}
          isArretTravail={arretTravail === "oui"}
          dateEntree={dateEntree!}
          dateSortie={dateSortie!}
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
};

export default StepResult;
