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
    let explanations: string[] = [];
    const year = round(seniority) < 2 ? "an" : "ans";
    if (
      (category === CatPro2216.employes || category === CatPro2216.agents) &&
      seniority >= 8 / 12
    ) {
      const res = new FormulaLegal().computeFormula({
        isForInaptitude: false,
        refSalary,
        seniority,
      });
      formula = res.formula;
      explanations = res.explanations;
      if (isEconomicFiring && age > 50 && seniority <= 10) {
        formula += ` + ( 20\\% * (1 / 4 * Sref * A) )`;
        explanations.push(`20% : majoration pour motif économique`);
      } else if (isEconomicFiring && age > 50 && seniority > 10) {
        formula += ` + ( 20\\% * (1 / 4 * Sref * A) + 20\\% * (1 / 3 * Sref * A) )`;
        explanations.push(`20% : majoration pour motif économique`);
      }
    } else if (
      category === CatPro2216.cadres &&
      seniority >= 8 / 12 &&
      seniority <= 5
    ) {
      formula = `1 / 4 * Sref * A`;
      explanations.push(`A : Ancienneté totale (${round(seniority)} ${year})`);
      explanations.push(`Sref : Salaire de référence (${round(refSalary)} €)`);
      if (isEconomicFiring && age >= 50) {
        formula += ` + ( 20\\% * (1 / 4 * Sref * A) )`;
        explanations.push(`20% : majoration pour motif économique`);
      }
    } else if (category === CatPro2216.cadres && seniority > 5) {
      formula = `( 3 / 10 * Sref * A1 )`;
      const maxSeniority1 = Math.min(round(seniority), 10);
      const yearAfterDiff = maxSeniority1 < 2 ? "an" : "ans";
      explanations.push(
        `A1: Années de présence pour la tranche jusqu'à 10 ans (${maxSeniority1} ${yearAfterDiff})`
      );
      if (isEconomicFiring && age >= 50) {
        formula += ` + ( 20\\% * ( 3 / 10 * Sref * A1 ) )`;
      }
      if (seniority > 10) {
        formula += ` + ( 4 / 10 * Sref * A2 )`;
        const maxSeniority2 = Math.min(round(seniority - 10), 10);
        const yearAfterDiff2 = maxSeniority2 < 2 ? "an" : "ans";
        explanations.push(
          `A2: Années de présence pour la tranche de 10 à 20 ans (${maxSeniority2} ${yearAfterDiff2})`
        );
        if (isEconomicFiring && age >= 50) {
          formula += ` + ( 20\\% * ( 4 / 10 * Sref * A2 ))`;
        }
      }
      if (seniority > 20) {
        formula += ` + ( 5 / 10 * Sref * A3 )`;
        const maxSeniority3 = Math.min(round(seniority - 20), 20);
        const yearAfterDiff3 = maxSeniority3 < 2 ? "an" : "ans";
        explanations.push(
          `A3: Années de présence pour la tranche de 20 ans à 40 ans (${maxSeniority3} ${yearAfterDiff3})`
        );
        if (isEconomicFiring && age >= 50) {
          formula += ` + ( 20\\% * ( 5 / 10 * Sref * A3 ))`;
        }
      }
      if (seniority > 40) {
        formula += ` + ( 1 / 3 * Sref * A4 )`;
        const maxSeniority4 = round(seniority - 40);
        const yearAfterDiff4 = maxSeniority4 < 2 ? "an" : "ans";
        explanations.push(
          `A4: Années de présence pour la tranche au-delà de 40 ans (${maxSeniority4} ${yearAfterDiff4})`
        );
        if (isEconomicFiring && age >= 50) {
          formula += ` + ( 20\\% * ( 1 / 3 * Sref * A4 ))`;
        }
      }
      if (isEconomicFiring) {
        explanations.push(`20% : majoration pour motif économique`);
      }
    }
    return { explanations, formula };
  }
}
