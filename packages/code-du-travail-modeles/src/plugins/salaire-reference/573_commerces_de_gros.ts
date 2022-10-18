import { nonNullable, rankByMonthArrayDescFrench, sum } from "../../utils";
import type { SalaryPeriods, SupportedCcIndemniteLicenciement } from "..";
import { ReferenceSalaryLegal } from "./legal";
import type { IReferenceSalary, ReferenceSalaryProps } from "./types";

export type CC573ReferenceSalaryProps = {
  salaires: SalaryPeriods[];
  isEconomicFiring: boolean;
};

export class ReferenceSalary573
  implements IReferenceSalary<SupportedCcIndemniteLicenciement.IDCC0573>
{
  /**
   * Règle :
   * - si le licenciement est pour des raisons économiques
   * S / 12
   * S : total des salaires perçus lors des 12 derniers mois précédant le jour de l'envoi de la lettre de licenciement (brut)
   * - sinon c'est le légal qui s'applique
   **/
  computeReferenceSalary({
    salaires = [],
    isEconomicFiring = false,
  }: ReferenceSalaryProps<SupportedCcIndemniteLicenciement.IDCC0573>): number {
    if (isEconomicFiring) {
      const rankedSalaires = rankByMonthArrayDescFrench(salaires);
      const salaryValues = rankedSalaires
        .map((a) => a.value)
        .filter(nonNullable);
      return salaryValues.length === 0
        ? 0
        : sum(salaryValues) / salaires.length;
    }
    return new ReferenceSalaryLegal().computeReferenceSalary({ salaires });
  }
}
