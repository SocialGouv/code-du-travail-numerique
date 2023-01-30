import type Engine, { RuleNode } from "publicodes";

import { nonNullable } from "./array";

export type Formula = {
  formula: string;
  explanations: string[];
  annotations?: string[];
};

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

export const roundValueAndAddMessage = (
  value: number,
  unit: string
): string => {
  const unitWithPlurial = `${unit}${pluralize(unit, value)}`;
  const roundedValue = round(value);
  const isRounded = roundedValue !== value;
  return isRounded
    ? `≈ ${roundedValue} ${unitWithPlurial} : valeur arrondie`
    : `${roundedValue} ${unitWithPlurial}`;
};

function getRulesWithFormuleAndNodeValue(engine: Engine): RuleNodeFormula[] {
  return Object.values(engine.getParsedRules()).filter(
    (rule: RuleNodeOptionalFormula) => {
      if (rule.rawNode.cdtn?.formule === undefined) return false;

      const value = engine.evaluate(rule.dottedName).nodeValue;
      return value !== false && value !== null && value !== undefined;
    }
  );
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
        const nodeValue = Number(result.nodeValue);
        if (nodeValue && nodeValue !== 0) {
          const unit: string = result.unit.numerators[0];
          return `${text} (${roundValueAndAddMessage(nodeValue, unit)})`;
        } else {
          formula.formula = removePartFromFormula(formula.formula, text);
        }
      });
    })
    .filter(nonNullable)
    .sort((a, b) => a.localeCompare(b));

  return {
    annotations: formula.annotations,
    explanations,
    formula: cleanFormula(formula.formula),
  };
}

const ANY_CHARS_BUT_BRACKET = "[^[]*";
export const removePartFromFormula = (
  formule: string,
  explanation: string
): string => {
  if (formule.includes("[") && formule.includes("]")) {
    const formulaKey = explanation.split(":")[0].replace(" ", "");
    return formule.replace(
      new RegExp(
        `\\[${ANY_CHARS_BUT_BRACKET}${formulaKey}${ANY_CHARS_BUT_BRACKET}?\\]`,
        "g"
      ),
      ""
    );
  }
  return formule;
};

export const cleanFormula = (formule: string): string => {
  // remove all the [ ] from the formula
  const formulaWithoutCrochet = formule.replace(/\[|\]/g, "");
  // remove space and + at the beginning of the formula
  const withoutSpaceAndPlus = formulaWithoutCrochet.replace(/^(\s|\+)+/, "");
  // detect if there is a + in the formula
  const hasPlus = withoutSpaceAndPlus.includes("+");
  // detect if there is (( and )) in the formula
  const hasDuplicateParenthesisStart = withoutSpaceAndPlus.includes("((");
  const hasDuplicateParenthesisEnd = withoutSpaceAndPlus.includes("))");
  // remove duplicate (( and ))
  const withoutDuplicateParenthesis = withoutSpaceAndPlus
    .replace(/\(\(/g, "(")
    .replace(/\)\)/g, ")");
  return !hasPlus && hasDuplicateParenthesisStart && hasDuplicateParenthesisEnd
    ? withoutDuplicateParenthesis
    : withoutSpaceAndPlus;
};
