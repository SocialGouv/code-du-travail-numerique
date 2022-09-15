import { round } from "../../utils";
import type { SupportedCcIndemniteLicenciement } from "..";
import { FormulaLegal } from "./legal";
import type { Formula, FormulaProps, IFormula } from "./types";

export enum CatPro2216 {
  employes = "Employés et ouvriers, personnel de livraison",
  agents = "Agents de maîtrise et techniciens",
  cadres = "Cadres",
}

export type Formula2216Props = {
  category: CatPro2216;
  isEconomicFiring: boolean;
  age: number;
  seniority: number;
  refSalary: number;
};

export class Formula2216
  implements IFormula<SupportedCcIndemniteLicenciement.IDCC2216>
{
  computeFormula({
    seniority,
    refSalary,
    category,
    isEconomicFiring,
    age,
  }: FormulaProps<SupportedCcIndemniteLicenciement.IDCC2216>): Formula {
    let formula = "";
    const explanations = [];
    const year = round(seniority) < 2 ? "an" : "ans";
    if (
      (!isEconomicFiring &&
        (category === CatPro2216.employes || category === CatPro2216.agents)) ||
      (isEconomicFiring &&
        (category === CatPro2216.employes || category === CatPro2216.agents) &&
        age <= 50)
    ) {
      return new FormulaLegal().computeFormula({
        isForInaptitude: false,
        refSalary,
        seniority,
      });
    } else if (
      isEconomicFiring &&
      (category === CatPro2216.employes || category === CatPro2216.agents) &&
      age > 50 &&
      seniority >= 8 / 12
    ) {
      if (seniority <= 10) {
        formula = `1 / 4 * Sref * A`;
        explanations.push(
          `A : Ancienneté totale (${round(seniority)} ${year})`
        );
      } else {
        formula = `(1 / 4 * Sref * A1 + 1 / 3 * Sref * A2) + ( 20% * (1 / 4 * Sref * A1 + 1 / 3 * Sref * A2))`;
        explanations.push(`A1 : Ancienneté de 10 ans ou moins (10 ans)`);
        const yearAfterDiff = round(seniority - 10) < 2 ? "an" : "ans";
        explanations.push(
          `A2 : Ancienneté au delà de 10 ans (${round(
            seniority - 10
          )} ${yearAfterDiff})`
        );
      }
      explanations.push(`Sref : Salaire de référence (${round(refSalary)} €)`);
    } else if (
      category === CatPro2216.cadres &&
      seniority >= 8 / 12 &&
      seniority <= 5 &&
      !isEconomicFiring
    ) {
      formula = `1 / 4 * Sref * A`;
      explanations.push(`A : Ancienneté totale (${round(seniority)} ${year})`);
      explanations.push(`Sref : Salaire de référence (${round(refSalary)} €)`);
    } else if (
      category === CatPro2216.cadres &&
      seniority > 5 &&
      seniority < 40 &&
      !isEconomicFiring
    ) {
      formula = `( 3 / 10 * Sref * A1 ) + ( 4 / 10 * Sref * A2 ) +( 5/10 * Sref * A3 )`;
      const yearAfterDiff = round(seniority - 10) < 2 ? "an" : "ans";
      explanations.push(
        `A1: Années de présence pour la tranche jusqu'à 10 ans (${round(
          seniority - 10
        )} ${yearAfterDiff})`
      );
      const yearAfterDiff2 = round(seniority - 20) < 2 ? "an" : "ans";
      explanations.push(
        `A2: Années de présence pour la tranche de 10 à 20 ans (${round(
          seniority - 20
        )} ${yearAfterDiff2})`
      );
      const yearAfterDiff3 = round(seniority - 30) < 2 ? "an" : "ans";
      explanations.push(
        `A3: Années de présence pour la tranche au-delà de 20 ans (${round(
          seniority - 30
        )} ${yearAfterDiff3})`
      );
    }
    return { explanations, formula };
  }
}
