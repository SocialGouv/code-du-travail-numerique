import React from "react";
import { RadioQuestion } from "../../../Components";
import { useIndemniteLicenciementStore } from "../../store";

export default function Agreement16() {
  const { hasVariablePay, onChangeHasVariablePay, errorHasVariablePay } =
    useIndemniteLicenciementStore((state) => ({
      hasVariablePay: state.agreement16Data.input.hasVariablePay,
      onChangeHasVariablePay: state.agreement16Function.onChangeHasVariablePay,
      errorHasVariablePay: state.agreement16Data.error.errorHasVariablePay,
    }));

  return (
    <>
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
        label="Le salarié perçoit-il du variable sur les 12 derniers mois ?"
        selectedOption={hasVariablePay}
        onChangeSelectedOption={onChangeHasVariablePay}
        error={errorHasVariablePay}
        showRequired
      />
    </>
  );
}
