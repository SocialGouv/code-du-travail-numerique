import Engine from "publicodes";

import { convertDaysIntoBetterUnit, SituationElement } from "..";
import { PublicodesPreavisRetraiteResult } from "../types/preavis-retraite";

export function handleExecutePreavisRetraite(
  engine: Engine,
  situation: SituationElement[],
  rule: string
): PublicodesPreavisRetraiteResult {
  engine.setSituation(buildSituation(situation));
  const result = engine.evaluate(rule);
  return convertDaysIntoBetterUnit(result.nodeValue as unknown as string);
}

export function newSituation(
  engine: Engine,
  situation: SituationElement[],
  targetRule: string,
  args: Record<string, string>
): any {
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
      const detail = engine.getRule(publiKey);
      newSituation.push({
        name: key,
        rawNode: detail.rawNode,
        value: value,
      });
    }
  });

  engine.setSituation(buildSituation(newSituation));
  const result = engine.evaluate(targetRule);

  return {
    missingArgs: buildMissingArgs(engine, result.missingVariables),
    result,
    situation: newSituation,
  };
}

export const buildSituation = (
  map: Array<SituationElement>
): Record<string, string> => {
  const situation: Record<string, string> = {};
  map.forEach((arg) => {
    situation[arg.rawNode.nom] = arg.value;
  });
  return situation;
};

export const buildMissingArgs = (
  engine: Engine,
  missingArgs: Record<string, number>
): Array<any> => {
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
};
