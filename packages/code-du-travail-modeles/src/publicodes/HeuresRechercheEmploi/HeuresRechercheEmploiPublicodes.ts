import type { EvaluatedNode } from "publicodes";

import { PublicodesBase } from "../PublicodesBase";
import type { PublicodesOutput } from "../types";
import { PublicodesDefaultRules, PublicodesSimulator } from "../types";
import { BuilderResult, PublicodesCalculateResult } from "../common/type";

export class HeuresRechercheEmploiPublicodes extends PublicodesBase<
  PublicodesCalculateResult<string>
> {
  constructor(rules: { [key: string]: any }, idcc?: string) {
    super(
      { ...(idcc && rules[idcc] ? rules[idcc] : {}), ...rules.base },
      PublicodesDefaultRules[PublicodesSimulator.HEURES_RECHERCHE_EMPLOI]
    );
  }

  private calculateAgreement(
    situation: Record<string, string | undefined>
  ): BuilderResult<PublicodesCalculateResult<string>> {
    const result = this.setSituation(
      situation,
      "contrat salarié . convention collective . résultat conventionnel"
    );
    const notifications = this.getNotifications();
    const references = this.getReferences();
    return {
      formula: {
        explanations: [],
        formula: "",
      },
      notifications,
      references,
      result: result.result,
      type: "result",
    };
  }

  private calculateLegal(
    situation: Record<string, string | undefined>
  ): BuilderResult<PublicodesCalculateResult<string>> {
    const result = this.setSituation(
      situation,
      "contrat salarié . résultat légal"
    );
    const notifications = this.getNotifications();
    const references = this.getReferences();
    return {
      formula: {
        explanations: [],
        formula: "",
      },
      notifications: notifications,
      references,
      result: result.result,
      type: "result",
    };
  }

  public calculate(
    args: Record<string, string | undefined>
  ): PublicodesOutput<PublicodesCalculateResult<string>> {
    if (args["contrat salarié . convention collective"]) {
      const agreementResult = this.calculateAgreement(args);
      return {
        ...agreementResult,
        detail: {
          chosenResult: "AGREEMENT",
        },
        formula: {
          formula: "",
          explanations: [],
        },
        notifications: agreementResult.notifications,
        references: agreementResult.references,
        result: {
          value: agreementResult.result.value,
        },
        situation: [],
        explanation: "AGREEMENT_AMOUNT_MORE",
      };
    }
    const legalResult = this.calculateLegal(args);
    return {
      ...legalResult,
      detail: {
        chosenResult: "LEGAL",
      },
      formula: {
        formula: "",
        explanations: [],
      },
      notifications: legalResult.notifications,
      references: legalResult.references,
      result: {
        value: legalResult.result.value,
      },
      situation: [],
      explanation: "AGREEMENT_AMOUNT_MORE",
    };
  }

  protected convertedResult(
    evaluatedNode: EvaluatedNode<string>
  ): PublicodesCalculateResult<string> {
    return {
      unit: evaluatedNode.unit,
      value: evaluatedNode.nodeValue,
    };
  }
}
