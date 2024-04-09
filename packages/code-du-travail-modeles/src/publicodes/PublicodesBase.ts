import type { EvaluatedNode } from "publicodes";
import Engine from "publicodes";

import type { Formula, Notification, References } from "../modeles/common";
import {
  getFormule,
  getNotifications,
  getNotificationsBloquantes,
  getReferences,
  SupportedCc,
} from "../modeles/common";
import type { Publicodes } from "./Publicodes";
import type {
  MissingArgs,
  PublicodesData,
  PublicodesDataWithFormula,
  PublicodesIndemniteLicenciementResult,
  SituationElement,
} from "./types";

export abstract class PublicodesBase<TResult> implements Publicodes<TResult> {
  idcc: SupportedCc;

  engine: Engine;

  targetRule: string;

  data: PublicodesData<TResult> = {
    detail: {
      legalResult: {} as TResult,
    },
    missingArgs: [],
    result: {} as TResult,
    situation: [],
  };

  protected constructor(rules: any, targetRule: string, idcc?: SupportedCc) {
    this.engine = new Engine(rules);
    this.targetRule = targetRule;
    this.idcc = idcc ?? SupportedCc.default;
  }

  execute(rule: string): TResult {
    const result = this.handleExecute(this.data.situation, rule);
    if (!result)
      throw new Error(
        `Unable to evaluate ${rule} with ${JSON.stringify(this.data.situation)}`
      );
    return this.convertedResult(result);
  }

  setSituation(
    args: Record<string, string | undefined>,
    targetRule?: string
  ): PublicodesData<TResult> {
    const { missingArgs, result, situation } = this.updateSituation(
      this.data.situation,
      args,
      targetRule ?? this.targetRule
    );

    this.data = {
      detail: {
        legalResult: this.convertedResult(result), // juste pour que le ts compile
      },
      missingArgs,
      result: this.convertedResult(result),
      situation,
    };
    return this.data;
  }

  getNotifications(): Notification[] {
    return getNotifications(this.engine);
  }

  getNotificationsBloquantes(): Notification[] {
    return getNotificationsBloquantes(this.engine);
  }

  getReferences(specificRule?: string): References[] {
    return getReferences(this.engine, specificRule);
  }

  getFormule(): Formula {
    return getFormule(this.engine);
  }

  protected compareAndSetResult(
    legalResult: PublicodesData<PublicodesIndemniteLicenciementResult>,
    agreementResult: PublicodesData<PublicodesIndemniteLicenciementResult>,
    agreementFormula: Formula,
    result: PublicodesDataWithFormula<PublicodesIndemniteLicenciementResult>
  ): PublicodesDataWithFormula<PublicodesIndemniteLicenciementResult> {
    result.detail.agreementResult = agreementResult.result;

    if (this.hasNoLegalIndemnity()) {
      result.missingArgs = agreementResult.missingArgs;
      result.result = agreementResult.result;
      result.formula = agreementFormula;
      result.detail.chosenResult = "HAS_NO_LEGAL";
      return result;
    }

    result.missingArgs = result.missingArgs.concat(agreementResult.missingArgs);

    if (
      legalResult.result.value !== undefined &&
      legalResult.result.value !== null &&
      agreementResult.result.value !== undefined &&
      agreementResult.result.value !== null
    ) {
      if (agreementResult.result.value > legalResult.result.value) {
        result.result = agreementResult.result;
        result.formula = agreementFormula;
        result.detail.chosenResult = "AGREEMENT";
      } else if (agreementResult.result.value === legalResult.result.value) {
        result.detail.chosenResult = "SAME";
      }
    }

    return result;
  }

  private hasNoLegalIndemnity(): boolean {
    const hasNoLegalIndemnity = this.engine.evaluate(
      "contrat salarié . indemnité de licenciement . résultat légal doit être ignoré"
    );

    return !!hasNoLegalIndemnity.nodeValue;
  }

  private buildSituation(
    map: SituationElement[]
  ): Record<string, string | undefined> {
    const situation: Record<string, string | undefined> = {};
    map.forEach((arg) => {
      situation[arg.rawNode.nom] = arg.value;
    });
    return situation;
  }

  private buildMissingArgs(
    engine: Engine,
    missingArgs: Record<string, number>
  ): MissingArgs[] {
    return Object.entries(missingArgs)
      .map(([key, value]) => {
        const detail = engine.getRule(key);
        return {
          indice: value,
          name: key.replace(/ \. /g, " - "),
          rawNode: detail.rawNode,
        };
      })
      .sort((a, b) => b.indice - a.indice);
  }

  private handleExecute(
    situation: SituationElement[],
    rule: string
  ): EvaluatedNode | undefined {
    try {
      this.engine.setSituation(this.buildSituation(situation));
      return this.engine.evaluate(rule);
    } catch (error: unknown) {
      console.error("Failed to evaluate: ", error);
      return undefined;
    }
  }

  private updateSituation(
    situation: SituationElement[],
    args: Record<string, string | undefined>,
    targetRule: string
  ): {
    missingArgs: MissingArgs[];
    result: EvaluatedNode;
    situation: SituationElement[];
  } {
    // Situation is an array to keep the order of the answers
    const currentSituation = situation;
    const newSituation: SituationElement[] = [];

    // Update the current situation with new values
    currentSituation.forEach((element) => {
      // Keep the data only if always here in the form
      if (args[element.name]) {
        newSituation.push({
          name: element.name,
          rawNode: element.rawNode,
          value: args[element.name],
        });
      }
    });

    // Add the new entries from the form
    Object.entries(args).forEach(([key, value]) => {
      if (!newSituation.find((element) => element.name === key)) {
        const publiKey = key.replace(/ - /g, " . ");
        const detail = this.engine.getRule(publiKey);
        newSituation.push({
          name: key,
          rawNode: detail.rawNode,
          value: value,
        });
      }
    });

    const result = this.handleExecute(newSituation, targetRule);
    if (!result)
      throw new Error(
        `Unable to evaluate ${targetRule} with ${JSON.stringify(newSituation)}`
      );

    return {
      missingArgs: this.buildMissingArgs(this.engine, result.missingVariables),
      result,
      situation: newSituation,
    };
  }

  abstract calculate(
    args: Record<string, string | undefined>,
    target?: string
  ): PublicodesData<TResult>;

  abstract calculateResult(
    args: Record<string, string | undefined>
  ): PublicodesData<TResult>;

  protected abstract convertedResult(evaluatedNode: EvaluatedNode): TResult;
}
