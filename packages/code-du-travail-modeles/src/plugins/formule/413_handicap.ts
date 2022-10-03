import { round } from "../../utils";
import type { SupportedCcIndemniteLicenciement } from "..";
import type { Formula, FormulaProps, IFormula } from "./types";

export type Formula413Props = {
  category:
    | "Cadres directeurs généraux, directeurs de centre de formation en travail social et directeurs d'établissement ou de service"
    | "Cadres"
    | "Non-cadres";
  seniority: number;
  refSalary: number;
  seniorityNonCadre?: number;
};

export class Formula413
  implements IFormula<SupportedCcIndemniteLicenciement.IDCC413>
{
  computeFormula({
    seniority,
    refSalary,
    category,
    seniorityNonCadre,
  }: FormulaProps<SupportedCcIndemniteLicenciement.IDCC413>): Formula {
    let formula = "";
    const explanations = [];
    const year = round(seniority) < 2 ? "an" : "ans";
    if (category === "Non-cadres" && seniority >= 2) {
      formula = `1/2 * Sref * A`;
      explanations.push(`A : Ancienneté totale (${round(seniority)} ${year})`);
      explanations.push(`Sref : Salaire de référence (${round(refSalary)} €)`);
    } else if (
      (category === "Cadres" ||
        category ===
          "Cadres directeurs généraux, directeurs de centre de formation en travail social et directeurs d'établissement ou de service") &&
      !seniorityNonCadre &&
      seniority > 2
    ) {
      formula = `Sref * A`;
      explanations.push(`A : Ancienneté totale (${round(seniority)} ${year})`);
      explanations.push(`Sref : Salaire de référence (${round(refSalary)} €)`);
    } else if (
      (category === "Cadres" ||
        category ===
          "Cadres directeurs généraux, directeurs de centre de formation en travail social et directeurs d'établissement ou de service") &&
      seniorityNonCadre &&
      seniority > 2
    ) {
      const anNonCadre = round(seniorityNonCadre) < 2 ? "an" : "ans";
      formula = `1/2 * Sref * A1 + Sref * A2`;
      explanations.push(
        `A1: Année de service en qualité de non-cadres (${round(
          seniorityNonCadre
        )} ${anNonCadre})`
      );
      const seniorityRemain = round(seniority - seniorityNonCadre);
      explanations.push(
        `A2: Année de service en qualité de cadre (${round(
          seniorityRemain
        )} ${anNonCadre})`
      );
      explanations.push(`Sref : Salaire de référence (${round(refSalary)} €)`);
    }
    return { explanations, formula };
  }
}
