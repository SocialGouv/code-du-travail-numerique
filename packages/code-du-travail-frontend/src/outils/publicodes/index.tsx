import Engine, { Evaluation, Rule } from "publicodes";
import React, { createContext, useContext } from "react";

import usePublicodesHandler from "./Handler";

interface MissingArgs {
  name: string;
  indice: number;
  rawNode: Rule;
}

export interface PublicodesContextInterface {
  result: Evaluation;
  missingArgs: MissingArgs[];
  setSituation: (values: Record<string, string>) => void;
}

const publicodesContext = createContext<PublicodesContextInterface>({
  missingArgs: [],
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
  const { result, missingArgs, setSituation } = usePublicodesHandler({
    engine: new Engine(rules),
    targetRule: targetRule,
  });

  return (
    <Provider value={{ missingArgs, result, setSituation }}>
      {children}
    </Provider>
  );
};
