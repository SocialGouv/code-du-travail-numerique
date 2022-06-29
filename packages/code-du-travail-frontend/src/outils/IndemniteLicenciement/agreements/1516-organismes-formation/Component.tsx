import React from "react";
import { RadioQuestion } from "../../../Components";
import { SalaireTempsPlein } from "../../steps/Salaires/components";
import { useIndemniteLicenciementStore } from "../../store";

export default function Agreement1516() {
  const {
    salaryPeriods,
    onSalariesChange,
    errorSalaryPeriods,
    hasReceivedSalaries,
    onChangeHasReceivedSalaries,
    errorHasReceivedSalaries,
    initSalaryPeriods,
  } = useIndemniteLicenciementStore((state) => ({
    salaryPeriods: state.agreement1516Data.input.salaryPeriods,
    onSalariesChange: state.agreement1516Function.onSalariesChange,
    errorSalaryPeriods: state.agreement1516Data.error.errorSalaryPeriods,
    hasReceivedSalaries: state.agreement1516Data.input.hasReceivedSalaries,
    onChangeHasReceivedSalaries:
      state.agreement1516Function.onChangeHasReceivedSalaries,
    errorHasReceivedSalaries:
      state.agreement1516Data.error.errorHasReceivedSalaries,
    initSalaryPeriods: state.agreement1516Function.initSalaryPeriods,
  }));

  React.useEffect(() => {
    initSalaryPeriods();
  }, []);

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
        <SalaireTempsPlein
          title="Salaires perçus pendant le préavis"
          onSalariesChange={onSalariesChange}
          salaryPeriods={salaryPeriods}
          error={errorSalaryPeriods}
          note="Le montant de l’indemnité est basé sur le salaire le plus élevé jusqu’à la sortie de l’entreprise (incluant le préavis). Pour réaliser la simulation nous considérerons que le montant du salaire perçu pendant le préavis est le même que celui  perçu au cours des 12 derniers mois précédant la notification du licenciement. En conséquence, le résultat donné pourrait ne pas correspondre exactement à votre situation."
        />
      )}
    </>
  );
}
