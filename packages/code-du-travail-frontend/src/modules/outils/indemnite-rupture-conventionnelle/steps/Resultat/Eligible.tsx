import React, { useContext } from "react";
import {
  getSupportedAgreement,
  Notification,
} from "@socialgouv/modeles-social";
import { getResultMessage } from "./utils";
import Result from "src/modules/outils/indemnite-depart/steps/Resultat/components/Result";
import {
  IndemniteDepartContext,
  useIndemniteDepartStore,
} from "src/modules/outils/indemnite-depart/store";
import { informationToSituation } from "src/modules/outils/indemnite-depart/steps/Informations/components/utils";
import {
  DecryptResult,
  FilledElements,
  FormulaInterpreter,
} from "src/modules/outils/indemnite-depart/steps/Resultat/components";
import { IndemniteDepartType } from "src/modules/outils/indemnite-depart/types";
import { AgreementsInjector } from "src/modules/outils/indemnite-depart/agreements";
import { IndemniteDepartStepName } from "src/modules/outils/indemnite-depart";
import {
  Disclaimer,
  PubliReferences,
} from "src/modules/outils/common/components";
import Link from "src/modules/common/Link";
import { fr } from "@codegouvfr/react-dsfr";

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
          <Link
            href="/fiche-service-public/comment-calculer-lindemnite-specifique-de-rupture-conventionnelle#lindemnite-de-rupture-conventionnelle-est-elle-imposable"
            target="_blank"
            rel="noopener noreferrer"
            title="L'indemnité de rupture conventionnelle est-elle imposable ?"
          >
            en savoir plus
          </Link>
        </span>
      ),
    } as Notification,
  ];

  return (
    <div className={fr.cx("fr-col-md-8", "fr-col-12")}>
      <Result
        title="Indemnité de rupture conventionnelle"
        maxResult={result.result.value?.toString() ?? ""}
        notifications={defaultNotification.concat(result.notifications ?? [])}
        resultMessage={getResultMessage(informationData)}
      />
      {!result.agreementHasNoBetterAllowance && result.infoWarning && (
        <Disclaimer
          title={result.infoWarning.title}
          message={result.infoWarning.message}
          dataTestId="eligible-cc-disclaimer"
        />
      )}
      <h2>Détail du calcul</h2>
      <FilledElements
        type={IndemniteDepartType.RUPTURE_CONVENTIONNELLE}
        contractTravail={[
          {
            text: "Type de contrat",
            value: contratTravail.typeContratTravail!.toString().toUpperCase(),
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
      <i>
        Le montant donné n’est qu’une estimation, il est donné à titre
        indicatif. Pour simplifier l’utilisation de ce simulateur, certains
        paramètres complexes n’ont pas été pris en compte dans le calcul de
        l’indemnité et peuvent donner lieu à un montant différent. Par exemple,
        les absences de moins d’un mois ou les contrats antérieurs au CDI ne
        sont pas pris en compte dans le calcul de l’ancienneté du salarié.
      </i>
    </div>
  );
};

export default Eligible;
