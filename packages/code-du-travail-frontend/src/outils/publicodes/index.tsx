import React, { createContext, useContext } from "react";
import Engine, { Evaluation } from "publicodes";
import { Rule } from "publicodes/dist/types/rule";
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
  result: null,
  missingArgs: [],
  setSituation: () => {},
});

export function usePublicodes(): PublicodesContextInterface {
  return useContext(publicodesContext) as PublicodesContextInterface;
}

const { Provider } = publicodesContext;

export const PublicodesProvider: React.FC<
  { children: React.ReactNode } & {
    rules: string;
    targetRule: string;
  }
> = ({ children, rules, targetRule }) => {
  const { result, missingArgs, setSituation } = usePublicodesHandler({
    engine: new Engine(rules),
    targetRule: targetRule,
  });

  return (
    <Provider value={{ result, missingArgs, setSituation }}>
      {children}
    </Provider>
  );
};
