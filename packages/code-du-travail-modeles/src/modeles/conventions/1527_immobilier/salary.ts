import type {
  IReferenceSalary,
  ReferenceSalaryProps,
  SalaryPeriods,
  SupportedCcIndemniteLicenciement,
} from "../../common";

export type CC1527ReferenceSalaryProps = {
  salaires: SalaryPeriods[];
  hasCommission: boolean;
  salaryContract?: number;
};

export class ReferenceSalary1527
  implements IReferenceSalary<SupportedCcIndemniteLicenciement.IDCC1527>
{
  /**
   * Règle :
   * - si les commissions ne constituent pas un élément contractuel de rémunération : S
   * S : salaire perçu et convenu par les parties dans le contrat (brut)
   *
   * - si les commissions constituent un élément contractuel de rémunération : 1/13*S
   * S : total des salaires perçus lors des 12 derniers mois précédant le jour de l'envoi de la lettre de licenciement (brut)
   **/
  computeReferenceSalary({
    salaires = [],
    hasCommission = false,
    salaryContract = undefined,
  }: ReferenceSalaryProps<SupportedCcIndemniteLicenciement.IDCC1527>): number {
    if (!hasCommission && salaryContract) {
      return salaryContract;
    }
    const totalSalaries = salaires.reduce(
      (total, item) => total + (item.value ?? 0),
      0
    );
    return totalSalaries / 13;
  }
}
