import type { EvaluatedNode } from "publicodes";

import { PublicodesBase } from "../PublicodesBase";
import type { PublicodesOutput } from "../types";
import { PublicodesDefaultRules, PublicodesSimulator } from "../types";
import { ExplanationBuilder } from "../common/ExplanationBuilder";
import { ResultBuilder } from "./ResultBuilder";
import { CalculateOutput, PublicodesCalculateResult } from "../common/type";

export class IndemnitePrecaritePublicodes extends PublicodesBase<PublicodesCalculateResult> {
  protected explanationInstance: ExplanationBuilder;

  private readonly builder: ResultBuilder;

  constructor(rules: { [key: string]: any }, idcc?: string) {
    super(
      { ...(idcc && rules[idcc] ? rules[idcc] : {}), ...rules.base },
      PublicodesDefaultRules[PublicodesSimulator.INDEMNITE_PRECARITE]
    );
    this.explanationInstance = new ExplanationBuilder(idcc);
    this.builder = new ResultBuilder(this.explanationInstance);
  }

  private calculateAgreement(
    situation: Record<string, string | undefined>
  ): CalculateOutput<PublicodesCalculateResult> {
    const result = this.setSituation(
      situation,
      "contrat salarié . convention collective . résultat conventionnel"
    );
    if (result.missingArgs.length > 0) {
      return {
        missingArgs: result.missingArgs,
        type: "missing-args",
      };
    }
    const references = this.getReferences("résultat conventionnel");
    return {
      formula: {
        explanations: [],
        formula: "",
      },
      notifications: this.getNotifications(),
      references,
      result: result.result,
      type: "result",
    };
  }

  private calculateLegal(
    situation: Record<string, string | undefined>
  ): CalculateOutput<PublicodesCalculateResult> {
    const result = this.setSituation(
      situation,
      "contrat salarié . résultat légal"
    );
    if (result.missingArgs.length > 0) {
      return {
        missingArgs: result.missingArgs,
        type: "missing-args",
      };
    }
    const references = this.getReferences("résultat légal");
    return {
      formula: {
        explanations: [],
        formula: "",
      },
      notifications: this.getNotifications(),
      references,
      result: result.result,
      type: "result",
    };
  }

  public calculate(
    args: Record<string, string | undefined>
  ): PublicodesOutput<PublicodesCalculateResult> {
    const legalResult = this.calculateLegal(args);
    const agreementResult = this.calculateAgreement(args);

    if (
      args["contrat salarié . convention collective"] &&
      (agreementResult.type === "ineligibility" ||
        agreementResult.type === "missing-args")
    ) {
      return agreementResult;
    }

    if (
      legalResult.type === "ineligibility" ||
      legalResult.type === "missing-args"
    ) {
      return legalResult;
    }

    return this.builder.buildResult(
      this.data.situation,
      legalResult,
      agreementResult.type === "result" ? agreementResult : undefined
    );
  }

  protected convertedResult(
    evaluatedNode: EvaluatedNode<number>
  ): PublicodesCalculateResult {
    return {
      unit: evaluatedNode.unit,
      value: evaluatedNode.nodeValue,
    };
  }
}
