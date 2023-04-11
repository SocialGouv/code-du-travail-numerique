import type {
  IReferenceSalary,
  ReferenceSalaryProps,
  SalaryPeriods,
  SupportedCcIndemniteLicenciement,
} from "../../common";
import { nonNullable, rankByMonthArrayDescFrench, sum } from "../../common";

export type CC2614ReferenceSalaryProps = {
  salaires: SalaryPeriods[];
  hasVariablePay: boolean;
};

export class ReferenceSalary2614
  implements IReferenceSalary<SupportedCcIndemniteLicenciement.IDCC2614>
{
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
  }: ReferenceSalaryProps<SupportedCcIndemniteLicenciement.IDCC2614>): number {
    const rankedSalaires = rankByMonthArrayDescFrench(salaires);
    const salaryValues = rankedSalaires.map((a) => a.value).filter(nonNullable);
    const salaireMoyen = sum(salaryValues) / 12;
    const lastSalary = salaryValues[0] ?? 0;
    if (hasVariablePay) return salaireMoyen;
    return lastSalary;
  }
}
