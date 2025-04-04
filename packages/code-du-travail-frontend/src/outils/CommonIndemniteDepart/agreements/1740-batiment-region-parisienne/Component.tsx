import React, { useContext } from "react";
import { RadioQuestion } from "../../../Components";
import { SalaireTempsPlein } from "../../steps/Salaires/components";
import { IndemniteDepartContext, useIndemniteDepartStore } from "../../store";

export default function Agreement1740() {
  const store = useContext(IndemniteDepartContext);
  const {
    noticeSalaryPeriods,
    onSalariesChange,
    errorNoticeSalaryPeriods,
    hasReceivedSalaries,
    onChangeHasReceivedSalaries,
    errorHasReceivedSalaries,
    init,
  } = useIndemniteDepartStore(store, (state) => ({
    noticeSalaryPeriods:
      state.agreement1740Data.input.noticeSalaryPeriods ?? [],
    onSalariesChange: state.agreement1740Function.onSalariesChange,
    errorNoticeSalaryPeriods:
      state.agreement1740Data.error.errorNoticeSalaryPeriods,
    hasReceivedSalaries: state.agreement1740Data.input.hasReceivedSalaries,
    onChangeHasReceivedSalaries:
      state.agreement1740Function.onChangeHasReceivedSalaries,
    errorHasReceivedSalaries:
      state.agreement1740Data.error.errorHasReceivedSalaries,
    init: state.agreement1740Function.onInit,
  }));

  React.useEffect(() => {
    init();
  }, []);
  const hasMoreThanOneNoticeSalary = noticeSalaryPeriods.length > 1;
  const S = () => (noticeSalaryPeriods.length > 1 ? "s" : "");
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
            label={`Connaissez-vous le montant ${
              hasMoreThanOneNoticeSalary ? "des" : "du"
            } salaire${S()} perçu${S()} pendant le préavis ?`}
            selectedOption={hasReceivedSalaries}
            onChangeSelectedOption={onChangeHasReceivedSalaries}
            error={errorHasReceivedSalaries}
            showRequired
            note={
              hasReceivedSalaries === "non"
                ? `Le calcul de l’indemnité nécessite le${S()} salaire${S()} perçu${S()} pendant le préavis. Pour réaliser cette simulation, nous considérerons que le${S()} salaire${S()} perçu${S()} pendant le préavis correspond${
                    hasMoreThanOneNoticeSalary ? "ent" : ""
                  } aux salaires perçus avant la notification du licenciement. En conséquence, le résultat obtenu pourrait ne pas correspondre exactement à votre situation.`
                : undefined
            }
          />
          {hasReceivedSalaries === "oui" && (
            <SalaireTempsPlein
              title={`Salaire${S()} perçu${S()} pendant le préavis`}
              onSalariesChange={onSalariesChange}
              salaryPeriods={noticeSalaryPeriods}
              subTitle={`Indiquez le montant ${
                hasMoreThanOneNoticeSalary ? "des" : "du"
              } salaire${S()} (en incluant les primes et avantages en nature) dans le premier champ et le montant des primes dans le second champ`}
              error={errorNoticeSalaryPeriods}
              dataTestidSalaries="notice-salary"
            />
          )}
        </>
      )}
    </>
  );
}
