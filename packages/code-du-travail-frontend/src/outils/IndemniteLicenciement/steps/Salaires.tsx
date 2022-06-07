import React from "react";
import { icons } from "@socialgouv/cdtn-ui";

import {
  Primes,
  RadioQuestion,
  SalaireTempsPlein,
  TempsPartiel,
  TextQuestion,
} from "../components";
import { useIndemniteLicenciementStore } from "../store";
import { SalairesStoreSlice } from "../store/salairesStore";

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
  } = useIndemniteLicenciementStore((state: SalairesStoreSlice) => ({
    hasTempsPartiel: state.inputSalaires.hasTempsPartiel,
    onChangeHasTempsPartiel: state.onChangeHasTempsPartiel,
    errorHasTempsPartiel: state.errorSalaires.errorHasTempsPartiel,
    hasSameSalaire: state.inputSalaires.hasSameSalaire,
    onChangeHasSameSalaire: state.onChangeHasSameSalaire,
    errorHasSameSalaire: state.errorSalaires.errorHasSameSalaire,
    salaireBrut: state.inputSalaires.salaireBrut,
    onChangeSalaireBrut: state.onChangeSalaireBrut,
    errorSalaireBrut: state.errorSalaires.errorSalaireBrut,
    salaryPeriods: state.inputSalaires.salaryPeriods,
    onSalariesChange: state.onSalariesChange,
    hasPrimes: state.inputSalaires.hasPrimes,
    onChangeHasPrimes: state.onChangeHasPrimes,
    errorHasPrimes: state.errorSalaires.errorHasPrimes,
    primes: state.inputSalaires.primes,
    onChangePrimes: state.onChangePrimes,
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
