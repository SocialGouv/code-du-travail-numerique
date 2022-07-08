import React from "react";
import { useIndemniteLicenciementStore } from "../../store";
import { RadioQuestion } from "../../../Components";
import { TempsPartiel, SalaireTempsPlein } from "./components";
import { SupportedCcIndemniteLicenciement } from "@socialgouv/modeles-social";
import { IndemniteLicenciementStepName } from "../..";
import { AgreementsInjector } from "../../agreements";

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
  } = useIndemniteLicenciementStore((state) => ({
    hasTempsPartiel: state.salairesData.input.hasTempsPartiel,
    onChangeHasTempsPartiel: state.salairesFunction.onChangeHasTempsPartiel,
    errorHasTempsPartiel: state.salairesData.error.errorHasTempsPartiel,
    salaryPeriods: state.salairesData.input.salaryPeriods,
    onSalariesChange: state.salairesFunction.onSalariesChange,
    errorSalaryPeriods: state.salairesData.error.errorSalaryPeriods,
    initFieldSalaries: state.salairesFunction.initFieldSalaries,
    agreement: state.agreementData.input.agreement,
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
        <>
          <SalaireTempsPlein
            title="Indiquez le montant des salaires mensuels brut perçus au cours des
            12 mois précédents la notification du licenciement"
            onSalariesChange={onSalariesChange}
            salaryPeriods={salaryPeriods}
            error={errorSalaryPeriods}
          />
          {agreement && (
            <AgreementsInjector
              idcc={`IDCC${agreement.num}` as SupportedCcIndemniteLicenciement}
              step={IndemniteLicenciementStepName.Salaires}
            />
          )}
        </>
      )}
    </>
  );
};

export default StepSalaires;
