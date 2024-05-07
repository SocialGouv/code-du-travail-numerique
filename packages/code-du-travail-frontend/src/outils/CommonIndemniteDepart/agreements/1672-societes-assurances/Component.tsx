import React, { useContext } from "react";

import { RadioQuestion } from "../../../Components";
import { SalaireTempsPlein } from "../../steps/Salaires/components";
import {
  IndemniteDepartContext,
  useIndemniteDepartStore,
} from "../../store";

export default function Agreement1672() {
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
      state.agreement1672Data.input.noticeSalaryPeriods ?? [],
    onSalariesChange: state.agreement1672Function.onSalariesChange,
    errorNoticeSalaryPeriods:
      state.agreement1672Data.error.errorNoticeSalaryPeriods,
    hasReceivedSalaries: state.agreement1672Data.input.hasReceivedSalaries,
    onChangeHasReceivedSalaries:
      state.agreement1672Function.onChangeHasReceivedSalaries,
    errorHasReceivedSalaries:
      state.agreement1672Data.error.errorHasReceivedSalaries,
    init: state.agreement1672Function.onInit,
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
                  } à la moyenne des salaires perçus au cours des 12 derniers mois précédant la notification du licenciement. En conséquence, le résultat obtenu pourrait ne pas correspondre exactement à votre situation.`
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
              } salaire${S()} (en incluant les primes et avantages en nature)`}
              error={errorNoticeSalaryPeriods}
              noPrime
              dataTestidSalaries="notice-salary"
            />
          )}
        </>
      )}
    </>
  );
}
