import type {
  IReferenceSalary,
  ReferenceSalaryProps,
  SalaryPeriods,
  SupportedCcIndemniteLicenciement,
} from "../../common";
import { nonNullable, rankByMonthArrayDescFrench, sum } from "../../common";

export type CC2596ReferenceSalaryProps = {
  salaires: SalaryPeriods[];
  salairesPendantPreavis: SalaryPeriods[];
};

export class ReferenceSalary2596
  implements IReferenceSalary<SupportedCcIndemniteLicenciement.IDCC2596>
{
  /**
   * Règle :
   * S/12
   *  S : total des salaires perçus lors des 12 derniers mois de présence dans l'entreprise (brut, préavis inclu)
   **/
  computeReferenceSalary({
    salaires,
    salairesPendantPreavis,
  }: ReferenceSalaryProps<SupportedCcIndemniteLicenciement.IDCC2596>): number {
    const rankedSalaires = rankByMonthArrayDescFrench(salaires);
    const rankedSalairesPendantPreavis = rankByMonthArrayDescFrench(
      salairesPendantPreavis
    );
    const salaryValues = rankedSalaires.map((a) => a.value).filter(nonNullable);

    const totalSalaryValues = [
      ...rankedSalairesPendantPreavis.map((a) => a.value).filter(nonNullable),
      ...salaryValues,
    ].slice(0, 12);

    const primesPendantPreavis = rankedSalairesPendantPreavis
      .map((v) => v.prime)
      .filter(nonNullable);

    return (
      (sum(totalSalaryValues) + sum(primesPendantPreavis)) /
      totalSalaryValues.length
    );
  }
}
