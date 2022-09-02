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
    salaryPeriods: state.agreement1516Data.input.salaryPeriods ?? [],
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
    initSalaryPeriods(false);
  }, []);

  return (
    <>
      {salaryPeriods.length > 0 && (
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
          {hasReceivedSalaries && (
            <SalaireTempsPlein
              title="Salaires perçus pendant le préavis"
              onSalariesChange={onSalariesChange}
              salaryPeriods={salaryPeriods}
              error={errorSalaryPeriods}
              note={
                hasReceivedSalaries === "non"
                  ? "Le calcul de l’indemnité nécessite le salaire le plus élevé perçu au cours des 3 derniers mois de travail (incluant le préavis). Pour réaliser cette simulation nous prendrons en considération le salaire le plus élevé perçu au cours des 12 derniers mois précédant la notification du licenciement. En conséquence, le résultat obtenu pourrait ne pas correspondre exactement à votre situation."
                  : undefined
              }
            />
          )}
        </>
      )}
    </>
  );
}
