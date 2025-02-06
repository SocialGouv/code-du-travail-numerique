import React, { useContext } from "react";
import { RadioQuestion } from "../../../components";
import { IndemniteDepartContext, useIndemniteDepartStore } from "../../store";

export default function Agreement1527() {
  const store = useContext(IndemniteDepartContext);
  const { hasCommission, onChangeHasCommission, errorHasCommission } =
    useIndemniteDepartStore(store, (state) => ({
      hasCommission: state.agreement1527Data.input.hasCommission,
      onChangeHasCommission: state.agreement1527Function.onChangeHasCommission,
      errorHasCommission: state.agreement1527Data.error.errorHasCommission,
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
      />
    </>
  );
}
