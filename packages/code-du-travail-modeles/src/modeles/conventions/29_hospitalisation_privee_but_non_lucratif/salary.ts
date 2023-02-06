import { ReferenceSalaryLegal } from "../../base";
import type {
  IReferenceSalary,
  ReferenceSalaryProps,
  SalaryPeriods,
  SupportedCcIndemniteLicenciement,
} from "../../common";
import { nonNullable, rankByMonthArrayDescFrench, sum } from "../../common";

export type CC29ReferenceSalaryProps = {
  salaires: SalaryPeriods[];
  professionalCategory: string;
  bestSalariesTotal?: number;
};

export enum CategoryPro29 {
  other = "Autres salariés",
  assistant = "Assistants familiaux des services de placements familiaux spécialisés",
  medic = "Médecins, pharmaciens et biologistes exerçant à titre permanent",
}

export class ReferenceSalary0029
  implements IReferenceSalary<SupportedCcIndemniteLicenciement.IDCC0029> {
  /**
   * Règle :
   * Pour la catégorie pro :
   * - soit S/3
      S : total des salaires perçus lors des 3 derniers mois précédant le jour de l'envoi de la lettre de licenciement (brut)

      - soit S/6
      S : total des 6 meilleurs salaires perçus consécutivement (brut)
    * Sinon utilisation de la formule du légal
   **/
  computeReferenceSalary({
    salaires = [],
    professionalCategory,
    bestSalariesTotal,
  }: ReferenceSalaryProps<SupportedCcIndemniteLicenciement.IDCC0029>): number {
    if (professionalCategory === CategoryPro29.assistant) {
      const rankedSalaires = rankByMonthArrayDescFrench(salaires);
      const salaryValues = rankedSalaires
        .map((a) => a.value)
        .filter(nonNullable);
      const threeLastMonthAverage = sum(salaryValues.slice(0, 3)) / 3;
      const bestSalariesAverage = (bestSalariesTotal ?? 0) / 6;
      return Math.max(threeLastMonthAverage, bestSalariesAverage);
    }
    return new ReferenceSalaryLegal().computeReferenceSalary({ salaires });
  }
}
