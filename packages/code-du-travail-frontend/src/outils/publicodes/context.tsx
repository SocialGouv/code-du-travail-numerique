import { getNotifications, getReferences } from "@socialgouv/modeles-social";
import Engine from "publicodes";
import React, { Context, createContext, useMemo, useState } from "react";

import { convertDaysIntoBetterUnit, handleExecute, newSituation } from ".";
import {
  PublicodesContextType,
  PublicodesData,
  PublicodesProviderRule,
  PublicodesResult,
  PublicodesSimulator,
} from "./types";

export function PublicodesContext<
  T extends PublicodesResult
>(): Context<PublicodesContextType<T> | null> {
  return createContext<PublicodesContextType<T> | null>(null);
}

const Provider = PublicodesContext().Provider;

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
      case PublicodesSimulator.INDEMNITE_LICENCIEMENT:
        return {
          unit: result.unit,
          value: result.nodeValue,
        };
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
    setData({
      missingArgs,
      result,
      situation,
    });
  };

  return (
    <Provider
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
    </Provider>
  );
};
