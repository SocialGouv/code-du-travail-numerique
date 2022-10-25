import { round } from "../../utils";
import type { SupportedCcIndemniteLicenciement } from "..";
import type { Formula, FormulaProps, IFormula } from "./types";

export type Formula2264Props = {
  category: "Cadres" | "Non-cadres";
  seniority: number;
  refSalary: number;
  seniorityNonCadre?: number;
};

export class Formula2264
  implements IFormula<SupportedCcIndemniteLicenciement.IDCC2264>
{
  computeFormula({
    seniority,
    refSalary,
    category,
    seniorityNonCadre,
  }: FormulaProps<SupportedCcIndemniteLicenciement.IDCC2264>): Formula {
    let formula = "";
    const explanations = [];
    const year = round(seniority) < 2 ? "an" : "ans";

    if (category === "Non-cadres" && seniority >= 1) {
      if (seniority <= 10) {
        formula = `1/5 * Sref * A`;
        explanations.push(
          `A : Ancienneté totale (${round(seniority)} ${year})`
        );
      } else {
        formula = `(1/5 * Sref * A1) + (2/5 * Sref * A2)`;
        explanations.push(
          `A1 : Années d'ancienneté de 10 ans ou moins (10 ans)`
        );
        const yearAfterDiff = round(seniority - 10) < 2 ? "an" : "ans";
        explanations.push(
          `A2 : Ancienneté au delà de 10 ans (${round(
            seniority - 10
          )} ${yearAfterDiff})`
        );
      }
      explanations.push(`Sref : Salaire de référence (${round(refSalary)} €)`);
    } else if (category === "Cadres" && !seniorityNonCadre) {
      if (seniority >= 1 && seniority < 5) {
        formula = `1/5 * Sref * A`;
        explanations.push(
          `A : Années d'ancienneté dans la fonction de cadre (${round(
            seniority
          )} ${year})`
        );
        explanations.push(
          `Sref : Salaire de référence (${round(refSalary)} €)`
        );
      } else if (seniority >= 5) {
        formula = `(1/2 * Sref * A1)+ (1 * Sref * A2)`;
        explanations.push(
          `A1 : Années d'ancienneté dans la fonction de cadre jusqu'à 5 ans (5 ans)`
        );
        const yearAfterDiff = round(seniority - 5) < 2 ? "an" : "ans";
        explanations.push(
          `A2 : Années d'ancienneté dans la fonction de cadre supérieures à 5 ans (${round(
            seniority - 5
          )} ${yearAfterDiff})`
        );
        explanations.push(
          `Sref : Salaire de référence (${round(refSalary)} €)`
        );
      }
    } else if (category === "Cadres" && seniorityNonCadre) {
      const anNonCadre = round(seniorityNonCadre) < 2 ? "an" : "ans";
      if (seniorityNonCadre <= 10) {
        formula = `(1/5 * Sref * A1)`;
        explanations.push(
          `A1 : Ancienneté totale en tant que non-cadres (${round(
            seniorityNonCadre
          )} ${anNonCadre})`
        );
      } else {
        formula = `(1/5 * Sref * A1) + (2/5 * Sref * A2)`;
        explanations.push(
          `A1 : Années d'ancienneté de 10 ans ou moins (10 ans)`
        );
        const yearAfterDiffNonCadre =
          round(seniorityNonCadre - 10) < 2 ? "an" : "ans";
        explanations.push(
          `A2 : Ancienneté au delà de 10 ans (${round(
            seniorityNonCadre - 10
          )} ${yearAfterDiffNonCadre})`
        );
      }

      const seniorityRemain = round(seniority - seniorityNonCadre);
      if (seniorityRemain >= 1 && seniorityRemain < 5) {
        formula += ` + (1/5 * Sref * A3)`;
        explanations.push(
          `A3 : Années d'ancienneté dans la fonction de cadre (${round(
            seniorityRemain
          )} ${year})`
        );
      }
      if (seniorityRemain >= 5) {
        formula += ` + (1/2 * Sref * A3) + (1 * Sref * A4)`;
        explanations.push(
          `A3 : Années d'ancienneté dans la fonction de cadre jusqu'à 5 ans (5 ans)`
        );
        const yearAfterDiff = round(seniorityRemain - 5) < 2 ? "an" : "ans";
        explanations.push(
          `A4 : Années d'ancienneté dans la fonction de cadre supérieures à 5 ans (${round(
            seniorityRemain - 5
          )} ${yearAfterDiff})`
        );
      }
      explanations.push(`Sref : Salaire de référence (${round(refSalary)} €)`);
    }
    return { explanations, formula };
  }
}
