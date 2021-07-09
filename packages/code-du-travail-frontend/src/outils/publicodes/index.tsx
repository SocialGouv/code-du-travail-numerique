import { Notification } from "@socialgouv/modeles-social";
import { References } from "@socialgouv/modeles-social/bin/utils/GetReferences";
import Engine, { Evaluation, Rule as PubliRule, Unit } from "publicodes";
import React, { createContext, useMemo } from "react";

import usePublicodesHandler from "./Handler";

export interface MissingArgs {
  name: string;
  indice: number;
  rawNode: Rule;
}

export enum RuleType {
  Liste = "liste",
  OuiNon = "oui-non",
}

export interface RuleListe {
  type: RuleType;
  valeurs: Record<string, string>;
}

export type RuleCdtn = RuleListe;

export interface Rule extends PubliRule {
  cdtn?: RuleCdtn;
}

export interface SituationElement {
  name: string;
  rawNode: Rule;
  value: string;
}

export interface PublicodesResult {
  value: Evaluation;
  unit?: Unit;
}

export interface PublicodesContextInterface {
  execute: (rule: string) => PublicodesResult;
  getNotifications: () => Notification[];
  getReferences: () => References[];
  result?: PublicodesResult;
  missingArgs: MissingArgs[];
  situation: SituationElement[];
  setSituation: (values: Record<string, string>) => void;
}

const PublicodesContext = createContext<PublicodesContextInterface>({
  execute: () => null,
  getNotifications: () => [],
  getReferences: () => [],
  missingArgs: [],
  result: null,
  setSituation: () => {
    throw Error("Not implemented");
  },
  situation: [],
});

export function usePublicodes(): PublicodesContextInterface {
  const context = React.useContext(PublicodesContext);
  if (context === undefined) {
    throw new Error("usePublicodes must be used within a PublicodesProvider");
  }
  return context;
}

export const PublicodesProvider: React.FC<
  { children: React.ReactNode } & {
    rules: any;
    targetRule: string;
  }
> = ({ children, rules, targetRule }) => {
  const engine = useMemo(() => {
    return new Engine(rules);
  }, [rules]);

  const {
    execute,
    getNotifications,
    getReferences,
    result,
    missingArgs,
    setSituation,
    situation,
  } = usePublicodesHandler({
    engine: engine,
    targetRule: targetRule,
  });

  return (
    <PublicodesContext.Provider
      value={{
        execute,
        getNotifications,
        getReferences,
        missingArgs,
        result,
        setSituation,
        situation,
      }}
    >
      {children}
    </PublicodesContext.Provider>
  );
};
