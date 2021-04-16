import Engine from "publicodes";
import { useMemo, useState } from "react";

import { PublicodesContextInterface } from "./index";

interface State {
  engine: Partial<Engine>;
  targetRule: string;
}

const usePublicodesHandler = ({
  engine,
  targetRule,
}: State): PublicodesContextInterface => {
  const [situation, setSituation] = useState<Record<string, string>>({});

  function newSituation(args: Record<string, string>): void {
    const situation: Record<string, string> = {};
    Object.keys(args).forEach((key) => {
      situation[key.replaceAll(" - ", " . ")] = args[key];
    });
    setSituation(situation);
  }

  const missingArgs = useMemo(() => {
    const result = engine?.setSituation(situation).evaluate(targetRule);
    return Object.keys(result?.missingVariables ?? [])
      .map((arg) => {
        const detail = engine.getRule(arg);
        return {
          indice: result.missingVariables[arg],
          name: arg.replaceAll(" . ", " - "),
          rawNode: detail.rawNode,
        };
      })
      .sort((a, b) => b.indice - a.indice);
  }, [engine, targetRule, situation]);

  const value = useMemo(() => {
    const result = engine?.setSituation(situation).evaluate(targetRule);
    return result?.nodeValue ?? null;
  }, [engine, targetRule, situation]);

  return {
    missingArgs,
    result: value,
    setSituation: newSituation,
  };
};

export default usePublicodesHandler;
