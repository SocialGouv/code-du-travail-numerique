import { sum } from "../../../common/utils";
import { Prime } from "../../steps/Salaires/components/Primes";
import { SalaryPeriods } from "../../steps/Salaires/components/SalaireTempsPlein";

type Props = {
  hasSameSalaire: boolean;
  salaires: SalaryPeriods[];
  salaire: number | undefined;
  primes: Prime[];
};

export default function computeReferenceSalary({
  hasSameSalaire = false,
  salaires = [],
  salaire,
  primes = [],
}: Props) {
  if (!salaires) {
    salaires = [];
  }
  if (!primes) {
    primes = [];
  }
  if (!salaire) {
    salaire = 0;
  }
  const primeValues = primes.filter((v) => v !== undefined);
  const salaryValues = salaires.map((a) => a.value);

  let moyenneSalaires = 0;
  let moyenne3DerniersMoisSalaires = 0;

  // calcul du salaire de reference
  moyenneSalaires = hasSameSalaire
    ? salaire
    : sum(salaryValues) / salaires.length;

  moyenne3DerniersMoisSalaires = hasSameSalaire
    ? salaire
    : sum(primeValues) / 12 +
      (sum(salaryValues.slice(0, 3)) - sum(primeValues)) / 3;

  return Math.max(moyenneSalaires, moyenne3DerniersMoisSalaires);
}
