import React from "react";
import { useIndemniteLicenciementStore } from "../../store";
import { RadioQuestion, TextQuestion } from "../../../Components";
import { TempsPartiel, SalaireTempsPlein, TooltipSalary } from "./components";
import { getSupportedAgreement } from "@socialgouv/modeles-social";
import { IndemniteLicenciementStepName } from "../..";
import {
  AgreementsInjector,
  getTooltipSalairesMensuel,
} from "../../agreements";
import { icons } from "@socialgouv/cdtn-ui";
import {
  generateSalaireTempsPleinQuestion,
  generateSameSalaryQuestion,
  generateSmallText,
} from "../../utils/question";

const StepSalaires = () => {
  const {
    hasTempsPartiel,
    onChangeHasTempsPartiel,
    errorHasTempsPartiel,
    salaryPeriods,
    onSalariesChange,
    initFieldSalaries,
    errorSalaryPeriods,
    agreement,
    hasSameSalary,
    onChangeHasSameSalary,
    errorHasSameSalary,
    salary,
    onChangeSalary,
    errorSalary,
    arretTravail,
    showHasTempsPartiel,
    initShowHasTempsPartiel,
  } = useIndemniteLicenciementStore((state) => ({
    hasTempsPartiel: state.salairesData.input.hasTempsPartiel,
    onChangeHasTempsPartiel: state.salairesFunction.onChangeHasTempsPartiel,
    errorHasTempsPartiel: state.salairesData.error.errorHasTempsPartiel,
    salaryPeriods: state.salairesData.input.salaryPeriods,
    onSalariesChange: state.salairesFunction.onSalariesChange,
    errorSalaryPeriods: state.salairesData.error.errorSalaryPeriods,
    initFieldSalaries: state.salairesFunction.initFieldSalaries,
    agreement: state.agreementData.input.agreement,
    hasSameSalary: state.salairesData.input.hasSameSalary,
    onChangeHasSameSalary: state.salairesFunction.onChangeHasSameSalary,
    errorHasSameSalary: state.salairesData.error.errorHasSameSalary,
    salary: state.salairesData.input.salary,
    onChangeSalary: state.salairesFunction.onChangeSalary,
    errorSalary: state.salairesData.error.errorSalary,
    arretTravail: state.contratTravailData.input.arretTravail,
    showHasTempsPartiel: state.salairesData.input.showHasTempsPartiel,
    initShowHasTempsPartiel: state.salairesFunction.initShowHasTempsPartiel,
  }));

  React.useEffect(() => {
    initFieldSalaries();
    initShowHasTempsPartiel();
  }, []);

  return (
    <>
      {showHasTempsPartiel && (
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
      )}

      {hasTempsPartiel === "oui" && <TempsPartiel />}
      {hasTempsPartiel === "non" && (
        <>
          <RadioQuestion
            questions={[
              {
                label: "Oui",
                value: "oui",
                id: "hasSameSalary-oui",
              },
              {
                label: "Non",
                value: "non",
                id: "hasSameSalary-non",
              },
            ]}
            name="hasSameSalary"
            label={generateSameSalaryQuestion(arretTravail, salaryPeriods)}
            selectedOption={hasSameSalary}
            onChangeSelectedOption={onChangeHasSameSalary}
            error={errorHasSameSalary}
            showRequired
          />
          {hasSameSalary === "oui" && (
            <TextQuestion
              label="Quel a été le montant du salaire mensuel brut ?"
              smallText={generateSmallText(agreement)}
              inputType="number"
              value={salary}
              onChange={onChangeSalary}
              error={errorSalary}
              id="salary"
              showRequired
              icon={icons.Euro}
              dataTestId={"same-salary-value"}
            />
          )}
          {hasSameSalary === "non" && (
            <SalaireTempsPlein
              title={generateSalaireTempsPleinQuestion(
                arretTravail,
                salaryPeriods
              )}
              subTitle="Indiquez le montant des salaires (en incluant les primes et avantages en nature) dans le premier champ et le montant des primes dans le second champ (uniquement pour les 3 derniers mois)              "
              tooltip={getTooltipSalairesMensuel(agreement?.num)}
              onSalariesChange={onSalariesChange}
              salaryPeriods={salaryPeriods}
              error={errorSalaryPeriods}
            />
          )}
          {(hasSameSalary === "oui" || hasSameSalary === "non") &&
            agreement && (
              <AgreementsInjector
                idcc={getSupportedAgreement(agreement.num)}
                step={IndemniteLicenciementStepName.Salaires}
              />
            )}
        </>
      )}
    </>
  );
};

export default StepSalaires;
