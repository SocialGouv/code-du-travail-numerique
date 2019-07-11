import React from "react";
import { Field } from "react-final-form";
import { StepCDD } from "./CDD";
import { StepCTT } from "./CTT";

function validate(values) {
  const validateFn =
    values.contrat === "cdd" ? StepCDD.validate : StepCTT.validate;

  return validateFn(values);
}

function StepInfosSpecifiques() {
  return (
    <Field
      name="contrat"
      render={({ input }) =>
        input.value === "cdd" ? <StepCDD /> : <StepCTT />
      }
    />
  );
}
StepInfosSpecifiques.validate = validate;
export { StepInfosSpecifiques };
