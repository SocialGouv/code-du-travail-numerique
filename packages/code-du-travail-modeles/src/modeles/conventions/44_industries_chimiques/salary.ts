import type {
  IReferenceSalary,
  ReferenceSalaryProps,
  SalaryPeriods,
  SupportedCcIndemniteLicenciement,
} from "../../common";
import { nonNullable, rankByMonthArrayDescFrench, sum } from "../../common";

export enum CategoryPro44 {
  ouvrier = "Ouvriers et collaborateurs (Groupes I à III)",
  techniciens = "Agents de maîtrise et techniciens (Groupe IV)",
  inge = "Ingénieurs et cadres (Groupe V)",
}

export type CC44ReferenceSalaryProps = {
  salaires: SalaryPeriods[];
  hasVariablePay: boolean;
  category: CategoryPro44;
  lastMonthSalary?: SalaryPeriods;
};

export class ReferenceSalary44
  implements IReferenceSalary<SupportedCcIndemniteLicenciement.IDCC0044> {
  /**
   * (si le salaire ne comporte pas une partie fixe et une partie variable et Ouvriers et collaborateurs & Agents de maîtrise et techniciens) ou (Ingénieurs et Cadres)
   * - S1 + P / 12 (si >= S2/12)
   * S1 : salaire perçu lors du dernier mois précédant le jour de l'envoi de la lettre de licenciement (brut)
   * - soit S2/12 (si > S1)
   * S2 : total des salaires perçus lors des 12 mois précédant le jour de l'envoi de la lettre de licenciement (brut)
   * - S2/12
   * S2 : total des salaires perçus lors des 12 mois précédant le jour de l'envoi de la lettre de licenciement (brut)
   *
   * si le salaire comporte une partie fixe et une partie variable et Ouvriers et collaborateurs & Agents de maîtrise et techniciens
   * - S2/12
   * S2 : total des salaires perçus lors des 12 mois précédant le jour de l'envoi de la lettre de licenciement (brut)
   */
  computeReferenceSalary({
    salaires = [],
    hasVariablePay,
    category,
    lastMonthSalary,
  }: ReferenceSalaryProps<SupportedCcIndemniteLicenciement.IDCC0044>): number {
    const rankedSalaires = rankByMonthArrayDescFrench(salaires);
    const salaryValues = rankedSalaires.map((a) => a.value).filter(nonNullable);
    const salaireMoyen = sum(salaryValues) / 12;
    let dernierSalaire = rankedSalaires[0]?.value ?? 0;
    let dernierePrimeProraterise = (rankedSalaires[0]?.prime ?? 0) / 12;

    if (
      !hasVariablePay &&
      lastMonthSalary &&
      (category === CategoryPro44.ouvrier ||
        category === CategoryPro44.techniciens)
    ) {
      dernierSalaire = lastMonthSalary.value ?? 0;
      dernierePrimeProraterise = (lastMonthSalary.prime ?? 0) / 12;
    }

    if (
      hasVariablePay &&
      (category === CategoryPro44.ouvrier ||
        category === CategoryPro44.techniciens)
    ) {
      return salaireMoyen;
    } else {
      return Math.max(dernierSalaire + dernierePrimeProraterise, salaireMoyen);
    }
  }
}
