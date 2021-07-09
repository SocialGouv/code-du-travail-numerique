import { getNotifications } from "@socialgouv/modeles-social";
import { getReferences } from "@socialgouv/modeles-social/bin/utils/GetReferences";
import Engine from "publicodes";
import { useState } from "react";

import type {
  MissingArgs,
  PublicodesContextInterface,
  PublicodesResult,
  SituationElement,
} from "./index";

interface State {
  engine: Engine;
  targetRule: string;
}

type PublicodeData = {
  situation: Array<SituationElement>;
  missingArgs: MissingArgs[];
  result: PublicodesResult | null;
};

const usePublicodesHandler = ({
  engine,
  targetRule,
}: State): PublicodesContextInterface => {
  const [data, setData] = useState<PublicodeData>({
    missingArgs: [],
    result: null,
    situation: [],
  });

  function handleExecute(rule: string): PublicodesResult {
    engine.setSituation(buildSituation(data.situation));
    const result = engine.evaluate(rule);
    return { unit: result.unit, value: result.nodeValue };
  }

  function newSituation(args: Record<string, string>): void {
    // Situation is an array to keep the order of the answers
    const currentSituation = data.situation;
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

    setData({
      missingArgs: buildMissingArgs(result.missingVariables),
      result: { unit: result.unit, value: result.nodeValue },
      situation: newSituation,
    });
  }

  const buildSituation = (
    map: Array<SituationElement>
  ): Record<string, string> => {
    const situation: Record<string, string> = {};
    map.forEach((arg) => {
      situation[arg.rawNode.nom] = arg.value;
    });
    return situation;
  };

  const buildMissingArgs = (missingArgs: Record<string, number>) => {
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

  return {
    execute: handleExecute,
    getNotifications: () => getNotifications(engine),
    getReferences: () => getReferences(engine),
    missingArgs: data.missingArgs,
    result: data.result,
    setSituation: newSituation,
    situation: Array.from(data.situation.values()),
  };
};

export default usePublicodesHandler;
