import React, { useContext } from "react";
import { RadioQuestion } from "../../../components";
import { SalaireTempsPlein } from "../../steps/Salaires/components";
import { IndemniteDepartContext, useIndemniteDepartStore } from "../../store";

export default function Agreement1516() {
  const store = useContext(IndemniteDepartContext);
  const {
    noticeSalaryPeriods,
    onSalariesChange,
    errorNoticeSalaryPeriods,
    hasReceivedSalaries,
    onChangeHasReceivedSalaries,
    errorHasReceivedSalaries,
    noticePeriodsMoreThan3Months,
    init,
  } = useIndemniteDepartStore(store, (state) => ({
    noticeSalaryPeriods:
      state.agreement1516Data.input.noticeSalaryPeriods ?? [],
    onSalariesChange: state.agreement1516Function.onSalariesChange,
    errorNoticeSalaryPeriods:
      state.agreement1516Data.error.errorNoticeSalaryPeriods,
    hasReceivedSalaries: state.agreement1516Data.input.hasReceivedSalaries,
    noticePeriodsMoreThan3Months:
      state.agreement1516Data.input.noticePeriodsMoreThan3Months,
    onChangeHasReceivedSalaries:
      state.agreement1516Function.onChangeHasReceivedSalaries,
    errorHasReceivedSalaries:
      state.agreement1516Data.error.errorHasReceivedSalaries,
    init: state.agreement1516Function.onInit,
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
            note={
              hasReceivedSalaries === "non"
                ? "Le calcul de l’indemnité nécessecite le salaire le plus élevé perçu au cours des 3 derniers mois de travail (incluant le préavis). Pour réaliser cette simulation nous prendrons en considération le salaire le plus élevé perçu au cours des 12 derniers mois précédant la notification du licenciement. En conséquence, le résultat obtenu pourrait ne pas correspondre exactement à votre situation."
                : undefined
            }
          />
          {hasReceivedSalaries === "oui" && (
            <SalaireTempsPlein
              title={`Salaire${S()} perçu${S()} pendant ${
                noticePeriodsMoreThan3Months ? "les 3 derniers mois du" : "le"
              } préavis`}
              // subTitle={`Indiquez le montant ${
              //   hasMoreThanOneNoticeSalary ? "des" : "du"
              // } salaire${S()} (en incluant les primes et avantages en nature) dans le premier champ et le montant des primes dans le second champ`}
              //TODO attention
              onSalariesChange={onSalariesChange}
              salaryPeriods={noticeSalaryPeriods}
              error={errorNoticeSalaryPeriods}
              dataTestidSalaries="notice-salary"
              agreementNumber={1516}
            />
          )}
        </>
      )}
    </>
  );
}
