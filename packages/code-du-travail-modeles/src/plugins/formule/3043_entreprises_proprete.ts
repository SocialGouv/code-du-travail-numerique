import { round } from "../../utils";
import type { SupportedCcIndemniteLicenciement } from "..";
import type { Formula, FormulaProps, IFormula } from "./types";

export class Formula3043
  implements IFormula<SupportedCcIndemniteLicenciement.IDCC3043>
{
  computeFormula({
    seniority,
    refSalary,
  }: FormulaProps<SupportedCcIndemniteLicenciement.IDCC3043>): Formula {
    let formula = "";
    const explanations = [];
    const year = round(seniority) < 2 ? "an" : "ans";
    if (seniority > 2) {
      if (seniority < 6) {
        formula = `1 / 10 * Sref * A`;
        explanations.push(
          `A : Ancienneté totale (${round(seniority)} ${year})`
        );
      } else if (seniority <= 10) {
        formula = `(1 / 10 * Sref * A1) + (1 / 6 * Sref * A2)`;
        const yearAfterDiff = round(seniority - 5) < 2 ? "an" : "ans";
        explanations.push(
          `A1: Années d'ancienneté pour la fraction des 5 premières années (5 ans)`
        );
        explanations.push(
          `A2 : Années d'ancienneté pour la fraction de 6 ans à 10 ans révolus (${round(
            seniority - 5
          )} ${yearAfterDiff})`
        );
      } else {
        formula = `(1 / 10 * Sref * A1) + (1 / 6 * Sref * A2) + (1 / 5 * Sref * A3)`;
        const yearAfterDiff = round(seniority - 10) < 2 ? "an" : "ans";
        explanations.push(
          `A1: Années d'ancienneté pour la fraction des 5 premières années (5 ans)`
        );
        explanations.push(
          `A2 : Années d'ancienneté pour la fraction de 6 ans à 10 ans révolus (5 ans)`
        );
        explanations.push(
          `A3 : Années d'ancienneté au-delà de 10 ans révolus (${round(
            seniority - 10
          )} ${yearAfterDiff})`
        );
      }
      explanations.push(`Sref : Salaire de référence (${round(refSalary)} €)`);
    }
    return { explanations, formula };
  }
}
