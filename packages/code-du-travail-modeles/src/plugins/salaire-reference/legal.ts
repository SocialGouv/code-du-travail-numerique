import { rankByMonthArrayDescFrench, sum } from "../../utils";
import type {
  IReferenceSalary,
  ReferenceSalaryProps,
  SalaryPeriods,
  SupportedCcIndemniteLicenciement,
} from "./types";
import { nonNullable } from "./types";

export type LegalReferenceSalaryProps = {
  salaires: SalaryPeriods[];
};

export class ReferenceSalaryLegal
  implements IReferenceSalary<SupportedCcIndemniteLicenciement.default>
{
  computeReferenceSalary({
    salaires = [],
  }: ReferenceSalaryProps<SupportedCcIndemniteLicenciement.default>): number {
    const rankedSalaires = rankByMonthArrayDescFrench(salaires);
    const primeValues = rankedSalaires.map((v) => v.prime).filter(nonNullable);
    const salaryValues = rankedSalaires.map((a) => a.value).filter(nonNullable);

    let moyenneSalaires = 0;
    let moyenne3DerniersMoisSalaires = 0;

    // calcul du salaire de reference
    moyenneSalaires = sum(salaryValues) / salaires.length;

    moyenne3DerniersMoisSalaires =
      sum(primeValues) / 12 +
      (sum(salaryValues.slice(0, 3)) - sum(primeValues)) / 3;

    return Math.max(moyenneSalaires, moyenne3DerniersMoisSalaires);
  }
}
