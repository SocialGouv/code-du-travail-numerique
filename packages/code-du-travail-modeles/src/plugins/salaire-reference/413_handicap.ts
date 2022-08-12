import { nonNullable, rankByMonthArrayDescFrench, sum } from "../../utils";
import type { SupportedCcIndemniteLicenciement } from "..";
import type { IReferenceSalary, ReferenceSalaryProps } from "./types";

export class ReferenceSalary413
  implements IReferenceSalary<SupportedCcIndemniteLicenciement.IDCC413>
{
  // Formule: S/3
  // S : total des salaires perçus lors des 3 derniers mois précédant le jour de l'envoi de la lettre de licenciement (brut)
  computeReferenceSalary({
    salaires = [],
  }: ReferenceSalaryProps<SupportedCcIndemniteLicenciement.IDCC413>): number {
    const rankedSalaires = rankByMonthArrayDescFrench(salaires);
    const salaryValues = rankedSalaires.map((a) => a.value).filter(nonNullable);

    const moyenne3DerniersMoisSalaires = sum(salaryValues.slice(0, 3)) / 3;

    return Math.max(0, moyenne3DerniersMoisSalaires);
  }
}
