import { sum } from "../../utils";
import type { ISalaireReference, LegalReferenceSalaryProps } from "./types";

export class SalaireReferenceLegal
  implements ISalaireReference<LegalReferenceSalaryProps>
{
  computeReferenceSalary({
    hasSameSalaire,
    salaires,
    salaire,
    primes,
  }: LegalReferenceSalaryProps): number {
    const salaryValues = salaires.map((a) => a.value);

    if (!salaire) {
      salaire = 0;
    }

    const moyenneSalaires = hasSameSalaire
      ? salaire
      : sum(salaryValues) / salaires.length;

    const moyenne3DerniersMoisSalaires = hasSameSalaire
      ? salaire
      : sum(primes) / 12 + (sum(salaryValues.slice(0, 3)) - sum(primes)) / 3;

    return Math.max(moyenneSalaires, moyenne3DerniersMoisSalaires);
  }
}
