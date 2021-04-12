import React, { createContext, useContext, useEffect, useState } from "react";
import Engine, { Evaluation } from "publicodes";
import { Rule } from "publicodes/dist/types/rule";
import usePublicodeHandler from "./PubliHandler";

export interface MissingArgs {
  name: string;
  indice: number;
  rawNode: Rule;
}

export interface PublicodeContextInterface {
  isLoading: boolean;
  result: Evaluation;
  missingArgs: MissingArgs[];
  setSituation: (values: Record<string, string>) => void;
}

export const publicodeContext = createContext<PublicodeContextInterface>({
  isLoading: true,
  result: null,
  missingArgs: [],
  setSituation: () => {},
});

export function usePublicode(): PublicodeContextInterface {
  return useContext(publicodeContext) as PublicodeContextInterface;
}

const { Provider } = publicodeContext;

const PublicodeProvider: React.FC<
  { children: React.ReactNode } & { rule: string }
> = ({ children, rule }) => {
  const [rules, setRules] = useState<string | null>(null);

  useEffect(() => {
    const loadRules = async (): Promise<void> => {
      try {
        const rules = await fetch(
          "/api/simulateurs/preavis-retraite"
        ).then((it) => it.json());
        setRules(rules);
      } catch (err) {
        console.error(err);
      }
    };
    loadRules();
  }, []);

  return (
    <Provider
      value={usePublicodeHandler({
        engine: rules ? new Engine(rules) : null,
        rule: rule,
      })}
    >
      {children}
    </Provider>
  );
};

export default PublicodeProvider;
