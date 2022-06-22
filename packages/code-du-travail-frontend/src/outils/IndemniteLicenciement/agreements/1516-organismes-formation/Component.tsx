import React from "react";
import { Primes, SalaireTempsPlein } from "../../steps/Salaires/components";
import { SalaryPeriods } from "../../steps/Salaires/components/SalaireTempsPlein";

export type Prime = number | null;

type Props = {
  primes: Prime[];
  onChangePrimes: (primes: Prime[]) => void;
  errorPrimes?: string;
  salariesPeriods: SalaryPeriods[];
  onChangeSalaries: (salaries: SalaryPeriods[]) => void;
  errorSalaries?: string;
  note?: string;
};

export default function Agreement1516({
  primes,
  onChangePrimes,
  errorPrimes,
  salariesPeriods,
  onChangeSalaries,
  errorSalaries,
}: Props) {
  return (
    <>
      <Primes
        title="Primes annuelles ou exceptionnelles perçues au cours du préavis"
        primes={primes}
        onChange={onChangePrimes}
        error={errorPrimes}
      />
      <SalaireTempsPlein
        title="Salaires perçus pendant le préavis"
        onSalariesChange={onChangeSalaries}
        salaryPeriods={salariesPeriods}
        error={errorSalaries}
        note="Le montant de l’indemnité est basé sur le salaire le plus élevé jusqu’à la sortie de l’entreprise (incluant le préavis). Pour réaliser la simulation nous considérerons que le montant du salaire perçu pendant le préavis est le même que celui  perçu au cours des 12 derniers mois précédant la notification du licenciement. En conséquence, le résultat donné pourrait ne pas correspondre exactement à votre situation."
      />
    </>
  );
}
