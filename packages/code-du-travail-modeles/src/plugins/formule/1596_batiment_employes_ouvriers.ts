import { round } from "../../utils";
import type { SupportedCcIndemniteLicenciement } from "..";
import type { Formula, FormulaProps, IFormula } from "./types";

export type Formula1596Props = {
  hasMoreThan55Years: boolean;
  seniority: number;
  refSalary: number;
};

export class Formula1596
  implements IFormula<SupportedCcIndemniteLicenciement.IDCC1596>
{
  computeFormula({
    seniority,
    refSalary,
    hasMoreThan55Years,
  }: FormulaProps<SupportedCcIndemniteLicenciement.IDCC1596>): Formula {
    let formula = "";
    const explanations = [];
    const year = round(seniority) < 2 ? "an" : "ans";
    if (!hasMoreThan55Years && seniority >= 2 && seniority <= 5) {
      formula = `1/10 * Sref * A`;
      explanations.push(`A : Ancienneté totale (${round(seniority)} ${year})`);
      explanations.push(`Sref : Salaire de référence (${round(refSalary)} €)`);
    } else if (!hasMoreThan55Years && seniority > 5) {
      if (seniority <= 15) {
        formula = `3/20 * Sref * A`;
        explanations.push(
          `A : Ancienneté totale (${round(seniority)} ${year})`
        );
      } else {
        formula = `(3/20 * Sref * A1) + (1/20 * Sref * A2)`;
        explanations.push(
          `A1 : Ancienneté totale (${round(seniority)} ${year})`
        );
        const yearAfterDiff = round(seniority - 15) < 2 ? "an" : "ans";
        explanations.push(
          `A2 : Ancienneté au delà de 15 ans (${round(
            seniority - 15
          )} ${yearAfterDiff})`
        );
      }
      explanations.push(`Sref : Salaire de référence (${round(refSalary)} €)`);
    } else if (hasMoreThan55Years && seniority >= 2 && seniority <= 5) {
      formula = `(1/10 * Sref * A) + (1/100 * Sref * A)`;
      explanations.push(`A : Ancienneté totale (${round(seniority)} ${year})`);
      explanations.push(`Sref : Salaire de référence (${round(refSalary)} €)`);
    } else if (hasMoreThan55Years && seniority > 5) {
      if (seniority <= 15) {
        formula = `(3/20 * Sref * A) + (3/200 * Sref * A)`;
        explanations.push(
          `A : Ancienneté totale (${round(seniority)} ${year})`
        );
      } else {
        formula = `(3/20 * Sref * A1) + (1/20 * Sref * A2) + (3/200 * Sref * A1) + (1/200 * Sref * A2)`;
        explanations.push(
          `A1 : Ancienneté totale (${round(seniority)} ${year})`
        );
        const yearAfterDiff = round(seniority - 15) < 2 ? "an" : "ans";
        explanations.push(
          `A2 : Ancienneté au delà de 15 ans (${round(
            seniority - 15
          )} ${yearAfterDiff})`
        );
      }
      explanations.push(`Sref : Salaire de référence (${round(refSalary)} €)`);
    }
    return { explanations, formula };
  }
}
