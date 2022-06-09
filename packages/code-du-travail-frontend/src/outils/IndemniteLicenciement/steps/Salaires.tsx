import React from "react";
import { icons } from "@socialgouv/cdtn-ui";

import { Primes, SalaireTempsPlein, TempsPartiel } from "../components";
import { useIndemniteLicenciementStore } from "../store";
import { RadioQuestion, TextQuestion } from "../../Components";

const StepSalaires = () => {
  const {
    hasTempsPartiel,
    onChangeHasTempsPartiel,
    errorHasTempsPartiel,
    hasSameSalaire,
    onChangeHasSameSalaire,
    errorHasSameSalaire,
    salaireBrut,
    onChangeSalaireBrut,
    errorSalaireBrut,
    salaryPeriods,
    onSalariesChange,
    hasPrimes,
    onChangeHasPrimes,
    errorHasPrimes,
    primes,
    onChangePrimes,
  } = useIndemniteLicenciementStore((state) => ({
    hasTempsPartiel: state.salairesData.input.hasTempsPartiel,
    onChangeHasTempsPartiel: state.salairesFunction.onChangeHasTempsPartiel,
    errorHasTempsPartiel: state.salairesData.error.errorHasTempsPartiel,
    hasSameSalaire: state.salairesData.input.hasSameSalaire,
    onChangeHasSameSalaire: state.salairesFunction.onChangeHasSameSalaire,
    errorHasSameSalaire: state.salairesData.error.errorHasSameSalaire,
    salaireBrut: state.salairesData.input.salaireBrut,
    onChangeSalaireBrut: state.salairesFunction.onChangeSalaireBrut,
    errorSalaireBrut: state.salairesData.error.errorSalaireBrut,
    salaryPeriods: state.salairesData.input.salaryPeriods,
    onSalariesChange: state.salairesFunction.onSalariesChange,
    hasPrimes: state.salairesData.input.hasPrimes,
    onChangeHasPrimes: state.salairesFunction.onChangeHasPrimes,
    errorHasPrimes: state.salairesData.error.errorHasPrimes,
    primes: state.salairesData.input.primes,
    onChangePrimes: state.salairesFunction.onChangePrimes,
  }));

  return (
    <>
      <RadioQuestion
        questions={[
          {
            label: "Oui",
            value: "oui",
          },
          {
            label: "Non",
            value: "non",
          },
        ]}
        label="Y a-t-il eu des périodes d'alternance à temps plein et à temps partiel durant le contrat de travail&nbsp;?"
        selectedOption={hasTempsPartiel}
        onChangeSelectedOption={onChangeHasTempsPartiel}
        error={errorHasTempsPartiel}
      />
      {hasTempsPartiel === "oui" && <TempsPartiel />}
      {hasTempsPartiel === "non" && (
        <>
          <RadioQuestion
            questions={[
              {
                label: "Oui",
                value: "oui",
              },
              {
                label: "Non",
                value: "non",
              },
            ]}
            label="Le salaire mensuel brut a-t-il été le même durant les 12 derniers mois précédant la notification du licenciement&nbsp;?"
            selectedOption={hasSameSalaire}
            onChangeSelectedOption={onChangeHasSameSalaire}
            error={errorHasSameSalaire}
          />
          {hasSameSalaire === "oui" && (
            <TextQuestion
              label="Quel est le salaire mensuel brut du salarié&nbsp;?"
              value={salaireBrut}
              onChange={onChangeSalaireBrut}
              error={errorSalaireBrut}
              icon={icons.Euro}
              smallText="Prendre en compte les primes et avantages en nature."
              showRequired
              inputType="number"
            />
          )}
          {hasSameSalaire === "non" && (
            <>
              <SalaireTempsPlein
                onSalariesChange={onSalariesChange}
                salaryPeriods={salaryPeriods}
              />
              <RadioQuestion
                questions={[
                  {
                    label: "Oui",
                    value: "oui",
                  },
                  {
                    label: "Non",
                    value: "non",
                  },
                ]}
                label="Des primes annuelles ou exceptionnelles ont-elles été perçues au cours des 3 derniers mois&nbsp;?"
                selectedOption={hasPrimes}
                onChangeSelectedOption={onChangeHasPrimes}
                error={errorHasPrimes}
              />
              {hasPrimes === "oui" && (
                <Primes onChange={onChangePrimes} primes={primes} />
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default StepSalaires;
