import type { EvaluatedNode } from "publicodes";
import Engine from "publicodes";

import type { Notification, References } from "../utils";
import { getNotifications, getReferences } from "../utils";
import type { Publicodes } from "./Publicodes";
import type { MissingArgs, PublicodesData, SituationElement } from "./types";

export abstract class PublicodesBase<TResult> implements Publicodes<TResult> {
  engine: Engine;

  targetRule: string;

  data: PublicodesData<TResult> = {
    missingArgs: [],
    result: {} as TResult,
    situation: [],
  };

  protected constructor(rules: string, targetRule: string) {
    this.engine = new Engine(rules);
    this.targetRule = targetRule;
  }

  execute(rule: string): TResult {
    const result = this.handleExecute(this.data.situation, rule);
    return this.convertedResult(result);
  }

  setSituation(
    args: Record<string, string>,
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

  getReferences(specificRule?: string): References[] {
    return getReferences(this.engine, specificRule);
  }

  private buildSituation(map: SituationElement[]): Record<string, string> {
    const situation: Record<string, string> = {};
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
  ): EvaluatedNode {
    this.engine.setSituation(this.buildSituation(situation));
    return this.engine.evaluate(rule);
  }

  private updateSituation(
    situation: SituationElement[],
    args: Record<string, string>,
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

    this.engine.setSituation(this.buildSituation(newSituation));
    const result = this.engine.evaluate(targetRule);

    return {
      missingArgs: this.buildMissingArgs(this.engine, result.missingVariables),
      result,
      situation: newSituation,
    };
  }

  protected abstract convertedResult(evaluatedNode: EvaluatedNode): TResult;
}
