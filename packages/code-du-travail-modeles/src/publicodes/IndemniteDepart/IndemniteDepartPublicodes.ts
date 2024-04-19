import type { EvaluatedNode } from "publicodes";

import { PublicodesBase } from "../PublicodesBase";
import type {
  PublicodesIndemniteLicenciementResult,
  PublicodesOutput,
} from "../types";
import { PublicodesDefaultRules, PublicodesSimulator } from "../types";
import type { AgreementIndemniteCompute } from "./AgreementIndemniteCompute";
import type { Legal } from "./Legal";
import { ResultBuilder } from "./ResultBuilder";
import type { IndemniteDepartOutput } from "./types";
import { mapLegalRequiredSeniorityArgs, mapLegalSeniorityArgs } from "./utils";

export class IndemniteDepartPublicodes extends PublicodesBase<PublicodesIndemniteLicenciementResult> {
  protected legalInstance: Legal;

  protected agreementInstance?: AgreementIndemniteCompute;

  private readonly builder: ResultBuilder;

  constructor(
    rules: any,
    legalInstance: Legal,
    agreementInstance?: AgreementIndemniteCompute
  ) {
    super(
      rules,
      PublicodesDefaultRules[PublicodesSimulator.INDEMNITE_LICENCIEMENT]
    );
    this.builder = new ResultBuilder();
    this.legalInstance = legalInstance;
    this.agreementInstance = agreementInstance;
  }

  public calculate(
    args: Record<string, string | undefined>
  ): PublicodesOutput<PublicodesIndemniteLicenciementResult> {
    const agreementResult = this.agreementInstance?.calculate(
      args,
      this
    );

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

    if (
      legalResult &&
      !this.agreementInstance &&
      legalResult.type === "result"
    ) {
      return {
        ...legalResult,
        detail: {
          chosenResult: "LEGAL",
          legalResult: legalResult.result,
        },
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
