import type { EvaluatedNode } from "publicodes";

import { PublicodesBase } from "./PublicodesBase";
import type { PublicodesOutput } from "./types";
import { PublicodesDefaultRules, PublicodesSimulator } from "./types";
import { ExplanationBuilder } from "./common/ExplanationBuilder";
import { ResultBuilder } from "./common/ResultBuilder";
import { CalculateOutput, PublicodesCalculateResult } from "./common/type";

import { mapIneligibility } from "./common/mapper";
import {
  IneligibilityIndemnitePrecariteFactory,
  SupportedCc,
} from "../modeles";
import { IIneligibility } from "../modeles/common/types/ineligibility";

export class IndemnitePrecaritePublicodes extends PublicodesBase<PublicodesCalculateResult> {
  protected explanationInstance: ExplanationBuilder;
  public readonly ineligibility: IIneligibility;
  private readonly builder: ResultBuilder;

  constructor(rules: { [key: string]: any }, idcc?: string) {
    super(
      { ...(idcc && rules[idcc] ? rules[idcc] : {}), ...rules.base },
      PublicodesDefaultRules[PublicodesSimulator.INDEMNITE_PRECARITE]
    );
    this.ineligibility = new IneligibilityIndemnitePrecariteFactory().create(
      idcc ? (idcc as SupportedCc) : SupportedCc.default
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
      formula: this.getFormuleAgreement(),
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
      formula: this.getFormuleLegal(),
      notifications: this.getNotifications(),
      references,
      result: result.result,
      type: "result",
    };
  }

  public calculate(
    situation: Record<string, string | undefined>
  ): PublicodesOutput<PublicodesCalculateResult> {
    const ineligibility = this.ineligibility.getIneligibility(situation);
    if (ineligibility) {
      return mapIneligibility(ineligibility);
    }
    const agreementResult = this.calculateAgreement(situation);

    if (
      agreementResult.type === "ineligibility" ||
      agreementResult.type === "missing-args"
    ) {
      return agreementResult;
    }

    const legalResult = this.calculateLegal(situation);
    if (
      legalResult.type === "ineligibility" ||
      legalResult.type === "missing-args"
    ) {
      return legalResult;
    }

    return this.builder.buildResult(
      this.data.situation,
      legalResult,
      agreementResult.type === "result" ? agreementResult : undefined,
      true
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
