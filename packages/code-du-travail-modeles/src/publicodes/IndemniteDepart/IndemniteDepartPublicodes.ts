import type { EvaluatedNode } from "publicodes";

import { PublicodesBase } from "../PublicodesBase";
import type {
  PublicodesIndemniteLicenciementResult,
  PublicodesOutput,
} from "../types";
import { PublicodesDefaultRules, PublicodesSimulator } from "../types";
import type { AgreementIndemniteCompute } from "./AgreementIndemniteCompute";
import type { ExplanationBuilder } from "../common/ExplanationBuilder";
import type { Legal } from "./Legal";
import { ResultBuilder } from "../common/ResultBuilder";
import type { IndemniteDepartOutput } from "./types";
import type { Absence } from "../../modeles";

export class IndemniteDepartPublicodes extends PublicodesBase<PublicodesIndemniteLicenciementResult> {
  protected legalInstance: Legal;

  protected agreementInstance?: AgreementIndemniteCompute;

  protected explanationInstance: ExplanationBuilder;

  private readonly builder: ResultBuilder;

  constructor(
    rules: any,
    legalInstance: Legal,
    explanationInstance: ExplanationBuilder,
    agreementInstance?: AgreementIndemniteCompute,
    defaultTargetRule?: string
  ) {
    super(
      rules,
      defaultTargetRule ??
        PublicodesDefaultRules[PublicodesSimulator.INDEMNITE_LICENCIEMENT]
    );
    this.builder = new ResultBuilder(explanationInstance);
    this.legalInstance = legalInstance;
    this.agreementInstance = agreementInstance;
    this.explanationInstance = explanationInstance;
  }

  /**
   * Ancienneté légale affichée en temps réel aux étapes « Ancienneté » et
   * « Absences ».
   *
   * Passe par `mapSituation` pour appliquer les mêmes règles que `calculate()`,
   * dont le retrait de l'arrêt de travail en cours (`SeniorityDefault`).
   */
  public estimatedSeniority(
    dateEntree: string,
    dateSortie: string,
    absencePeriods: Absence[] = [],
    dateArretTravail?: string
  ) {
    const { seniority } = this.legalInstance;
    return seniority.computeSeniority(
      seniority.mapSituation({
        absencePeriods: JSON.stringify(absencePeriods),
        "contrat salarié . indemnité de licenciement . arrêt de travail":
          dateArretTravail ? "oui" : "non",
        "contrat salarié . indemnité de licenciement . date d'arrêt de travail":
          dateArretTravail,
        "contrat salarié . indemnité de licenciement . date d'entrée":
          dateEntree,
        "contrat salarié . indemnité de licenciement . date de sortie":
          dateSortie,
      })
    );
  }

  public calculate(
    args: Record<string, string | undefined>
  ): PublicodesOutput<PublicodesIndemniteLicenciementResult> {
    const agreementResult = this.agreementInstance?.calculate(args, this);

    if (
      agreementResult?.type === "ineligibility" ||
      agreementResult?.type === "missing-args"
    ) {
      return agreementResult;
    }

    const noLegalIndemnity = this.hasNoLegalIndemnity();
    let legalResult:
      | IndemniteDepartOutput<PublicodesIndemniteLicenciementResult>
      | undefined = undefined;
    if (!noLegalIndemnity) {
      legalResult = this.legalInstance.calculate(
        args,
        this,
        !!this.agreementInstance
      );
    }
    if (
      legalResult?.type === "ineligibility" ||
      legalResult?.type === "missing-args"
    ) {
      return legalResult;
    }

    if (legalResult && !this.agreementInstance) {
      return {
        ...legalResult,
        detail: {
          agreementExplanation:
            this.explanationInstance.getAgreementExplanation(),
          chosenResult: "LEGAL",
          legalResult: legalResult.result,
        },
        explanation: this.explanationInstance.getMainExplanation(
          legalResult.result.value
        ),
        situation: this.data.situation,
      };
    }

    return this.builder.buildResult(
      this.data.situation,
      legalResult,
      agreementResult
    );
  }

  protected convertedResult(
    evaluatedNode: EvaluatedNode<number>
  ): PublicodesIndemniteLicenciementResult {
    return {
      unit: evaluatedNode.unit,
      value: evaluatedNode.nodeValue,
    };
  }

  protected hasNoLegalIndemnity(): boolean {
    const hasNoLegalIndemnity = this.engine.evaluate(
      "contrat salarié . indemnité de licenciement . résultat légal doit être ignoré"
    );

    return !!hasNoLegalIndemnity.nodeValue;
  }
}
