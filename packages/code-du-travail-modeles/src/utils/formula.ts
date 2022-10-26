import type Engine from "publicodes";

import type { Formula } from "../plugins";

function pluralize(word: string, value: number) {
  if (word.endsWith("s") || value < 2 || word === "€") return "";
  return "s";
}

export function getFormule(engine: Engine): Formula {
  let rules = Object.values(engine.getParsedRules()).filter((rule: any) => {
    return (
      rule.rawNode.cdtn?.formule &&
      engine.evaluate(rule.dottedName).nodeValue !== false
    );
  });
  const formule = {
    explanations: [] as string[],
    formula: "",
  };
  if (!rules.length) return formule;

  if (rules.length > 1) {
    rules = rules.filter((rule: any) =>
      rule.dottedName.includes("résultat conventionnel")
    );
  }

  const rawNode: any = rules[0].rawNode;
  formule.formula = rawNode.cdtn.formule.formula;
  formule.explanations = rawNode.cdtn.formule.explanations;

  formule.explanations = formule.explanations.flatMap((explanation: any) => {
    return Object.keys(explanation).map((text) => {
      const result = engine.evaluate(explanation[text]);
      const unit = result.unit.numerators[0];
      return `${text} (${result.nodeValue} ${unit}${pluralize(
        unit,
        result.nodeValue
      )})`;
    });
  });
  return formule;
}
