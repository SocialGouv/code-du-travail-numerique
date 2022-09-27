import { round } from "../../utils";
import type { SupportedCcIndemniteLicenciement } from "..";
import type { Formula, FormulaProps, IFormula } from "./types";

export type Formula650Props = {
  age: number;
  seniority: number;
  refSalary: number;
};

export class Formula650
  implements IFormula<SupportedCcIndemniteLicenciement.IDCC650>
{
  computeFormula({
    seniority,
    refSalary,
    age,
  }: FormulaProps<SupportedCcIndemniteLicenciement.IDCC650>): Formula {
    let formula = "";
    const explanations = [];
    if (seniority >= 1) {
      const year = round(seniority) < 2 ? "an" : "ans";
      if (seniority <= 7) {
        formula = `1 / 5 * Sref * A`;
        explanations.push(
          `A : Ancienneté totale (${round(seniority)} ${year})`
        );
      } else {
        formula = `(1 / 5 * Sref * A1) + (3 / 5 * Sref * A2)`;
        explanations.push(`A1 : Ancienneté de 1 ans à 7 ans (7 ans)`);
        const yearAfterDiff = round(seniority - 7) < 2 ? "an" : "ans";
        explanations.push(
          `A2 : Ancienneté au delà de 7 ans (${round(
            seniority - 7
          )} ${yearAfterDiff})`
        );
      }
      explanations.push(`Sref : Salaire de référence (${round(refSalary)} €)`);
      if (age >= 50 && age < 55 && seniority >= 5) {
        formula = formula.replace(/^/, "[").replace(/$/, "]");
        formula += ` * 1.2`;
      } else if (age >= 55 && age < 60 && seniority >= 5) {
        formula = formula.replace(/^/, "[").replace(/$/, "]");
        formula += ` * 1.3`;
      } else if (age === 61) {
        formula = formula.replace(/^/, "[").replace(/$/, "]");
        formula += ` * 0.95`;
      } else if (age === 62) {
        formula = formula.replace(/^/, "[").replace(/$/, "]");
        formula += ` * 0.9`;
      } else if (age === 63) {
        formula = formula.replace(/^/, "[").replace(/$/, "]");
        formula += ` * 0.8`;
      } else if (age === 64) {
        formula = formula.replace(/^/, "[").replace(/$/, "]");
        formula += ` * 0.6`;
      }
    }
    return { explanations, formula };
  }
}
