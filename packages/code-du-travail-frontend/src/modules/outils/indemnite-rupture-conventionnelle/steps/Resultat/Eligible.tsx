import React, { useContext } from "react";
import {
  getSupportedAgreement,
  Notification,
} from "@socialgouv/modeles-social";
import { getResultMessage } from "./utils";
import Result from "src/modules/outils/common/indemnite-depart/steps/Resultat/components/Result";
import {
  IndemniteDepartContext,
  useIndemniteDepartStore,
} from "src/modules/outils/common/indemnite-depart/store";
import { informationToSituation } from "src/modules/outils/common/indemnite-depart/steps/Informations/utils";
import {
  DecryptResult,
  FilledElements,
  FormulaInterpreter,
} from "src/modules/outils/common/indemnite-depart/steps/Resultat/components";
import { IndemniteDepartType } from "src/modules/outils/common/indemnite-depart/types";
import { AgreementsInjector } from "src/modules/outils/common/indemnite-depart/agreements";
import { IndemniteDepartStepName } from "src/modules/outils/common/indemnite-depart";
import {
  Disclaimer,
  PubliReferences,
} from "src/modules/outils/common/components";

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
    resultExplanation,
    agreementExplanation,
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
    resultExplanation: state.resultData.input.resultExplanation,
    agreementExplanation: state.resultData.input.agreementExplanation,
  }));

  const defaultNotification = [
    {
      dottedName: "default notification 1",
      description: (
        <span>
          Ce montant est exonéré d’impôt sur le revenu et de cotisations
          sociales sous certaines conditions,{" "}
          <a
            href="/fiche-service-public/comment-calculer-lindemnite-specifique-de-rupture-conventionnelle#lindemnite-de-rupture-conventionnelle-est-elle-imposable"
            target="_blank"
          >
            en savoir plus
          </a>
        </span>
      ),
    } as Notification,
  ];

  return (
    <>
      <Result
        maxResult={result.result.value?.toString() ?? ""}
        notifications={defaultNotification.concat(result.notifications ?? [])}
        resultMessage={getResultMessage(informationData)}
      />
      <div>
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
                type={IndemniteDepartType.RUPTURE_CONVENTIONNELLE}
              />
            )
          }
          isStepSalaryHidden={isStepSalaryHidden}
          disableParentalNotice={result.isParentalNoticeHidden}
        />
        <FormulaInterpreter formula={result.formula} />
        {!result.agreementHasNoLegalIndemnity && (
          <DecryptResult
            resultExplanation={resultExplanation}
            agreementExplanation={agreementExplanation}
            legalResult={
              result.publicodesLegalResult.value
                ? result.publicodesLegalResult.value.toString()
                : "0"
            }
            agreementResult={
              result.publicodesAgreementResult &&
              result.publicodesAgreementResult.value
                ? result.publicodesAgreementResult.value.toString()
                : undefined
            }
            label="rupture conventionnelle"
          />
        )}
        <PubliReferences
          references={
            result.isAgreementBetter
              ? (result.agreementReferences ?? [])
              : result.legalReferences
          }
        />
      </div>
      {!result.agreementHasNoBetterAllowance && result.infoWarning && (
        <Disclaimer
          title={result.infoWarning.title}
          dataTestId="eligible-cc-disclaimer"
        >
          <p>{result.infoWarning.message}</p>
        </Disclaimer>
      )}
      <i>
        Le montant donné n’est qu’une estimation, il est donné à titre
        indicatif. Pour simplifier l’utilisation de ce simulateur, certains
        paramètres complexes n’ont pas été pris en compte dans le calcul de
        l’indemnité et peuvent donner lieu à un montant différent. Par exemple,
        les absences de moins d’un mois ou les contrats antérieurs au CDI ne
        sont pas pris en compte dans le calcul de l’ancienneté du salarié.
      </i>
    </>
  );
};

export default Eligible;
