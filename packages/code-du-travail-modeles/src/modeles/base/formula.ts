import { round } from "../../utils";
import type {
  Formula,
  FormulaProps,
  IFormula,
  SupportedCcIndemniteLicenciement,
} from "../common";

export type LegalFormulaProps = {
  seniority: number;
  refSalary: number;
  isForInaptitude: boolean;
};

export class FormulaLegal
  implements IFormula<SupportedCcIndemniteLicenciement.legal>
{
  computeFormula({
    seniority,
    refSalary,
    isForInaptitude,
  }: FormulaProps<SupportedCcIndemniteLicenciement.legal>): Formula {
    let formula = "";
    const explanations = [];
    const year = round(seniority) < 2 ? "an" : "ans";
    if (seniority >= 8 / 12) {
      if (seniority <= 10) {
        formula = `1 / 4 * Sref * A`;
        explanations.push(
          `A : Ancienneté totale (${round(seniority)} ${year})`
        );
      } else {
        formula = `(1 / 4 * Sref * A1 + 1 / 3 * Sref * A2)`;
        explanations.push(`A1 : Ancienneté de 10 ans ou moins (10 ans)`);
        const yearAfterDiff = round(seniority - 10) < 2 ? "an" : "ans";
        explanations.push(
          `A2 : Ancienneté au delà de 10 ans (${round(
            seniority - 10
          )} ${yearAfterDiff})`
        );
      }
      explanations.push(`Sref : Salaire de référence (${round(refSalary)} €)`);
      if (isForInaptitude) {
        formula += " * 2";
      }
    }
    return { explanations, formula };
  }
}
