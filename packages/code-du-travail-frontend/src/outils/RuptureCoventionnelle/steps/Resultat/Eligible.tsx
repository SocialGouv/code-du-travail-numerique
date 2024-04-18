import React, { useContext } from "react";
import {
  IndemniteDepartContext,
  useIndemniteDepartStore,
} from "../../../CommonIndemniteDepart/store";
import { informationToSituation } from "../../../CommonSteps/Informations/utils";
import {
  DecryptResult,
  FilledElements,
  FormulaInterpreter,
  Result,
} from "../../../CommonIndemniteDepart/steps/Resultat/components";
import ShowDetails from "../../../common/ShowDetails";
import {
  Notification,
  getSupportedAgreement,
} from "@socialgouv/modeles-social";
import { IndemniteDepartStepName } from "../../../CommonIndemniteDepart";
import PubliReferences from "../../../common/PubliReferences";
import Disclaimer from "../../../common/Disclaimer";
import { getResultMessage } from "./utils";
import { IndemniteDepartType } from "../../../types";
import { AgreementsInjector } from "../../../CommonIndemniteDepart/agreements";
import { StyledLink } from "../../../CommonIndemniteDepart/steps/Resultat/components/Result";
import { Paragraph } from "@socialgouv/cdtn-ui";

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

  const defaultNotification = [
    {
      dottedName: "default notification 1",
      description: (
        <span>
          Ce montant est exonéré d’impôt sur le revenu et de cotisations
          sociales sous certaines conditions,{" "}
          <StyledLink
            href="/fiche-service-public/comment-calculer-lindemnite-specifique-de-rupture-conventionnelle"
            target="_blank"
          >
            en savoir plus
          </StyledLink>
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
                !result.isAgreementBetter &&
                contratTravail.licenciementInaptitude === "oui"
                  ? "Le salarié ayant été licencié pour inaptitude suite à un accident du travail ou une maladie professionnelle reconnue, le montant de l&apos;indemnité de rupture conventionnelle légale est doublé"
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
      <Paragraph italic fontSize="small">
        Le montant donné n’est qu’une estimation, il est donné à titre
        indicatif. Pour simplifier l’utilisation de ce simulateur, certains
        paramètres complexes n’ont pas été pris en compte dans le calcul de
        l’indemnité et peuvent donner lieu à un montant différent. Par exemple,
        les absences de moins d’un mois ou les contrats antérieurs au CDI ne
        sont pas pris en compte dans le calcul de l’ancienneté du salarié.
      </Paragraph>
    </>
  );
};

export default Eligible;
