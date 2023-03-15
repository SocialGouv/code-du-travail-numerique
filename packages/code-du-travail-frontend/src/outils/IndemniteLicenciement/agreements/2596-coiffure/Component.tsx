import React from "react";
import { RadioQuestion } from "../../../Components";
import { SalaireTempsPlein } from "../../steps/Salaires/components";
import { useIndemniteLicenciementStore } from "../../store";

export default function Agreement2596() {
  const {
    noticeSalaryPeriods,
    onSalariesChange,
    errorNoticeSalaryPeriods,
    hasReceivedSalaries,
    onChangeHasReceivedSalaries,
    errorHasReceivedSalaries,
    init,
  } = useIndemniteLicenciementStore((state) => ({
    noticeSalaryPeriods:
      state.agreement2596Data.input.noticeSalaryPeriods ?? [],
    onSalariesChange: state.agreement2596Function.onSalariesChange,
    errorNoticeSalaryPeriods:
      state.agreement2596Data.error.errorNoticeSalaryPeriods,
    hasReceivedSalaries: state.agreement2596Data.input.hasReceivedSalaries,
    onChangeHasReceivedSalaries:
      state.agreement2596Function.onChangeHasReceivedSalaries,
    errorHasReceivedSalaries:
      state.agreement2596Data.error.errorHasReceivedSalaries,
    init: state.agreement2596Function.onInit,
  }));

  React.useEffect(() => {
    init();
  }, []);
  console.log("ICICIC", noticeSalaryPeriods);
  return (
    <>
      {noticeSalaryPeriods.length > 0 && (
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
            note={
              hasReceivedSalaries === "non"
                ? "Le calcul de l’indemnité nécessite les salaires perçus pendant le préavis. Pour réaliser cette simulation, nous considérerons que les salaires perçus pendant le préavis correspondent à la moyenne des salaires perçus au cours des 12 derniers mois précédant la notification du licenciement. En conséquence, le résultat obtenu pourrait ne pas correspondre exactement à votre situation."
                : undefined
            }
          />
          {hasReceivedSalaries === "oui" && (
            <SalaireTempsPlein
              title="Salaires perçus pendant le préavis"
              onSalariesChange={onSalariesChange}
              salaryPeriods={noticeSalaryPeriods}
              error={errorNoticeSalaryPeriods}
            />
          )}
        </>
      )}
    </>
  );
}
