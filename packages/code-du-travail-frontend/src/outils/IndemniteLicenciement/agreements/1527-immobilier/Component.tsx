import React from "react";
import { RadioQuestion, TextQuestion } from "../../../Components";
import { useIndemniteLicenciementStore } from "../../store";
import { icons } from "@socialgouv/cdtn-ui";

export default function Agreement1527() {
  const {
    hasCommission,
    onChangeHasCommission,
    errorHasCommission,
    contractSalary,
    onChangeContractSalary,
    errorContractSalary,
  } = useIndemniteLicenciementStore((state) => ({
    hasCommission: state.agreement1527Data.input.hasCommission,
    onChangeHasCommission: state.agreement1527Function.onChangeHasCommission,
    errorHasCommission: state.agreement1527Data.error.errorHasCommission,
    contractSalary: state.agreement1527Data.input.contractSalary,
    onChangeContractSalary: state.agreement1527Function.onChangeContractSalary,
    errorContractSalary: state.agreement1527Data.error.errorContractSalary,
  }));

  return (
    <>
      <RadioQuestion
        questions={[
          {
            label: "Oui",
            value: "oui",
            id: "hasContractSalary-oui",
          },
          {
            label: "Non",
            value: "non",
            id: "hasContractSalary-non",
          },
        ]}
        name="hasContractSalary"
        label="Le contrat de travail prévoit-il le versement de commissions ?"
        selectedOption={hasCommission}
        onChangeSelectedOption={onChangeHasCommission}
        error={errorHasCommission}
        showRequired
      />
      {hasCommission === "non" && (
        <TextQuestion
          label="Quel a été le montant du salaire mensuel brut indiqué dans le contrat ?"
          inputType="number"
          value={`${contractSalary}`}
          onChange={onChangeContractSalary}
          error={errorContractSalary}
          id="contractSalary"
          showRequired
          icon={icons.Euro}
        />
      )}
    </>
  );
}
