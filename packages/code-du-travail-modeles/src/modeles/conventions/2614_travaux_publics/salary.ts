import type {
  IReferenceSalary,
  ReferenceSalaryProps,
  SalaryPeriods,
  SupportedCc,
} from "../../common";
import { nonNullable, rankByMonthArrayDescFrench, sum } from "../../common";

export type CC2614ReferenceSalaryProps = {
  salaires: SalaryPeriods[];
  hasVariablePay: boolean;
};

export class ReferenceSalary2614
  implements IReferenceSalary<SupportedCc.IDCC2614>
{
  mapSituation(
    args: Record<string, string | undefined>
  ): ReferenceSalaryProps<SupportedCc.IDCC2614> {
    return {
      hasVariablePay: args.hasVariablePay === "oui",
      salaires: args.salaryPeriods
        ? (JSON.parse(args.salaryPeriods) as SalaryPeriods[])
        : [],
    };
  }

  /**
   * Règle :
   * Si le salaire n'est pas variable
   * - S
   * S : salaire perçu par le salarié lors du dernier mois précédant le jour de l'envoi de la lettre de licenciement (brut)
   *
   * Si le salaire est variable
   * - S1 + 1/12*S2
   * S1 : salaire perçu par le salarié lors du dernier mois précédant le jour de l'envoi de la lettre de licenciement (brut)
   * S2 : total des sommes de cette rémunération variable sur les 12 derniers mois précédant le jour de l'envoi de la lettre de licenciement (brut)
   **/
  computeReferenceSalary({
    salaires,
    hasVariablePay,
  }: ReferenceSalaryProps<SupportedCc.IDCC2614>): number {
    const rankedSalaires = rankByMonthArrayDescFrench(salaires);
    const salaryValues = rankedSalaires.map((a) => a.value).filter(nonNullable);
    const salaireMoyen = sum(salaryValues) / 12;
    const lastSalary = salaryValues[0] ?? 0;
    if (hasVariablePay) return salaireMoyen;
    return lastSalary;
  }
}
