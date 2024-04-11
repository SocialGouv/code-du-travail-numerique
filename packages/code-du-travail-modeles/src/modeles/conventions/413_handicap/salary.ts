import type {
  IReferenceSalary,
  ReferenceSalaryProps,
  SupportedCc,
} from "../../common";
import { nonNullable, rankByMonthArrayDescFrench, sum } from "../../common";

export class ReferenceSalary413
  implements IReferenceSalary<SupportedCc.IDCC413>
{
  // Formule: S/3
  // S : total des salaires perçus lors des 3 derniers mois précédant le jour de l'envoi de la lettre de licenciement (brut)
  computeReferenceSalary({
    salaires = [],
  }: ReferenceSalaryProps<SupportedCc.IDCC413>): number {
    const rankedSalaires = rankByMonthArrayDescFrench(salaires);
    const salaryValues = rankedSalaires.map((a) => a.value).filter(nonNullable);

    const moyenne3DerniersMoisSalaires = sum(salaryValues.slice(0, 3)) / 3;

    return Math.max(0, moyenne3DerniersMoisSalaires);
  }
}
