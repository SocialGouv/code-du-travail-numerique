import { round } from "../../utils";
import type { SupportedCcIndemniteLicenciement } from "..";
import { LicenciementEconomique } from "..";
import type { Formula, FormulaProps, IFormula } from "./types";

export enum CatPro573 {
  autres = "Autres salariés",
  agents = "Agents de maîtrise, techniciens et assimilés",
  cadres = "Cadres",
}

export type Formula573Props = {
  age: number;
  seniority: number;
  refSalary: number;
  category: CatPro573;
  typeLicenciement: LicenciementEconomique;
};

export class Formula573
  implements IFormula<SupportedCcIndemniteLicenciement.IDCC0573>
{
  computeFormula({
    seniority,
    refSalary,
    age,
    category,
    typeLicenciement,
  }: FormulaProps<SupportedCcIndemniteLicenciement.IDCC0573>): Formula {
    let formula = "";
    const explanations = [];
    const roundSeniority = round(seniority);
    const year = roundSeniority < 2 ? "an" : "ans";
    const roundSeniority2 = Math.min(round(seniority), 9);
    const year2 = roundSeniority2 < 2 ? "an" : "ans";
    const roundSeniority3 = Math.max(0, Math.min(round(seniority - 9), 10));
    const year3 = roundSeniority3 < 2 ? "an" : "ans";
    const roundSeniority4 = Math.max(0, round(seniority - 19));
    const year4 = roundSeniority4 < 2 ? "an" : "ans";
    const roundSeniority5 = Math.max(0, round(seniority - 10));
    const year5 = roundSeniority5 < 2 ? "an" : "ans";
    const roundSeniority6 = Math.max(0, round(seniority - 9));
    const year6 = roundSeniority6 < 2 ? "an" : "ans";
    switch (true) {
      case category === CatPro573.autres && seniority >= 1 && seniority <= 10: {
        formula = `1 / 5 * Sref * A`;
        explanations.push(
          `A: Années d'ancienneté au total (${roundSeniority} ${year})`
        );
        break;
      }
      case category === CatPro573.autres && seniority > 10: {
        formula = `1 / 5 * Sref * A1 + 2 / 15 * Sref * A2`;
        explanations.push(
          `A1: Années d'ancienneté au total (${roundSeniority} ${year})`
        );
        explanations.push(
          `A2: Années d'ancienneté au delà de 10 ans (${roundSeniority5} ${year5})`
        );
        break;
      }
      case category === CatPro573.agents &&
        seniority >= 15 &&
        age >= 55 &&
        typeLicenciement === LicenciementEconomique.oui: {
        formula = `2 / 10 * Sref * A1 + 3 / 10 * Sref * A2 + 20% (2 / 10 * Sref * A1 + 3 / 10 * Sref)`;

        explanations.push(
          `A1: Années de présence dans la tranche de 0 à 9 ans inclus (${roundSeniority2} ${year2})`
        );
        explanations.push(
          `A2: Années de présence dans la tranche à partir de 10 ans (${roundSeniority6} ${year6})`
        );
        break;
      }
      case category === CatPro573.agents && seniority >= 1 && seniority <= 10: {
        formula = `2 / 10 * Sref * A`;
        explanations.push(
          `A: Années d'ancienneté au total (${roundSeniority} ${year})`
        );
        break;
      }
      case category === CatPro573.agents && seniority > 10: {
        formula = `2 / 10 * Sref * A1 + 2 / 15 * Sref * A2`;
        explanations.push(
          `A1: Années d'ancienneté au total (${roundSeniority} ${year})`
        );
        explanations.push(
          `A2: Années d'ancienneté au delà de 10 ans (${roundSeniority5} ${year5})`
        );
        break;
      }
      case category === CatPro573.cadres && seniority >= 1 && seniority <= 5: {
        formula = `2 / 10 * Sref * A`;
        explanations.push(
          `A: Années d'ancienneté au total (${roundSeniority} ${year})`
        );
        break;
      }
      case category === CatPro573.cadres && seniority >= 15 && age >= 55: {
        formula = `3 / 10 * Sref * A1 + 4 / 10 * Sref * A2 + 5 / 10 * Sref * A3 + 20% ( 3 / 10 * Sref * A1 + 4 / 10 * Sref * A2 + 5 / 10 * Sref * A3 )`;
        explanations.push(
          `A1: Années de présence dans la tranche de 0 à 9 ans inclus (${roundSeniority2} ${year2})`
        );
        explanations.push(
          `A2: Années de présence dans la tranche de 10 à 19 ans inclus (${roundSeniority3} ${year3})`
        );
        explanations.push(
          `A3: Années de présence dans la tranche à partir de 20 ans (${roundSeniority4} ${year4})`
        );
        break;
      }
      case category === CatPro573.cadres && seniority >= 15 && age >= 50: {
        formula = `3 / 10 * Sref * A1 + 4 / 10 * Sref * A2 + 5 / 10 * Sref * A3 + 15% ( 3 / 10 * Sref * A1 + 4 / 10 * Sref * A2 + 5 / 10 * Sref )`;
        explanations.push(
          `A1: Années de présence dans la tranche de 0 à 9 ans inclus (${roundSeniority2} ${year2})`
        );
        explanations.push(
          `A2: Années de présence dans la tranche de 10 à 19 ans inclus (${roundSeniority3} ${year3})`
        );
        explanations.push(
          `A3: Années de présence dans la tranche à partir de 20 ans (${roundSeniority4} ${year4})`
        );
        break;
      }
      case category === CatPro573.cadres && seniority > 5: {
        formula = `3 / 10 * Sref * A1 + 4 / 10 * Sref * A2 + 5 / 10 * Sref * A3`;
        explanations.push(
          `A1: Années de présence dans la tranche de 0 à 9 ans inclus (${roundSeniority2} ${year2})`
        );
        explanations.push(
          `A2: Années de présence dans la tranche de 10 à 19 ans inclus (${roundSeniority3} ${year3})`
        );
        explanations.push(
          `A3: Années de présence dans la tranche à partir de 20 ans (${roundSeniority4} ${year4})`
        );
        break;
      }
    }
    if (formula !== "") {
      explanations.push(`Sref : Salaire de référence (${round(refSalary)} €)`);
    }

    const filteredExplanations = explanations.filter(
      (el) => !el.includes("(0 an)")
    );

    return {
      explanations: filteredExplanations,
      formula,
    };
  }
}
