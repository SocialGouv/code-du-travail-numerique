import type {
  Formula,
  FormulaProps,
  IFormula,
  SupportedCcIndemniteLicenciement,
} from "../../common";
import { round } from "../../common";

export class Formula1979
  implements IFormula<SupportedCcIndemniteLicenciement.IDCC1979>
{
  computeFormula({
    seniority,
    refSalary,
  }: FormulaProps<SupportedCcIndemniteLicenciement.IDCC1979>): Formula {
    let formula = "";
    const explanations = [];
    const year = round(seniority) < 2 ? "an" : "ans";
    if (seniority >= 2) {
      if (seniority <= 10) {
        formula = `1 / 10 * Sref * A`;
        explanations.push(
          `A : Ancienneté totale (${round(seniority)} ${year})`
        );
      } else {
        formula = `1 / 10 * Sref * A1 + 1 / 15 * Sref * A2`;
        const yearAfterDiff = round(seniority - 10) < 2 ? "an" : "ans";
        explanations.push(`A1 : Ancienneté totale (${round(seniority)} ans)`);
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
