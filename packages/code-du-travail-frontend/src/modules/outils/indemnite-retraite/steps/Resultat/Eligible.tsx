import { Notification } from "@socialgouv/modeles-social";
import React, { useContext } from "react";
import { PubliReferences } from "src/modules/outils/common/components";
import {
  FilledElements,
  FormulaInterpreter,
  Result,
} from "src/modules/outils/indemnite-depart/steps/Resultat/components";
import {
  IndemniteDepartContext,
  useIndemniteDepartStore,
} from "src/modules/outils/indemnite-depart/store";
import { IndemniteDepartType } from "src/modules/outils/indemnite-depart/types";
import {
  getRetraiteOriginLabel,
  getRuptureLabel,
} from "src/modules/outils/indemnite-depart/utils/question";
import { AccessibleAlert } from "src/modules/outils/common/components/AccessibleAlert";
import Link from "src/modules/common/Link";
import { fr } from "@codegouvfr/react-dsfr";
import {
  CONTRIBUTION_INDEMNITE_RETRAITE,
  getForMoreInfoMessage,
} from "./utils";

export default function Eligible() {
  const store = useContext(IndemniteDepartContext);
  const {
    result,
    dateEntree,
    dateSortie,
    dateNotification,
    absencePeriods,
    salaryPeriods,
    formula,
    legalReferences,
    salary,
    hasSameSalary,
    isStepSalaryHidden,
    infoWarning,
    dateArretTravail,
    arretTravail,
    originRetraite,
  } = useIndemniteDepartStore(store, (state) => ({
    result: state.resultData.input.result,
    dateEntree: state.ancienneteData.input.dateEntree,
    dateSortie: state.ancienneteData.input.dateSortie,
    dateNotification: state.ancienneteData.input.dateNotification,
    absencePeriods: state.absenceData.input.absencePeriods,
    salaryPeriods: state.salairesData.input.salaryPeriods,
    formula: state.resultData.input.formula,
    legalReferences: state.resultData.input.legalReferences,
    salary: state.salairesData.input.salary,
    hasSameSalary: state.salairesData.input.hasSameSalary,
    isStepSalaryHidden: state.informationsData.input.isStepSalaryHidden,
    infoWarning: state.resultData.input.infoWarning,
    dateArretTravail: state.absenceData.input.dateArretTravail,
    arretTravail: state.absenceData.input.arretTravail,
    originRetraite: state.informationsData.input.originRetraite,
  }));

  const isMiseRetraite = originRetraite === "mise-retraite";
  const originLabel = getRetraiteOriginLabel(originRetraite);
  const ruptureLabel = getRuptureLabel(
    IndemniteDepartType.RETRAITE,
    originRetraite
  );

  // Le régime fiscal et social diffère selon l'origine de la rupture.
  const defaultNotification = [
    {
      dottedName: "default notification 1",
      description: isMiseRetraite ? (
        <span>
          Ce montant peut être exonéré d&apos;impôt sur le revenu et de
          cotisations sociales sous certaines conditions,{" "}
          <Link
            href={CONTRIBUTION_INDEMNITE_RETRAITE}
            target="_blank"
            rel="noopener noreferrer"
            title="L'indemnité de mise à la retraite est-elle soumise à cotisations et imposable ?"
          >
            en savoir plus
          </Link>
        </span>
      ) : (
        <span>
          Ce montant est soumis à l&apos;impôt sur le revenu et aux cotisations
          sociales (sauf en cas de départ à la retraite dans le cadre d&apos;un
          plan de sauvegarde de l&apos;emploi),{" "}
          <Link
            href={CONTRIBUTION_INDEMNITE_RETRAITE}
            target="_blank"
            rel="noopener noreferrer"
            title="L'indemnité de départ à la retraite est-elle soumise à cotisations et imposable ?"
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
        title={`Indemnité de ${originLabel}`}
        maxResult={result?.value?.toString() ?? ""}
        notifications={defaultNotification}
        resultMessage={`À partir des éléments que vous avez saisis, l’indemnité de ${originLabel} est estimée à :`}
      />
      {infoWarning && (
        <AccessibleAlert
          titleAs="h4"
          title={infoWarning.title}
          description={infoWarning.message}
          data-testid="eligible-cc-disclaimer"
          severity="info"
        />
      )}
      <h3 className={fr.cx("fr-mt-2w")}>Détail du calcul</h3>
      <FilledElements
        type={IndemniteDepartType.RETRAITE}
        originRetraite={originRetraite}
        contractTravail={[
          {
            text: "Type de contrat",
            value: "CDI",
          },
          {
            text: "Origine du départ",
            value: isMiseRetraite
              ? "Mise à la retraite"
              : "Départ à la retraite",
          },
          {
            text: `Arrêt de travail au moment ${ruptureLabel}`,
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
        absencesPeriods={absencePeriods}
        dateEntree={dateEntree!}
        dateSortie={dateSortie!}
        dateNotification={dateNotification}
        salaryPeriods={salaryPeriods}
        hasSameSalary={hasSameSalary === "oui"}
        salary={salary}
        isAgreementBetter={false}
        agreementRefSalaryInfo={undefined}
        isStepSalaryHidden={isStepSalaryHidden}
      />
      <FormulaInterpreter formula={formula} />
      <PubliReferences references={legalReferences} />

      <p>
        Pour en savoir plus sur l&apos;indemnité de départ ou mise à la retraite
        et son mode de calcul, consultez{" "}
        <Link href={CONTRIBUTION_INDEMNITE_RETRAITE} target={"_blank"}>
          cet article
        </Link>
        .
      </p>
      <i>{getForMoreInfoMessage()}</i>
    </div>
  );
}
