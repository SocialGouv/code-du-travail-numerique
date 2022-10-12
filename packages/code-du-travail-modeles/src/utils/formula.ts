import type Engine from "publicodes";

import type { Formula } from "../plugins";

export function getFormule(engine: Engine): Formula {
  return Object.values(engine.getParsedRules())
    .filter((rule: any) => {
      return (
        rule.rawNode.cdtn?.formule &&
        engine.evaluate(rule.dottedName).nodeValue !== false
      );
    })
    .reduce(
      (formule: Formula, rule: any) => {
        formule.explanations = formule.explanations.concat(
          rule.rawNode.cdtn.formule.explanations
        );
        formule.formula += rule.rawNode.cdtn.formule.formula;
        return formule;
      },
      {
        explanations: [],
        formula: "",
      }
    );
}
