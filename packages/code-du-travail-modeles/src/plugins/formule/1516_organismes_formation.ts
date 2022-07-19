import type { SupportedCcIndemniteLicenciement } from "..";
import type { Formula, FormulaProps, IFormula } from "./types";

export class Formula1516
  implements IFormula<SupportedCcIndemniteLicenciement.IDCC1516>
{
  computeFormula({
    seniority,
  }: FormulaProps<SupportedCcIndemniteLicenciement.IDCC1516>): Formula {
    let formula = "";
    const explanations = [];
    if (seniority > 2) {
      if (seniority <= 15) {
        formula = `1 / 5 * Sref * A`;
        explanations.push("A : Ancienneté totale");
      } else {
        formula = `(1 / 5 * Sref * A1) + (1 / 10 * Sref * A2)`;
        explanations.push("A1 : Ancienneté totale");
        explanations.push("A2: Années de présence au delà de 15 ans");
      }
    }
    return { explanations, formula };
  }
}
