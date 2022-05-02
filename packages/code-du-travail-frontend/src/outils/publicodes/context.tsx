import { getNotifications, getReferences } from "@socialgouv/modeles-social";
import Engine from "publicodes";
import React, { createContext, useMemo, useState } from "react";

import {
  handleExecute,
  PublicodesIndemniteLicenciementResult,
  updateSituation,
} from ".";
import {
  PublicodesContextType,
  PublicodesData,
  PublicodesProviderRule,
} from "./types";

export const PublicodesContext = createContext<PublicodesContextType | null>(
  null
);

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
    result: {} as PublicodesIndemniteLicenciementResult,
    situation: [],
  });

  const execute = (rule: string): PublicodesIndemniteLicenciementResult => {
    const result = handleExecute(engine, data.situation, rule);
    return {
      unit: result.unit,
      value: result.nodeValue,
    };
  };

  const setSituation = (args: Record<string, any>) => {
    const { missingArgs, result, situation } = updateSituation(
      engine,
      data.situation,
      simulator,
      args
    );
    setData({
      missingArgs,
      result: {
        unit: result.unit,
        value: result.nodeValue,
      },
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
