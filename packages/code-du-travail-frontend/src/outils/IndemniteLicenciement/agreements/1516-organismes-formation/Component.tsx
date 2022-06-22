import React from "react";
import { SalaireTempsPlein } from "../../steps/Salaires/components";

export type Prime = number | null;

type Props = {
  onChange: (primes: Prime[]) => void;
  primes: Prime[];
  error?: string;
};

export default function Agreement1516({ primes, onChange, error }: Props) {
  return (
    <>
      <p>
        Primes annuelles ou exceptionnelles perçues au cours des 3 derniers mois
      </p>
      <Primes
        title="Primes annuelles ou exceptionnelles perçues au cours des 3 derniers mois"
        primes={[2000]}
        onChange={onChangePrimes}
      />
      <SalaireTempsPlein
        title="Salaires perçus pendant le préavis"
        onSalariesChange={onSalariesChange}
        salaryPeriods={[
          {
            month: "janvier",
            value: 2000,
          },
        ]}
        note="Le montant de l’indemnité est basé sur le salaire le plus élevé jusqu’à la sortie de l’entreprise (incluant le préavis). Pour réaliser la simulation nous considérerons que le montant du salaire perçu pendant le préavis est le même que celui  perçu au cours des 12 derniers mois précédant la notification du licenciement. En conséquence, le résultat donné pourrait ne pas correspondre exactement à votre situation."
      />
    </>
  );
}
