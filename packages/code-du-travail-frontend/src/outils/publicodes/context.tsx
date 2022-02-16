import { getNotifications, getReferences } from "@socialgouv/modeles-social";
import Engine from "publicodes";
import React, { createContext, useMemo, useState } from "react";

import { convertDaysIntoBetterUnit, handleExecute, newSituation } from ".";
import {
  PublicodesContextType,
  PublicodesData,
  PublicodesProviderRule,
  PublicodesResult,
  PublicodesSupportedSimulator,
} from "./types";

export const PublicodesContext = createContext<PublicodesContextType | null>(
  null
);

export const PublicodesProvider = ({
  children,
  rules,
  targetRule,
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
      case PublicodesSupportedSimulator.IndemniteLicenciement:
        return {
          type: PublicodesSupportedSimulator.IndemniteLicenciement,
          unit: result.unit,
          value: result.nodeValue,
        };
      case PublicodesSupportedSimulator.PreavisRetraite:
        return convertDaysIntoBetterUnit(result.nodeValue as unknown as string);
      default:
        throw new Error(`Unsupported simulator: ${simulator}`);
    }
  };

  const setSituation = (args: Record<string, any>) => {
    const { missingArgs, result, situation } = newSituation(
      engine,
      data.situation,
      targetRule,
      args
    );
    setData({
      missingArgs,
      result,
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
