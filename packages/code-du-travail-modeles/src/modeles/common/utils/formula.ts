import type Engine from "publicodes";

import type { Formula } from "..";

function pluralize(word: string, value: number): string {
  if (word.endsWith("s") || value < 2 || word === "€") return "";
  return "s";
}

function round(num: number): number {
  return Math.round(num * 100) / 100;
}

function getRulesWithFormuleAndNodeValue(engine: Engine) {
  return Object.values(engine.getParsedRules()).filter((rule: any) => {
    return (
      rule.rawNode.cdtn?.formule &&
      engine.evaluate(rule.dottedName).nodeValue !== false
    );
  });
}

const FORMULE_VAR_REGEX = /\$formule/g;

export function getFormule(engine: Engine): Formula {
  let rules = getRulesWithFormuleAndNodeValue(engine);

  if (
    rules.find((rule) => rule.dottedName.includes("résultat conventionnel"))
  ) {
    rules = rules.filter((rule) => !rule.dottedName.includes("résultat légal"));
  }

  const formula = rules.reduce(
    (formule: any, rule: any): Formula => {
      formule.explanations = formule.explanations.concat(
        rule.rawNode.cdtn.formule.explanations || []
      );

      const nodeFormule = rule.rawNode.cdtn.formule.formula;
      if (nodeFormule.includes("$formule")) {
        if (formule.formula.length) {
          formule.formula = nodeFormule.replace(
            FORMULE_VAR_REGEX,
            formule.formula
          );
        }
      } else {
        formule.formula += nodeFormule;
      }
      return formule as Formula;
    },
    {
      explanations: [],
      formula: "",
    }
  );
  formula.explanations = formula.explanations.flatMap((explanation: any) => {
    return Object.keys(explanation).map((text) => {
      const element = explanation[text];
      if (element === "NONE") return text;

      const result = engine.evaluate(element);
      const unit = result.unit.numerators[0];
      return `${text} (${round(result.nodeValue)} ${unit}${pluralize(
        unit as string,
        result.nodeValue as number
      )})`;
    });
  });
  return formula;
}
