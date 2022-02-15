import { getNotifications, getReferences } from "@socialgouv/modeles-social";
import Engine from "publicodes";
import React, { createContext, useMemo } from "react";

import { handleExecutePreavisRetraite } from "../helpers";
import {
  PublicodesContext as PublicodesContextType,
  PublicodesProviderRule,
  PublicodesSupportedSimulator,
} from "../types";

export const PublicodesContext = createContext<PublicodesContextType | null>(
  null
);

export const PublicodesProvider = ({
  children,
  rules,
  targetRule,
}: PublicodesProviderRule) => {
  const engine = useMemo(() => {
    return new Engine(rules);
  }, [rules]);

  return (
    <PublicodesContext.Provider
      value={{
        execute:
          s === PublicodesSupportedSimulator
            ? handleExecutePreavisRetraite()
            : null,
        getNotifications: () => getNotifications(engine),
        getReferences: () => getReferences(engine),
        missingArgs: null,
        result: null,
        setSituation: null,
        situation: Array.from(data.situation.values()),
      }}
    >
      {children}
    </PublicodesContext.Provider>
  );
};
