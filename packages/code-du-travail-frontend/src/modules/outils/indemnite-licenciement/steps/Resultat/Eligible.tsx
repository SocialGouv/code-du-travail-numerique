import {
  getSupportedAgreement,
  Notification,
} from "@socialgouv/modeles-social";
import React, { useContext } from "react";
import { PubliReferences } from "src/modules/outils/common/components";
import {
  DecryptResult,
  FilledElements,
  FormulaInterpreter,
  Result,
} from "src/modules/outils/indemnite-depart/steps/Resultat/components";
import { informationToSituation } from "src/modules/outils/indemnite-depart/steps/Informations/components/utils";
import {
  IndemniteDepartContext,
  useIndemniteDepartStore,
} from "src/modules/outils/indemnite-depart/store";
import { IndemniteDepartStepName } from "src/modules/outils/indemnite-depart";
import { IndemniteDepartType } from "src/modules/outils/indemnite-depart/types";
import { AgreementsInjector } from "src/modules/outils/indemnite-depart/agreements";
import { getForMoreInfoMessage, getResultMessage } from "./utils";
import { AccessibleAlert } from "src/modules/outils/common/components/AccessibleAlert";
import Link from "src/modules/common/Link";
import { fr } from "@codegouvfr/react-dsfr";

export default function Eligible() {
  const store = useContext(IndemniteDepartContext);
  const {
    result,
    publicodesLegalResult,
    publicodesAgreementResult,
    agreementExplanation,
    resultExplanation,
    licenciementInaptitude,
    agreement,
    dateEntree,
    dateSortie,
    dateNotification,
    absencePeriods,
    salaryPeriods,
    formula,
    legalReferences,
    agreementReferences,
    isAgreementBetter,
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
    informationData,
    isAgreementSupported,
    isParentalNoticeHidden,
  } = useIndemniteDepartStore(store, (state) => ({
    result: state.resultData.input.result,
    publicodesLegalResult: state.resultData.input.publicodesLegalResult,
    publicodesAgreementResult: state.resultData.input.publicodesAgreementResult,
    licenciementInaptitude:
      state.contratTravailData.input.licenciementInaptitude,
    agreement: state.agreementData.input.agreement,
    dateEntree: state.ancienneteData.input.dateEntree,
    dateSortie: state.ancienneteData.input.dateSortie,
    dateNotification: state.ancienneteData.input.dateNotification,
    absencePeriods: state.ancienneteData.input.absencePeriods,
    salaryPeriods: state.salairesData.input.salaryPeriods,
    formula: state.resultData.input.formula,
    legalReferences: state.resultData.input.legalReferences,
    agreementReferences: state.resultData.input.agreementReferences,
    isAgreementBetter: state.resultData.input.isAgreementBetter,
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
    informationData: informationToSituation(
      state.informationsData.input.publicodesInformations
    ),
    isAgreementSupported:
      state.agreementData.input.isAgreementSupportedIndemniteLicenciement,
    isParentalNoticeHidden: state.resultData.input.isParentalNoticeHidden,
    agreementExplanation: state.resultData.input.agreementExplanation,
    resultExplanation: state.resultData.input.resultExplanation,
  }));

  const defaultNotification = [
    {
      dottedName: "default notification 1",
      description: (
        <span>
          Ce montant est exonéré d&apos;impôt sur le revenu et de cotisations
          sociales sous certaines conditions,{" "}
          <Link
            href="/fiche-service-public/indemnite-de-licenciement-du-salarie-en-cdi#lindemnite-de-licenciement-est-elle-imposable"
            target="_blank"
            rel="noopener noreferrer"
            title="L'indemnité de licenciement est-elle imposable ?"
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
        title="Indemnité de licenciement"
        maxResult={result?.value?.toString() ?? ""}
        notifications={defaultNotification.concat(notifications ?? [])}
        resultMessage={getResultMessage(informationData)}
      />
      {!agreementHasNoBetterAllowance && infoWarning && (
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
        type={IndemniteDepartType.LICENCIEMENT}
        contractTravail={[
          {
            text: "Type de contrat",
            value: "CDI",
          },
          {
            text: "Licenciement dû à une faute grave (ou lourde)",
            value: "Non",
          },
          {
            text: "Licenciement dû à une inaptitude d'origine professionnelle",
            value: licenciementInaptitude === "oui" ? "Oui" : "Non",
            detail:
              !isAgreementBetter && licenciementInaptitude === "oui"
                ? "Le salarié ayant été licencié pour inaptitude suite à un accident du travail ou une maladie professionnelle reconnue, le montant de l'indemnité de licenciement légale est doublé"
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
        absencesPeriods={absencePeriods}
        agreementName={agreement?.shortTitle}
        dateEntree={dateEntree!}
        dateSortie={dateSortie!}
        dateNotification={dateNotification}
        salaryPeriods={salaryPeriods}
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
              type={IndemniteDepartType.LICENCIEMENT}
            />
          )
        }
        isStepSalaryHidden={isStepSalaryHidden}
        disableParentalNotice={isParentalNoticeHidden}
      />
      <FormulaInterpreter formula={formula} />
      {!agreementHasNoLegalIndemnity && (
        <DecryptResult
          legalResult={
            publicodesLegalResult.value
              ? publicodesLegalResult.value.toString()
              : "0"
          }
          agreementResult={
            publicodesAgreementResult && publicodesAgreementResult.value
              ? publicodesAgreementResult.value.toString()
              : undefined
          }
          label="licenciement"
          resultExplanation={resultExplanation}
          agreementExplanation={agreementExplanation}
        />
      )}
      <PubliReferences
        references={
          isAgreementBetter ? (agreementReferences ?? []) : legalReferences
        }
      />

      <p>
        Pour en savoir plus sur l&apos;indemnité de licenciement et son mode de
        calcul, consultez{" "}
        <Link
          href={`/fiche-service-public/indemnite-de-licenciement-du-salarie-en-cdi`}
          target={"_blank"}
        >
          cet article
        </Link>
        .
      </p>
      <i>{getForMoreInfoMessage(isAgreementBetter, agreement?.num)}</i>
    </div>
  );
}
