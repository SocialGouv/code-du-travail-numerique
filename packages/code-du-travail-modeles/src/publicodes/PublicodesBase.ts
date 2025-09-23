import type { EvaluatedNode } from "publicodes";
import Engine from "publicodes";

import type { Formula, Notification, References } from "../modeles";
import {
  getFormule,
  getFormuleAgreement,
  getFormuleLegal,
  getNotifications,
  getNotificationsBloquantes,
  getReferences,
} from "../modeles";
import type { Publicodes } from "./Publicodes";
import type {
  MissingArgs,
  PublicodesData,
  PublicodesOutput,
  SituationElement,
} from "./types";

export abstract class PublicodesBase<TResult> implements Publicodes<TResult> {
  engine: Engine;

  targetRule: string;

  data: PublicodesData<TResult> = {
    missingArgs: [],
    result: {} as TResult,
    situation: [],
  };

  protected constructor(rules: any, targetRule: string) {
    this.engine = new Engine(rules);
    this.targetRule = targetRule;
  }

  execute(rule: string): TResult | undefined {
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

  getFormuleLegal(): Formula {
    return getFormuleLegal(this.engine);
  }

  getFormuleAgreement(): Formula {
    return getFormuleAgreement(this.engine);
  }

  getFormule(): Formula {
    return getFormule(this.engine);
  }

  protected removeNonPublicodeFields(
    args: Record<string, string | undefined>
  ): Record<string, string | undefined> {
    return Object.keys(args).reduce((filteredObj, key) => {
      if (key.startsWith("contrat salarié . ") && args[key]) {
        return {
          ...filteredObj,
          [key]: args[key],
        };
      }
      return filteredObj;
    }, {});
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
          name: key.replace(/\./g, " ").replace(/\s+/g, "-"),
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
  ): PublicodesOutput<TResult>;

  protected abstract convertedResult(evaluatedNode: EvaluatedNode): TResult;
}
