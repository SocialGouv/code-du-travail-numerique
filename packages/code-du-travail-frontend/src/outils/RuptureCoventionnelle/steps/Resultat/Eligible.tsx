import React, { useContext } from "react";
import {
  IndemniteDepartContext,
  useIndemniteDepartStore,
} from "../../../CommonIndemniteDepart/store";
import { informationToSituation } from "../../../CommonSteps/Informations/utils";
import {
  DecryptResult,
  FilledElements,
  ForMoreInfo,
  FormulaInterpreter,
  Result,
} from "../../../CommonIndemniteDepart/steps/Resultat/components";
// Do not optimize the following import
import { getForMoreInfoMessage } from "../../../CommonIndemniteDepart/agreements/ui-customizations";
import ShowDetails from "../../../common/ShowDetails";
import { getSupportedAgreement } from "@socialgouv/modeles-social";
import { IndemniteDepartStepName } from "../../../CommonIndemniteDepart";
import PubliReferences from "../../../common/PubliReferences";
import Disclaimer from "../../../common/Disclaimer";
import { getResultMessage } from "./utils";
import { IndemniteDepartType } from "../../../types";
import { AgreementsInjector } from "../../../CommonIndemniteDepart/agreements";

const Eligible = () => {
  const store = useContext(IndemniteDepartContext);

  const {
    result,
    contratTravail,
    agreement,
    seniority,
    salary,
    isStepSalaryHidden,
    informationData,
  } = useIndemniteDepartStore(store, (state) => ({
    contratTravail: state.contratTravailData.input,
    agreement: state.agreementData.input,
    seniority: state.ancienneteData.input,
    salary: state.salairesData.input,
    result: state.resultData.input,
    isStepSalaryHidden: state.informationsData.input.isStepSalaryHidden,
    informationData: informationToSituation(
      state.informationsData.input.publicodesInformations
    ),
  }));

  return (
    <>
      <Result
        maxResult={
          result.isAgreementBetter
            ? result.publicodesAgreementResult?.value?.toString() ?? ""
            : result.publicodesLegalResult.value?.toString() ?? ""
        }
        notifications={result.notifications}
        resultMessage={getResultMessage(informationData)}
      />
      <ShowDetails autoFocus>
        <FilledElements
          type={IndemniteDepartType.RUPTURE_CONVENTIONNELLE}
          contractTravail={[
            {
              text: "Type de contrat",
              value: contratTravail
                .typeContratTravail!.toString()
                .toUpperCase(),
            },
            {
              text: "Rupture conventionnelle dûe à une inaptitude d’origine professionnelle",
              value:
                contratTravail.licenciementInaptitude === "oui" ? "Oui" : "Non",
              detail:
                result.isAgreementBetter &&
                contratTravail.licenciementInaptitude === "oui"
                  ? "Le salarié ayant été licencié pour inaptitude suite à un accident du travail ou une maladie professionnelle reconnue, le montant de l&apos;indemnité de licenciement légale est doublé"
                  : undefined,
            },
            {
              text: "Arrêt de travail au moment de la rupture conventionnelle",
              value: contratTravail.arretTravail === "oui" ? "Oui" : "Non",
            },
          ].concat(
            contratTravail.dateArretTravail
              ? [
                  {
                    text: "Date de début de l'arrêt de travail",
                    value: contratTravail.dateArretTravail,
                  },
                ]
              : []
          )}
          showHasTempsPartiel={salary.showHasTempsPartiel}
          absencesPeriods={seniority.absencePeriods}
          agreementName={agreement.agreement?.shortTitle}
          isArretTravail={contratTravail.arretTravail === "oui"}
          dateEntree={seniority.dateEntree!}
          dateSortie={seniority.dateSortie!}
          salaryPeriods={salary.salaryPeriods}
          hasTempsPartiel={salary.hasTempsPartiel === "oui"}
          hasSameSalary={salary.hasSameSalary === "oui"}
          salary={salary.salary}
          isAgreementBetter={result.isAgreementBetter}
          agreementInformations={result.agreementInformations}
          agreementRefSalaryInfo={
            agreement.agreement &&
            agreement.isAgreementSupportedIndemniteLicenciement && (
              <AgreementsInjector
                idcc={getSupportedAgreement(agreement.agreement.num)}
                step={IndemniteDepartStepName.Resultat}
              />
            )
          }
          isStepSalaryHidden={isStepSalaryHidden}
          disableParentalNotice={result.isParentalNoticeHidden}
        />
        <FormulaInterpreter formula={result.formula} />
        {!result.agreementHasNoLegalIndemnity && (
          <DecryptResult
            hasSelectedAgreement={agreement.route !== "not-selected"}
            isAgreementSupported={
              agreement.isAgreementSupportedIndemniteLicenciement
            }
            legalResult={result.publicodesLegalResult.value?.toString() ?? ""}
            agreementResult={result.publicodesAgreementResult?.value?.toString()}
            label="rupture conventionnelle"
          />
        )}
        <PubliReferences
          references={
            result.isAgreementBetter
              ? result.agreementReferences ?? []
              : result.legalReferences
          }
        />
      </ShowDetails>
      {!result.agreementHasNoBetterAllowance && result.infoWarning && (
        <Disclaimer
          title={result.infoWarning.title}
          dataTestId="eligible-cc-disclaimer"
        >
          <p>{result.infoWarning.message}</p>
        </Disclaimer>
      )}
      <ForMoreInfo
        message={getForMoreInfoMessage(
          result.isAgreementBetter,
          agreement.agreement?.num
        )}
      />
    </>
  );
};

export default Eligible;
