import React, { useContext } from "react";
import { IndemniteDepartContext, useIndemniteDepartStore } from "../../store";
import { SalaireTempsPlein, TempsPartiel } from "./components";
import { getSupportedAgreement } from "@socialgouv/modeles-social";
import { IndemniteDepartStepName } from "../..";
import { AgreementsInjector } from "../../agreements";
import {
  generateSalaireTempsPleinQuestion,
  generateSameSalaryQuestion,
  generateSameSalaryQuestionSubLabel,
  generateSmallText,
} from "../../utils/question";
import { IndemniteDepartType } from "../../types";
import { RadioQuestion, TextQuestion } from "../../../common/components";

type Props = {
  type: IndemniteDepartType;
};

const StepSalaires = ({ type }: Props) => {
  const store = useContext(IndemniteDepartContext);
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
    isAgreementSupported,
  } = useIndemniteDepartStore(store, (state) => ({
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
    isAgreementSupported:
      state.agreementData.input.isAgreementSupportedIndemniteLicenciement,
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
          autoFocus={showHasTempsPartiel}
        />
      )}

      {hasTempsPartiel === "oui" && <TempsPartiel type={type} />}
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
            label={generateSameSalaryQuestion(
              type,
              arretTravail,
              salaryPeriods
            )}
            subLabel={generateSameSalaryQuestionSubLabel(
              type,
              arretTravail,
              salaryPeriods
            )}
            selectedOption={hasSameSalary}
            onChangeSelectedOption={onChangeHasSameSalary}
            error={errorHasSameSalary}
            autoFocus={hasTempsPartiel === "non"}
          />
          {hasSameSalary === "oui" && (
            <TextQuestion
              label="Quel a été le montant du salaire mensuel brut ?"
              subLabel={generateSmallText(agreement)}
              title="Salaire mensuel brut en € (prendre en compte les primes et avantages en nature)"
              inputType="number"
              value={salary}
              onChange={onChangeSalary}
              error={errorSalary}
              id="salary"
              dataTestId={"same-salary-value"}
              autoFocus={hasSameSalary === "oui"}
              unit="€"
            />
          )}
          {hasSameSalary === "non" && (
            <SalaireTempsPlein
              title={generateSalaireTempsPleinQuestion(
                type,
                arretTravail,
                salaryPeriods
              )}
              onSalariesChange={onSalariesChange}
              salaryPeriods={salaryPeriods}
              error={errorSalaryPeriods}
              autoFocus={hasSameSalary === "non"}
              agreementNumber={agreement?.num}
            />
          )}
          {(hasSameSalary === "oui" || hasSameSalary === "non") &&
            agreement &&
            isAgreementSupported && (
              <AgreementsInjector
                idcc={getSupportedAgreement(agreement.num)}
                step={IndemniteDepartStepName.Salaires}
                type={type}
              />
            )}
        </>
      )}
    </>
  );
};

export default StepSalaires;
