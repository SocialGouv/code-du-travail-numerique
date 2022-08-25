import { round } from "../../utils";
import type { SupportedCcIndemniteLicenciement } from "..";
import type { Formula, FormulaProps, IFormula } from "./types";

export class Formula2941
  implements IFormula<SupportedCcIndemniteLicenciement.IDCC2941>
{
  computeFormula({
    seniority,
    refSalary,
  }: FormulaProps<SupportedCcIndemniteLicenciement.IDCC2941>): Formula {
    let formula = "";
    const explanations = [];
    const year = round(seniority) < 2 ? "an" : "ans";
    if (seniority >= 1) {
      if (seniority <= 10) {
        formula = `1 / 5 * Sref * A`;
        explanations.push(
          `A : Ancienneté totale (${round(seniority)} ${year})`
        );
      } else {
        formula = `(1 / 5 * Sref * A1 + 2 / 15 * Sref * A2)`;
        explanations.push(`A1 : Ancienneté de 10 ans ou moins (10 ans)`);
        const yearAfterDiff = round(seniority - 10) < 2 ? "an" : "ans";
        explanations.push(
          `A2 : Ancienneté au delà de 10 ans (${round(
            seniority - 10
          )} ${yearAfterDiff})`
        );
      }
      explanations.push(`Sref : Salaire de référence (${round(refSalary)} €)`);
    }
    return { explanations, formula };
  }
}
