import Engine from "publicodes";
import { useMemo, useState } from "react";

import { Argument, PublicodesContextInterface } from "./index";

interface State {
  engine: Partial<Engine>;
  targetRule: string;
}

const usePublicodesHandler = ({
  engine,
  targetRule,
}: State): PublicodesContextInterface => {
  const [situation, setSituation] = useState<Map<string, Argument>>(new Map());

  function newSituation(args: Record<string, string>): void {
    const situation: Map<string, Argument> = new Map();
    Object.keys(args).forEach((key) => {
      const publiKey = key.replaceAll(" - ", " . ");
      const detail = engine.getRule(publiKey);
      situation.set(publiKey, {
        name: key,
        rawNode: detail.rawNode,
        value: args[key],
      });
    });
    setSituation(situation);
  }

  const buildSituation = (
    map: Map<string, Argument>
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
    return Object.keys(result?.missingVariables ?? [])
      .map((arg) => {
        const detail = engine.getRule(arg);
        return {
          indice: result.missingVariables[arg],
          name: arg.replace(/ . /g, " - "),
          rawNode: detail.rawNode,
        };
      })
      .sort((a, b) => b.indice - a.indice);
  }, [engine, targetRule, situation]);

  const value = useMemo(() => {
    const result = engine
      ?.setSituation(buildSituation(situation))
      .evaluate(targetRule);
    return result?.nodeValue ?? null;
  }, [engine, targetRule, situation]);

  return {
    missingArgs,
    result: value,
    setSituation: newSituation,
    situation: Array.from(situation.values()),
  };
};

export default usePublicodesHandler;
