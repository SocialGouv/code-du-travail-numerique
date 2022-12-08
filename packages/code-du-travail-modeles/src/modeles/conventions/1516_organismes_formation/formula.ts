import type {
  Formula,
  FormulaProps,
  IFormula,
  SupportedCcIndemniteLicenciement,
} from "../../common";
import { round } from "../../common";

export class Formula1516
  implements IFormula<SupportedCcIndemniteLicenciement.IDCC1516> {
  computeFormula({
    seniority,
    refSalary,
  }: FormulaProps<SupportedCcIndemniteLicenciement.IDCC1516>): Formula {
    let formula = "";
    const explanations = [];
    const year = round(seniority) < 2 ? "an" : "ans";
    if (seniority > 2) {
      if (seniority <= 15) {
        formula = `1 / 5 * Sref * A`;
        explanations.push(
          `A : Ancienneté totale (${round(seniority)} ${year})`
        );
      } else {
        formula = `(1 / 5 * Sref * A1) + (1 / 10 * Sref * A2)`;
        const anWithout = round(seniority - 15) < 2 ? "an" : "ans";
        explanations.push(`A1 : Ancienneté totale (${round(seniority)} ans)`);
        explanations.push(
          `A2 : Années de présence au delà de 15 ans (${round(
            seniority - 15
          )} ${anWithout})`
        );
      }
      explanations.push(`Sref : Salaire de référence (${round(refSalary)} €)`);
    }
    return { explanations, formula };
  }
}
