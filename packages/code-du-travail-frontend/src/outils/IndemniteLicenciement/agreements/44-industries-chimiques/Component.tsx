import React, { useEffect } from "react";
import { RadioQuestion } from "../../../Components";
import { SalaireTempsPlein } from "../../steps/Salaires/components";
import { useIndemniteLicenciementStore } from "../../store";

export default function Agreement44() {
  const {
    init,
    showVariablePay,
    hasSameSalary,
    hasVariablePay,
    onChangeHasVariablePay,
    errorHasVariablePay,
    showKnowingLastSalary,
    knowingLastSalary,
    onChangeKnowingLastSalary,
    showLastMonthSalary,
    errorKnowingLastSalary,
    errorLastMonthSalary,
    lastMonthSalary,
    onChangeLastMonthSalary,
  } = useIndemniteLicenciementStore((state) => ({
    init: state.agreement44Function.onInit,
    showVariablePay: state.agreement44Data.input.showVariablePay,
    hasSameSalary: state.salairesData.input.hasSameSalary,
    hasVariablePay: state.agreement44Data.input.hasVariablePay,
    onChangeHasVariablePay: state.agreement44Function.onChangeHasVariablePay,
    errorHasVariablePay: state.agreement44Data.error.errorHasVariablePay,
    showKnowingLastSalary: state.agreement44Data.input.showKnowingLastSalary,
    knowingLastSalary: state.agreement44Data.input.knowingLastSalary,
    onChangeKnowingLastSalary:
      state.agreement44Function.onChangeKnowingLastSalary,
    lastMonthSalary: state.agreement44Data.input.lastMonthSalary,
    showLastMonthSalary: state.agreement44Data.input.showLastMonthSalary,
    errorKnowingLastSalary: state.agreement44Data.error.errorKnowingLastSalary,
    errorLastMonthSalary: state.agreement44Data.error.errorLastMonthSalary,
    onChangeLastMonthSalary: state.agreement44Function.onChangeLastMonthSalary,
  }));

  useEffect(() => {
    init();
  }, [init, hasSameSalary]);

  return (
    <>
      {showVariablePay && (
        <RadioQuestion
          questions={[
            {
              label: "Oui",
              value: "oui",
              id: "hasVariablePay-oui",
            },
            {
              label: "Non",
              value: "non",
              id: "hasVariablePay-non",
            },
          ]}
          name="hasVariablePay"
          label="Les salaires indiqués comportent-ils une partie variable ?"
          selectedOption={hasVariablePay}
          onChangeSelectedOption={onChangeHasVariablePay}
          error={errorHasVariablePay}
          showRequired
        />
      )}
      {showVariablePay && showKnowingLastSalary && (
        <RadioQuestion
          questions={[
            {
              label: "Oui",
              value: "oui",
              id: "knowingLastSalary-oui",
            },
            {
              label: "Non",
              value: "non",
              id: "knowingLastSalary-non",
            },
          ]}
          name="knowingLastSalary"
          label="Connaissez-vous le montant du dernier salaire perçu (préavis-inclus) ?"
          selectedOption={knowingLastSalary}
          onChangeSelectedOption={onChangeKnowingLastSalary}
          error={errorKnowingLastSalary}
          showRequired
          note={
            knowingLastSalary === "non"
              ? "Le calcul de l’indemnité nécessite le dernier salaire perçu (incluant le préavis). Pour réaliser cette simulation nous prendrons en considération la moyenne des salaires perçus au cours des 12 derniers mois précédant la notification du licenciement. En conséquence, le résultat obtenu pourrait ne pas correspondre exactement à votre situation."
              : undefined
          }
        />
      )}
      {showVariablePay && showKnowingLastSalary && showLastMonthSalary && (
        <SalaireTempsPlein
          title="Salaire et primes perçus au cours du dernier mois"
          subTitle="Renseignez le montant du dernier salaire perçu (en incluant les primes et avantages en nature) dans le premier champ et le montant des primes dans le second champ."
          onSalariesChange={(salaryPeriods) => {
            onChangeLastMonthSalary(salaryPeriods[0]);
          }}
          salaryPeriods={lastMonthSalary ? [lastMonthSalary] : []}
          error={errorLastMonthSalary}
        />
      )}
    </>
  );
}
