import { sum } from "../../../common/utils";
import { SalaryPeriods } from "../types";

type Props = {
  salaires: SalaryPeriods[];
};

export default function computeReferenceSalary({ salaires = [] }: Props) {
  const primeValues = salaires.map((v) => v.prime).filter(Boolean);
  const salaryValues = salaires.map((a) => a.value).filter(Boolean);

  let moyenneSalaires = 0;
  let moyenne3DerniersMoisSalaires = 0;

  // calcul du salaire de reference
  moyenneSalaires = sum(salaryValues) / salaires.length;

  moyenne3DerniersMoisSalaires =
    sum(primeValues) / 12 +
    (sum(salaryValues.slice(0, 3)) - sum(primeValues)) / 3;

  return Math.max(moyenneSalaires, moyenne3DerniersMoisSalaires);
}
