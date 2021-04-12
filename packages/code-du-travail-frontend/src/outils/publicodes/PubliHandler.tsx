import Engine from "publicodes";
import { useMemo, useState } from "react";

import { PublicodeContextInterface } from "./PubliContext";

interface State {
  engine: Partial<Engine>;
  rule: string;
}

const usePublicodeHandler = ({
  engine,
  rule,
}: State): PublicodeContextInterface => {
  const [situation, setSituation] = useState<Record<string, string>>({});

  function newSituation(args: Record<string, string>): void {
    const situation: Record<string, string> = {};
    Object.keys(args).forEach((key) => {
      situation[key.replaceAll(" - ", " . ")] = args[key];
    });
    setSituation(situation);
  }

  const missingArgs = useMemo(() => {
    const result = engine?.setSituation(situation).evaluate(rule);
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
  }, [engine, rule, situation]);

  const value = useMemo(() => {
    const result = engine?.setSituation(situation).evaluate(rule);
    return result?.nodeValue ?? null;
  }, [engine, rule, situation]);

  return {
    isLoading: engine === null,
    missingArgs,
    result: value,
    setSituation: newSituation,
  };
};

export default usePublicodeHandler;
