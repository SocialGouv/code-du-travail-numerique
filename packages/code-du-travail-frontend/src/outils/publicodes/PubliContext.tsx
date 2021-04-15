import React, { createContext, useContext } from "react";
import Engine, { Evaluation } from "publicodes";
import { Rule } from "publicodes/dist/types/rule";
import usePublicodeHandler from "./PubliHandler";

export interface MissingArgs {
  name: string;
  indice: number;
  rawNode: Rule;
}

export interface PublicodeContextInterface {
  result: Evaluation;
  missingArgs: MissingArgs[];
  setSituation: (values: Record<string, string>) => void;
}

export const publicodeContext = createContext<PublicodeContextInterface>({
  result: null,
  missingArgs: [],
  setSituation: () => {},
});

export function usePublicode(): PublicodeContextInterface {
  return useContext(publicodeContext) as PublicodeContextInterface;
}

const { Provider } = publicodeContext;

interface PublicodeProvider {
  publicodes: string;
  rule: string;
}

const PublicodeProvider: React.FC<
  { children: React.ReactNode } & PublicodeProvider
> = ({ children, publicodes, rule }) => {
  console.log("")
  const { result, missingArgs, setSituation } = usePublicodeHandler({
    engine: new Engine(publicodes),
    rule: rule,
  });

  return (
    <Provider value={{ result, missingArgs, setSituation }}>
      {children}
    </Provider>
  );
};

export default PublicodeProvider;
