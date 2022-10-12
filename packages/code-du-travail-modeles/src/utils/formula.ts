import type Engine from "publicodes";

import type { Formula } from "../plugins";

export function getFormule(engine: Engine): Formula {
  const formula = Object.values(engine.getParsedRules())
    .filter((rule: any) => {
      return (
        rule.rawNode.cdtn?.formule &&
        engine.evaluate(rule.dottedName).nodeValue !== false
      );
    })
    .reduce(
      (formule: any, rule: any) => {
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
  formula.explanations = formula.explanations.flatMap((explanation: any) => {
    return Object.keys(explanation).map(
      (text) => `${text} (${engine.evaluate(explanation[text]).nodeValue})`
    );
  });
  return formula;
}
