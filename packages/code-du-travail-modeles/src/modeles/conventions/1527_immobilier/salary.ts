import { ReferenceSalaryLegal } from "../../base";
import type {
  IReferenceSalary,
  ReferenceSalaryProps,
  SalaryPeriods,
  SupportedCc,
} from "../../common";

export type CC1527ReferenceSalaryProps = {
  salaires: SalaryPeriods[];
  hasCommission: boolean;
};

export class ReferenceSalary1527
  implements IReferenceSalary<SupportedCc.IDCC1527>
{
  mapSituation(
    args: Record<string, string | undefined>
  ): ReferenceSalaryProps<SupportedCc.IDCC1527> {
    return {
      hasCommission: args.hasCommission === "oui",
      salaires: args.salaryPeriods
        ? (JSON.parse(args.salaryPeriods) as SalaryPeriods[])
        : [],
    };
  }

  /**
   * Règle :
   * - si les commissions ne constituent pas un élément contractuel de rémunération : S
   * S : on prend le legal
   *
   * - si les commissions constituent un élément contractuel de rémunération : 1/13*S
   * S : total des salaires perçus lors des 12 derniers mois précédant le jour de l'envoi de la lettre de licenciement (brut)
   **/
  computeReferenceSalary({
    salaires = [],
    hasCommission = false,
  }: ReferenceSalaryProps<SupportedCc.IDCC1527>): number {
    if (!hasCommission) {
      return new ReferenceSalaryLegal().computeReferenceSalary({ salaires });
    }
    const totalSalaries = salaires.reduce(
      (total, item) => total + (item.value ?? 0),
      0
    );
    return totalSalaries / 13;
  }
}
