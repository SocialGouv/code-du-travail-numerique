import type { SupportedCcIndemniteLicenciement } from "..";
import type { Formula, FormulaProps, IFormula } from "./types";

export type LegalFormulaProps = {
  seniority: number;
  isForInaptitude: boolean;
};

export class FormulaLegal
  implements IFormula<SupportedCcIndemniteLicenciement.default>
{
  computeFormula({
    seniority,
    isForInaptitude,
  }: FormulaProps<SupportedCcIndemniteLicenciement.default>): Formula {
    let formula = "";
    const explanations = [];
    if (seniority >= 8 / 12) {
      if (seniority <= 10) {
        formula = `1 / 4 * Sref * A`;
        explanations.push("A : Ancienneté totale");
      } else {
        formula = `(1 / 4 * Sref * 10 + 1 / 3 * Sref * A)`;
        explanations.push("A : Ancienneté au delà de 10 ans");
      }
      if (isForInaptitude) {
        formula += " * 2";
      }
    }
    return { explanations, formula };
  }
}
