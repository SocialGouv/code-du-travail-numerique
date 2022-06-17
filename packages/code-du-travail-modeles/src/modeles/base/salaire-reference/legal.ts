import { sum } from "../utils";

export type LegalReferenceSalaryProps = {
  hasSameSalaire: boolean;
  salaire?: number;
  salaires: {
    month: string;
    value: number;
  }[];
  primes: number[];
};

export default function computeReferenceSalaryLegal({
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
