import { Notification } from "@socialgouv/modeles-social";
import Engine, { Evaluation, Rule as PubliRule } from "publicodes";
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

export interface PublicodesContextInterface {
  getNotifications: () => Notification[];
  result: Evaluation;
  missingArgs: MissingArgs[];
  situation: SituationElement[];
  setSituation: (values: Record<string, string>) => void;
}

const publicodesContext = createContext<PublicodesContextInterface>({
  getNotifications: () => [],
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
      value={{ getNotifications, missingArgs, result, setSituation, situation }}
    >
      {children}
    </Provider>
  );
};
