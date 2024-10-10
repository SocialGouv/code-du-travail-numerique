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

export class IndemniteDepartPublicodes extends PublicodesBase<PublicodesIndemniteLicenciementResult> {
  protected legalInstance: Legal;

  protected agreementInstance?: AgreementIndemniteCompute;

  protected explanationInstance: ExplanationBuilder;

  private readonly builder: ResultBuilder;

  constructor(
    rules: any,
    legalInstance: Legal,
    explanationInstance: ExplanationBuilder,
    agreementInstance?: AgreementIndemniteCompute
  ) {
    super(
      rules,
      PublicodesDefaultRules[PublicodesSimulator.INDEMNITE_LICENCIEMENT]
    );
    this.builder = new ResultBuilder(explanationInstance);
    this.legalInstance = legalInstance;
    this.agreementInstance = agreementInstance;
    this.explanationInstance = explanationInstance;
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
