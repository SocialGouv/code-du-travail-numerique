import React from "react";
import { RadioQuestion, TextQuestion } from "../../../Components";
import { useIndemniteLicenciementStore } from "../../store";
import { icons } from "@socialgouv/cdtn-ui";

export default function Agreement1527() {
  const {
    hasContractSalary,
    onChangeHasContractSalary,
    errorHasContractSalary,
    contractSalary,
    onChangeContractSalary,
    errorContractSalary,
  } = useIndemniteLicenciementStore((state) => ({
    hasContractSalary: state.agreement1527Data.input.hasContractSalary,
    onChangeHasContractSalary:
      state.agreement1527Function.onChangeHasContractSalary,
    errorHasContractSalary:
      state.agreement1527Data.error.errorHasContractSalary,
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
        label="Les commissions constituent un élément contractuel de rémunération de votre salaire global brut mensuel ?"
        selectedOption={hasContractSalary}
        onChangeSelectedOption={onChangeHasContractSalary}
        error={errorHasContractSalary}
        showRequired
      />
      {hasContractSalary === "oui" && (
        <TextQuestion
          label="Quel a été le montant du salaire mensuel brut indiqué dans votre contrat ?"
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
