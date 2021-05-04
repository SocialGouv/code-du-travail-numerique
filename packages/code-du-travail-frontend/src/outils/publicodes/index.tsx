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
}

export interface RuleListe {
  type: RuleType.Liste;
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
  result: Evaluation;
  missingArgs: MissingArgs[];
  situation: SituationElement[];
  setSituation: (values: Record<string, string>) => void;
}

const publicodesContext = createContext<PublicodesContextInterface>({
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
  const { result, missingArgs, setSituation, situation } = usePublicodesHandler(
    {
      engine: new Engine(rules),
      targetRule: targetRule,
    }
  );

  return (
    <Provider value={{ missingArgs, result, setSituation, situation }}>
      {children}
    </Provider>
  );
};
