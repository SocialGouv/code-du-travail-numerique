import Engine, { Evaluation, Rule } from "publicodes";
import React, { createContext, useContext } from "react";

import usePublicodesHandler from "./Handler";

interface MissingArgs {
  name: string;
  indice: number;
  rawNode: Rule;
}

export interface Argument {
  name: string;
  rawNode: Rule;
  value: string;
}

export interface PublicodesContextInterface {
  result: Evaluation;
  missingArgs: MissingArgs[];
  situation: Argument[];
  setSituation: (values: Record<string, string>) => void;
}

const publicodesContext = createContext<PublicodesContextInterface>({
  missingArgs: [],
  situation: [],
  result: null,
  setSituation: () => {
    throw Error("Not implemented");
  },
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
