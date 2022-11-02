import React, { useEffect } from "react";
import { RadioQuestion } from "../../../Components";
import { useIndemniteLicenciementStore } from "../../store";

export default function Agreement44() {
  const {
    init,
    showVariablePay,
    hasSameSalary,
    hasVariablePay,
    onChangeHasVariablePay,
    errorHasVariablePay,
  } = useIndemniteLicenciementStore((state) => ({
    init: state.agreement44Function.onInit,
    showVariablePay: state.agreement44Data.input.showVariablePay,
    hasSameSalary: state.salairesData.input.hasSameSalary,
    hasVariablePay: state.agreement44Data.input.hasVariablePay,
    onChangeHasVariablePay: state.agreement44Function.onChangeHasVariablePay,
    errorHasVariablePay: state.agreement44Data.error.errorHasVariablePay,
  }));

  useEffect(() => {
    init();
  }, [init, hasSameSalary]);

  return (
    <>
      {showVariablePay && (
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
      )}
    </>
  );
}
