import type Engine from "publicodes";
import type { RuleNode } from "publicodes";

import type { Formula } from "../types";

export type NodeFormula = {
  formula: string;
  explanations?: Record<string, string>[];
  annotations?: string[];
};

type RuleNodeOptionalFormula = RuleNode & {
  rawNode: { cdtn?: { formule?: NodeFormula } };
};

type RuleNodeFormula = RuleNode & {
  rawNode: { cdtn: { formule: NodeFormula } };
};

function pluralize(word: string, value: number): string {
  if (word.endsWith("s") || value < 2 || word === "€") return "";
  return "s";
}

function round(num: number): number {
  return Math.round(num * 100) / 100;
}

function getRulesWithFormuleAndNodeValue(engine: Engine): RuleNodeFormula[] {
  return Object.values(engine.getParsedRules()).filter(
    (rule: RuleNodeOptionalFormula) => {
      if (rule.rawNode.cdtn?.formule === undefined) return false;

      const value = engine.evaluate(rule.dottedName).nodeValue;
      return value !== false && value !== null && value !== undefined;
    }
  ) as RuleNodeFormula[];
}

const FORMULE_VAR_REGEX = /\$formule/g;

export function getFormule(engine: Engine): Formula {
  const rules = getRulesWithFormuleAndNodeValue(engine);
  const formula = rules.reduce(
    (
      formule: Required<NodeFormula>,
      rule: RuleNodeFormula
    ): Required<NodeFormula> => {
      const nodeFormule = rule.rawNode.cdtn.formule.formula;
      if (nodeFormule.includes("$formule")) {
        if (formule.formula.length) {
          formule.formula = nodeFormule.replace(
            FORMULE_VAR_REGEX,
            formule.formula
          );
        }
        formule.explanations = formule.explanations.concat(
          rule.rawNode.cdtn.formule.explanations ?? []
        );
        formule.annotations = formule.annotations.concat(
          rule.rawNode.cdtn.formule.annotations ?? []
        );
      } else {
        formule.formula = nodeFormule;
        formule.explanations = rule.rawNode.cdtn.formule.explanations ?? [];
        formule.annotations = rule.rawNode.cdtn.formule.annotations ?? [];
      }
      return formule;
    },
    {
      annotations: [],
      explanations: [],
      formula: "",
    }
  );

  const explanations = formula.explanations
    .flatMap((explanation) => {
      return Object.keys(explanation).map((text) => {
        const element = explanation[text];
        const result = engine.evaluate(element);
        if (!result.unit) {
          throw Error(
            `L'unité est manquante pour la règle '${
              (result as any).dottedName
            }'`
          );
        }
        const unit = result.unit.numerators[0];
        return `${text} (${round(Number(result.nodeValue))} ${unit}${pluralize(
          unit,
          result.nodeValue as number
        )})`;
      });
    })
    .sort((a, b) => a.localeCompare(b));

  return {
    annotations: formula.annotations,
    explanations,
    formula: formula.formula,
  };
}
