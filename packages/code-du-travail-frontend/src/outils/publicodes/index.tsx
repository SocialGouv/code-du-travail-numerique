import { Notification } from "@socialgouv/modeles-social";
import { References } from "@socialgouv/modeles-social/bin/utils/GetReferences";
import Engine, { Evaluation, Rule as PubliRule, Unit } from "publicodes";
import React, { createContext, useContext } from "react";

import usePublicodesHandler from "./Handler";

interface MissingArgs {
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
  getNotifications: () => Notification[];
  getReferences: () => References[];
  result?: PublicodesResult;
  missingArgs: MissingArgs[];
  situation: SituationElement[];
  setSituation: (values: Record<string, string>) => void;
}

const publicodesContext = createContext<PublicodesContextInterface>({
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
  return useContext(publicodesContext) as PublicodesContextInterface;
}

const { Provider } = publicodesContext;

export const PublicodesProvider: React.FC<
  { children: React.ReactNode } & {
    rules: any;
    targetRule: string;
  }
> = ({ children, rules, targetRule }) => {
  const {
    getNotifications,
    getReferences,
    result,
    missingArgs,
    setSituation,
    situation,
  } = usePublicodesHandler({
    engine: new Engine(rules),
    targetRule: targetRule,
  });

  return (
    <Provider
      value={{
        getNotifications,
        getReferences,
        missingArgs,
        result,
        setSituation,
        situation,
      }}
    >
      {children}
    </Provider>
  );
};
