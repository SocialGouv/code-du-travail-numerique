import { round } from "../../utils";
import type { SupportedCcIndemniteLicenciement } from "..";
import type { Formula, FormulaProps, IFormula } from "./types";

export class Formula1516
  implements IFormula<SupportedCcIndemniteLicenciement.IDCC1516>
{
  computeFormula({
    seniority,
    refSalary,
  }: FormulaProps<SupportedCcIndemniteLicenciement.IDCC1516>): Formula {
    let formula = "";
    const explanations = [];
    const roundedSeniority = round(seniority);
    const an = roundedSeniority < 2 ? "an" : "ans";
    if (seniority > 2) {
      if (seniority <= 15) {
        formula = `1 / 5 * Sref * A`;
        explanations.push(`A : Ancienneté totale (${roundedSeniority} ${an})`);
      } else {
        formula = `(1 / 5 * Sref * A1) + (1 / 10 * Sref * A2)`;
        const anWithout = roundedSeniority - 15 < 2 ? "an" : "ans";
        explanations.push(`A1 : Ancienneté totale (${roundedSeniority} ans)`);
        explanations.push(
          `A2: Années de présence au delà de 15 ans (${
            roundedSeniority - 15
          } ${anWithout})`
        );
      }
      explanations.push(`Sref : Salaire de référence (${refSalary} €)`);
    }
    return { explanations, formula };
  }
}
