import React, { useContext } from "react";
import { RadioQuestion } from "../../../Components";
import { SalaireTempsPlein } from "../../steps/Salaires/components";
import {
  IndemniteLicenciementContext,
  useIndemniteLicenciementStore,
} from "../../store";

export default function Agreement1483() {
  const store = useContext(IndemniteLicenciementContext);
  const {
    noticeSalaryPeriods,
    onSalariesChange,
    errorNoticeSalaryPeriods,
    hasReceivedSalaries,
    onChangeHasReceivedSalaries,
    errorHasReceivedSalaries,
    noticePeriodsMoreThan3Months,
    init,
  } = useIndemniteLicenciementStore(store, (state) => ({
    noticeSalaryPeriods:
      state.agreement1483Data.input.noticeSalaryPeriods ?? [],
    onSalariesChange: state.agreement1483Function.onSalariesChange,
    errorNoticeSalaryPeriods:
      state.agreement1483Data.error.errorNoticeSalaryPeriods,
    hasReceivedSalaries: state.agreement1483Data.input.hasReceivedSalaries,
    noticePeriodsMoreThan3Months:
      state.agreement1483Data.input.noticePeriodsMoreThan3Months,
    onChangeHasReceivedSalaries:
      state.agreement1483Function.onChangeHasReceivedSalaries,
    errorHasReceivedSalaries:
      state.agreement1483Data.error.errorHasReceivedSalaries,
    init: state.agreement1483Function.onInit,
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
                ? "Le calcul de l’indemnité nécessite le total des salaires perçus au cours des 3 derniers mois de travail (incluant le préavis). Pour réaliser cette simulation nous prendrons en considération uniquement les salaires précédant la notification du licenciement. En conséquence, le résultat obtenu pourrait ne pas correspondre exactement à votre situation."
                : undefined
            }
          />
          {hasReceivedSalaries === "oui" && (
            <SalaireTempsPlein
              title={`Salaire${S()} perçu${S()} pendant ${
                noticePeriodsMoreThan3Months ? "les 3 derniers mois du" : "le"
              } préavis`}
              subTitle={`Indiquez le montant ${
                hasMoreThanOneNoticeSalary ? "des" : "du"
              } salaire${S()} (en incluant les primes et avantages en nature) dans le premier champ et le montant des primes dans le second champ`}
              onSalariesChange={onSalariesChange}
              salaryPeriods={noticeSalaryPeriods}
              error={errorNoticeSalaryPeriods}
              dataTestidSalaries="notice-salary"
            />
          )}
        </>
      )}
    </>
  );
}
