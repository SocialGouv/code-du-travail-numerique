import React from "react";
import { RadioQuestion } from "../../../Components";
import { Primes, SalaireTempsPlein } from "../../steps/Salaires/components";
import { useIndemniteLicenciementStore } from "../../store";

type Props = {
  isAgreementValid: boolean;
};

export default function Agreement1516() {
  const {
    salaryPeriods,
    onSalariesChange,
    errorSalaryPeriods,
    hasPrimes,
    onChangeHasReceivedPrimes,
    errorHasReceivedPrimes,
    primes,
    onChangePrimes,
    errorPrimes,
    hasReceivedSalaries,
    onChangeHasReceivedSalaries,
    errorHasReceivedSalaries,
  } = useIndemniteLicenciementStore((state) => ({
    salaryPeriods: state.agreement1516Data.input.salaryPeriods,
    onSalariesChange: state.agreement1516Function.onSalariesChange,
    errorSalaryPeriods: state.agreement1516Data.error.errorSalaryPeriods,
    hasPrimes: state.agreement1516Data.input.hasReceivedPrimes,
    onChangeHasReceivedPrimes:
      state.agreement1516Function.onChangeHasReceivedPrimes,
    errorHasReceivedPrimes:
      state.agreement1516Data.error.errorHasReceivedPrimes,
    primes: state.agreement1516Data.input.primes,
    onChangePrimes: state.agreement1516Function.onChangePrimes,
    errorPrimes: state.agreement1516Data.error.errorPrimes,
    hasReceivedSalaries: state.agreement1516Data.input.hasReceivedSalaries,
    onChangeHasReceivedSalaries:
      state.agreement1516Function.onChangeHasReceivedSalaries,
    errorHasReceivedSalaries:
      state.agreement1516Data.error.errorHasReceivedSalaries,
  }));

  return (
    <>
      <RadioQuestion
        questions={[
          {
            label: "Oui",
            value: "oui",
            id: "hasReceivedSalaries-oui",
          },
          {
            label: "Non",
            value: "non",
            id: "hasReceivedSalaries-non",
          },
        ]}
        name="hasReceivedSalaries"
        label="Connaissez-vous le montant des salaires perçus pendant le préavis ?"
        selectedOption={hasReceivedSalaries}
        onChangeSelectedOption={onChangeHasReceivedSalaries}
        error={errorHasReceivedSalaries}
        showRequired
      />
      {hasReceivedSalaries === "oui" && (
        <>
          <SalaireTempsPlein
            title="Salaires perçus pendant le préavis"
            onSalariesChange={onSalariesChange}
            salaryPeriods={salaryPeriods}
            error={errorSalaryPeriods}
            note="Le montant de l’indemnité est basé sur le salaire le plus élevé jusqu’à la sortie de l’entreprise (incluant le préavis). Pour réaliser la simulation nous considérerons que le montant du salaire perçu pendant le préavis est le même que celui  perçu au cours des 12 derniers mois précédant la notification du licenciement. En conséquence, le résultat donné pourrait ne pas correspondre exactement à votre situation."
          />
          <RadioQuestion
            questions={[
              {
                label: "Oui",
                value: "oui",
                id: "hasPrimes-oui",
              },
              {
                label: "Non",
                value: "non",
                id: "hasPrimes-non",
              },
            ]}
            name="hasPrimes"
            label="Des primes annuelles ou exceptionnelles ont-elles été perçues au cours des 3 derniers mois de travail (préavis inclus) (obligatoire) ?"
            selectedOption={hasPrimes}
            onChangeSelectedOption={onChangeHasReceivedPrimes}
            error={errorHasReceivedPrimes}
            showRequired
          />
          {hasPrimes === "oui" && (
            <Primes
              title="Primes annuelles ou exceptionnelles perçues au cours du préavis"
              primes={primes}
              onChange={onChangePrimes}
              error={errorPrimes}
            />
          )}
        </>
      )}
    </>
  );
}
