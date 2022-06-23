import React, { useEffect } from "react";
import { icons } from "@socialgouv/cdtn-ui";

import { useIndemniteLicenciementStore } from "../../store";
import { RadioQuestion, TextQuestion } from "../../../Components";
import { TempsPartiel, SalaireTempsPlein, Primes } from "./components";

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
    errorSalaryPeriods,
    errorPrimes,
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
    errorSalaryPeriods: state.salairesData.error.errorSalaryPeriods,
    errorPrimes: state.salairesData.error.errorPrimes,
  }));

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
        <>
          <RadioQuestion
            questions={[
              {
                label: "Oui",
                value: "oui",
                id: "hasSameSalaire-oui",
              },
              {
                label: "Non",
                value: "non",
                id: "hasSameSalaire-non",
              },
            ]}
            name="hasSameSalaire"
            label="Le salaire mensuel brut a-t-il été le même durant les 12 derniers mois précédant la notification du licenciement&nbsp;?"
            selectedOption={hasSameSalaire}
            onChangeSelectedOption={onChangeHasSameSalaire}
            error={errorHasSameSalaire}
            showRequired
          />
          {hasSameSalaire === "oui" && (
            <TextQuestion
              label="Quel a été le montant du salaire mensuel brut&nbsp;?"
              value={salaireBrut}
              onChange={onChangeSalaireBrut}
              error={errorSalaireBrut}
              icon={icons.Euro}
              smallText="Prendre en compte les primes et avantages en nature."
              showRequired
              inputType="number"
              id="salaireBrut"
            />
          )}
          {hasSameSalaire === "non" && (
            <>
              <SalaireTempsPlein
                title="Salaire mensuel brut"
                onSalariesChange={onSalariesChange}
                salaryPeriods={salaryPeriods}
                error={errorSalaryPeriods}
              />
              <RadioQuestion
                questions={[
                  {
                    label: "Oui",
                    value: "oui",
                    id: "hasPrimes-oui",
                  },
                  {
                    label: "Non",
                    value: "non",
                    id: "hasPrimes-non",
                  },
                ]}
                name="hasPrimes"
                label="Des primes annuelles ou exceptionnelles ont-elles été perçues au cours des 3 derniers mois&nbsp;?"
                selectedOption={hasPrimes}
                onChangeSelectedOption={onChangeHasPrimes}
                error={errorHasPrimes}
                showRequired
              />
              {hasPrimes === "oui" && (
                <Primes
                  title="Primes annuelles ou exceptionnelles perçues au cours des 3 derniers mois"
                  onChange={onChangePrimes}
                  primes={primes}
                  error={errorPrimes}
                />
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default StepSalaires;
