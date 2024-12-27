import React, { useContext } from "react";
import { RadioQuestion } from "../../../components";
import { IndemniteDepartContext, useIndemniteDepartStore } from "../../store";

export default function Agreement2609() {
  const store = useContext(IndemniteDepartContext);
  const {
    hasSameSalary,
    hasVariablePay,
    onChangeHasVariablePay,
    errorHasVariablePay,
  } = useIndemniteDepartStore(store, (state) => ({
    hasSameSalary: state.salairesData.input.hasSameSalary,
    hasVariablePay: state.agreement2609Data.input.hasVariablePay,
    onChangeHasVariablePay: state.agreement2609Function.onChangeHasVariablePay,
    errorHasVariablePay: state.agreement2609Data.error.errorHasVariablePay,
  }));

  if (hasSameSalary === "non") {
    return (
      <RadioQuestion
        questions={[
          {
            label: "Oui",
            value: "oui",
            id: "hasVariablePay-oui",
          },
          {
            label: "Non",
            value: "non",
            id: "hasVariablePay-non",
          },
        ]}
        name="hasVariablePay"
        label="Les salaires indiqués comportent-ils une partie variable ?"
        selectedOption={hasVariablePay}
        onChangeSelectedOption={onChangeHasVariablePay}
        error={errorHasVariablePay}
        showRequired
      />
    );
  }
  return <></>;
}
