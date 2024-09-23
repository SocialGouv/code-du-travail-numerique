import type {
  IReferenceSalary,
  ReferenceSalaryProps,
  SupportedCc,
} from "../../common";
import { nonNullable, rankByMonthArrayDescFrench } from "../../common";

export class ReferenceSalary86
  implements IReferenceSalary<SupportedCc.IDCC0086>
{
  /**
   * - S
   * S : salaire perçu par le salarié lors du dernier mois précédant le jour de l'envoi de la lettre de licenciement (brut)
   */
  computeReferenceSalary({
    salaires = [],
  }: ReferenceSalaryProps<SupportedCc.IDCC0086>): number {
    const rankedSalaires = rankByMonthArrayDescFrench(salaires);
    const salaryValues = rankedSalaires.map((a) => a.value).filter(nonNullable);
    return salaryValues[0] ?? 0;
  }
}
