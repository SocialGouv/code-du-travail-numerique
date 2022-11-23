import React from "react";
import { RadioQuestion } from "../../../Components";
import { useIndemniteLicenciementStore } from "../../store";

export default function Agreement2609() {
  const { hasVariablePay, onChangeHasVariablePay, errorHasVariablePay } =
    useIndemniteLicenciementStore((state) => ({
      hasVariablePay: state.agreement2609Data.input.hasVariablePay,
      onChangeHasVariablePay:
        state.agreement2609Function.onChangeHasVariablePay,
      errorHasVariablePay: state.agreement2609Data.error.errorHasVariablePay,
    }));

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
