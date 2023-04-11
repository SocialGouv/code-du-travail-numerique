import type {
  IReferenceSalary,
  ReferenceSalaryProps,
  SalaryPeriods,
  SupportedCcIndemniteLicenciement,
} from "../../common";
import { nonNullable, sum } from "../../common";

export class ReferenceSalary1606
  implements IReferenceSalary<SupportedCcIndemniteLicenciement.IDCC1606>
{
  /**
   * Règle :
   * S
   * S : total des salaires perçus lors des 12 derniers mois précédant le jour de l'envoi de la lettre de licenciement (brut)"
   **/
  computeReferenceSalary({
    salaires,
  }: ReferenceSalaryProps<SupportedCcIndemniteLicenciement.IDCC1606>): number {
    return sum(salaires.map((a: SalaryPeriods) => a.value).filter(nonNullable));
  }
}
