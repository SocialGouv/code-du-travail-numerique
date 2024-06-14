import type {
  IReferenceSalary,
  ReferenceSalaryProps,
  SalaryPeriods,
  SupportedCc,
} from "../../common";
import { nonNullable, rankByMonthArrayDescFrench, sum } from "../../common";

export enum CategoryPro44 {
  ouvrier = "'Ouvriers et collaborateurs (Groupes I à III)'",
  techniciens = "'Agents de maîtrise et techniciens (Groupe IV)'",
  inge = "'Ingénieurs et cadres (Groupe V)'",
}

export type CC44ReferenceSalaryProps = {
  salaires: SalaryPeriods[];
  hasVariablePay: boolean;
  category: CategoryPro44;
  lastMonthSalary?: SalaryPeriods;
};

export class ReferenceSalary44
  implements IReferenceSalary<SupportedCc.IDCC0044>
{
  mapSituation(
    args: Record<string, string | undefined>
  ): ReferenceSalaryProps<SupportedCc.IDCC0044> {
    const category =
      args[
        "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle"
      ] ?? "";
    return {
      category: category as CategoryPro44,
      hasVariablePay: args.hasVariablePay === "oui",
      lastMonthSalary: args.lastMonthSalary
        ? JSON.parse(args.lastMonthSalary)
        : undefined,
      salaires: args.salaryPeriods
        ? (JSON.parse(args.salaryPeriods) as SalaryPeriods[])
        : [],
    };
  }

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
  }: ReferenceSalaryProps<SupportedCc.IDCC0044>): number {
    const rankedSalaires = rankByMonthArrayDescFrench(salaires);
    const salaryValues = rankedSalaires.map((a) => a.value).filter(nonNullable);
    const salaireMoyen = sum(salaryValues) / 12;
    let dernierSalaire = rankedSalaires[0]?.value ?? 0;
    let dernierePrimeProraterise = (rankedSalaires[0]?.prime ?? 0) / 12;
    let dernierSalaireSansPrimes =
      dernierSalaire - (rankedSalaires[0]?.prime ?? 0);

    if (
      !hasVariablePay &&
      lastMonthSalary &&
      lastMonthSalary.value &&
      (category === CategoryPro44.ouvrier ||
        category === CategoryPro44.techniciens)
    ) {
      dernierSalaire = lastMonthSalary.value;
      dernierePrimeProraterise = (lastMonthSalary.prime ?? 0) / 12;
      dernierSalaireSansPrimes = dernierSalaire - (lastMonthSalary.prime ?? 0);
    }

    if (
      hasVariablePay &&
      (category === CategoryPro44.ouvrier ||
        category === CategoryPro44.techniciens)
    ) {
      return salaireMoyen;
    } else {
      return Math.max(
        dernierSalaireSansPrimes + dernierePrimeProraterise,
        salaireMoyen
      );
    }
  }
}
