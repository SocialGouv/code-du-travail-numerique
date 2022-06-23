import { rankByMonthArrayDescFrench, sum } from "../../utils";
import type {
  IReferenceSalary,
  ReferenceSalaryProps,
  SupportedCcIndemniteLicenciement,
} from "./types";

export type LegalReferenceSalaryProps = {
  hasSameSalaire: boolean;
  salaire?: number;
  salaires: {
    month: string;
    value: number;
  }[];
  primes: number[];
};

export class ReferenceSalaryLegal
  implements IReferenceSalary<SupportedCcIndemniteLicenciement.default>
{
  computeReferenceSalary({
    hasSameSalaire,
    salaires,
    salaire,
    primes,
  }: ReferenceSalaryProps<SupportedCcIndemniteLicenciement.default>): number {
    const rankedSalaires = rankByMonthArrayDescFrench(salaires);

    const salaryValues = rankedSalaires.map((a) => a.value);

    if (!salaire) {
      salaire = 0;
    }

    const moyenneSalaires = hasSameSalaire
      ? salaire
      : sum(salaryValues) / rankedSalaires.length;

    const moyenne3DerniersMoisSalaires = hasSameSalaire
      ? salaire
      : sum(primes) / 12 + (sum(salaryValues.slice(0, 3)) - sum(primes)) / 3;

    return Math.max(moyenneSalaires, moyenne3DerniersMoisSalaires);
  }
}
