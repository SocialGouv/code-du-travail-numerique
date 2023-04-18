import React, { useContext } from "react";
import { RadioQuestion } from "../../../Components";
import {
  IndemniteLicenciementContext,
  useIndemniteLicenciementStore,
} from "../../store";

export default function Agreement2614() {
  const store = useContext(IndemniteLicenciementContext);
  const {
    hasSameSalary,
    hasVariablePay,
    onChangeHasVariablePay,
    errorHasVariablePay,
  } = useIndemniteLicenciementStore(store, (state) => ({
    hasSameSalary: state.salairesData.input.hasSameSalary,
    hasVariablePay: state.agreement2614Data.input.hasVariablePay,
    onChangeHasVariablePay: state.agreement2614Function.onChangeHasVariablePay,
    errorHasVariablePay: state.agreement2614Data.error.errorHasVariablePay,
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
