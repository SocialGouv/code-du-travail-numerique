import type Engine from "publicodes";

import type { Formula } from "../plugins";

function pluralize(word: string, value: number) {
  if (word.endsWith("s") || value < 2 || word === "€") return "";
  return "s";
}

export function getFormule(engine: Engine): Formula {
  const formula = Object.values(engine.getParsedRules())
    .filter((rule: any) => {
      return (
        rule.rawNode.cdtn?.formule &&
        engine.evaluate(rule.dottedName).nodeValue !== false
      );
    })
    .reduce(
      (formule: any, rule: any): Formula => {
        formule.explanations = formule.explanations.concat(
          rule.rawNode.cdtn.formule.explanations
        );
        formule.formula += rule.rawNode.cdtn.formule.formula;
        return formule as Formula;
      },
      {
        explanations: [],
        formula: "",
      }
    );
  formula.explanations = formula.explanations.flatMap((explanation: any) => {
    return Object.keys(explanation).map((text) => {
      const result = engine.evaluate(explanation[text]);
      const unit = result.unit.numerators[0];
      return `${text} (${result.nodeValue} ${unit}${pluralize(
        unit,
        result.nodeValue
      )})`;
    });
  });
  return formula;
}
