import React from "react";

import { useIndemniteLicenciementStore } from "../../store";
import { RadioQuestion } from "../../../Components";
import { TempsPartiel, SalaireTempsPlein } from "./components";

const StepSalaires = () => {
  const {
    hasTempsPartiel,
    onChangeHasTempsPartiel,
    errorHasTempsPartiel,
    salaryPeriods,
    onSalariesChange,
    initFieldSalaries,
    primes,
    onChangePrimes,
    errorSalaryPeriods,
  } = useIndemniteLicenciementStore((state) => ({
    hasTempsPartiel: state.salairesData.input.hasTempsPartiel,
    onChangeHasTempsPartiel: state.salairesFunction.onChangeHasTempsPartiel,
    errorHasTempsPartiel: state.salairesData.error.errorHasTempsPartiel,
    salaryPeriods: state.salairesData.input.salaryPeriods,
    onSalariesChange: state.salairesFunction.onSalariesChange,
    primes: state.salairesData.input.primes,
    onChangePrimes: state.salairesFunction.onChangePrimes,
    errorSalaryPeriods: state.salairesData.error.errorSalaryPeriods,
    initFieldSalaries: state.salairesFunction.initFieldSalaries,
  }));

  React.useEffect(() => {
    initFieldSalaries();
  }, []);

  return (
    <>
      <RadioQuestion
        questions={[
          {
            label: "Oui",
            value: "oui",
            id: "hasTempsPartiel-oui",
          },
          {
            label: "Non",
            value: "non",
            id: "hasTempsPartiel-non",
          },
        ]}
        name="hasTempsPartiel"
        label="Y a-t-il eu des périodes d'alternance à temps plein et à temps partiel durant le contrat de travail&nbsp;?"
        selectedOption={hasTempsPartiel}
        onChangeSelectedOption={onChangeHasTempsPartiel}
        error={errorHasTempsPartiel}
        showRequired
      />
      {hasTempsPartiel === "oui" && <TempsPartiel />}
      {hasTempsPartiel === "non" && (
        <SalaireTempsPlein
          onSalariesChange={onSalariesChange}
          salaryPeriods={salaryPeriods}
          primes={primes}
          onChangePrimes={onChangePrimes}
          error={errorSalaryPeriods}
        />
      )}
    </>
  );
};

export default StepSalaires;
