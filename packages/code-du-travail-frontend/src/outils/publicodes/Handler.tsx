import { getNotifications } from "@socialgouv/modeles-social";
import Engine from "publicodes";
import { useMemo, useState } from "react";

import { PublicodesContextInterface, SituationElement } from "./index";

interface State {
  engine: Engine;
  targetRule: string;
}

const usePublicodesHandler = ({
  engine,
  targetRule,
}: State): PublicodesContextInterface => {
  const [situation, setSituation] = useState<Map<string, SituationElement>>(
    new Map()
  );

  function newSituation(args: Record<string, string>): void {
    const situation: Map<string, SituationElement> = new Map();
    Object.entries(args).forEach(([key, value]) => {
      const publiKey = key.replace(/ - /g, " . ");
      const detail = engine.getRule(publiKey);
      situation.set(publiKey, {
        name: key,
        rawNode: detail.rawNode,
        value: value,
      });
    });
    setSituation(situation);
  }

  const buildSituation = (
    map: Map<string, SituationElement>
  ): Record<string, string> => {
    const situation: Record<string, string> = {};
    map.forEach((arg) => {
      situation[arg.rawNode.nom] = arg.value;
    });
    return situation;
  };

  const missingArgs = useMemo(() => {
    const result = engine
      ?.setSituation(buildSituation(situation))
      .evaluate(targetRule);
    return Object.entries(result?.missingVariables ?? [])
      .map(([key, value]) => {
        const detail = engine.getRule(key);
        return {
          indice: value,
          name: key.replace(/ \. /g, " - "),
          rawNode: detail.rawNode,
        };
      })
      .sort((a, b) => b.indice - a.indice);
  }, [engine, targetRule, situation]);

  const value = useMemo(() => {
    const result = engine
      ?.setSituation(buildSituation(situation))
      .evaluate(targetRule);

    if (result === null) {
      return null;
    }

    return { unit: result.unit, value: result.nodeValue };
  }, [engine, targetRule, situation]);

  return {
    getNotifications: () => getNotifications(engine),
    missingArgs,
    result: value,
    setSituation: newSituation,
    situation: Array.from(situation.values()),
  };
};

export default usePublicodesHandler;
