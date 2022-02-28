import { getNotifications, getReferences } from "@socialgouv/modeles-social";
import Engine from "publicodes";
import React, { createContext, useMemo, useState } from "react";

import { convertDaysIntoBetterUnit, handleExecute, newSituation } from ".";
import {
  PublicodesContextType,
  PublicodesData,
  PublicodesProviderRule,
  PublicodesResult,
  PublicodesSimulator,
} from "./types";

export const PublicodesContext =
  createContext<PublicodesContextType<PublicodesResult> | null>(null);

export const PublicodesProvider = ({
  children,
  rules,
  simulator,
}: PublicodesProviderRule): JSX.Element => {
  const engine = useMemo(() => {
    return new Engine(rules);
  }, [rules]);

  const [data, setData] = useState<PublicodesData>({
    missingArgs: [],
    result: {} as PublicodesResult,
    situation: [],
  });

  const execute = (rule: string): PublicodesResult => {
    const result = handleExecute(engine, data.situation, rule);
    switch (simulator) {
      case PublicodesSimulator.PREAVIS_RETRAITE:
        return convertDaysIntoBetterUnit(result.nodeValue as unknown as string);
      default:
        throw new Error(`Unsupported simulator: ${simulator}`);
    }
  };

  const setSituation = (args: Record<string, any>) => {
    const { missingArgs, result, situation } = newSituation(
      engine,
      data.situation,
      simulator,
      args
    );
    let treatedResult;
    switch (simulator) {
      case PublicodesSimulator.PREAVIS_RETRAITE:
        treatedResult = convertDaysIntoBetterUnit(
          result.nodeValue as unknown as string
        );
        break;
    }
    setData({
      missingArgs,
      result: treatedResult,
      situation,
    });
  };

  return (
    <PublicodesContext.Provider
      value={{
        execute,
        getNotifications: () => getNotifications(engine),
        getReferences: () => getReferences(engine),
        missingArgs: data.missingArgs,
        result: data.result,
        setSituation,
        situation: Array.from(data.situation.values()),
      }}
    >
      {children}
    </PublicodesContext.Provider>
  );
};
