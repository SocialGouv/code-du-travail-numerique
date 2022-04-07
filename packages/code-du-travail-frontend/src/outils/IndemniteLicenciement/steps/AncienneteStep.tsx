import React from "react";
import { TextQuestion } from "../../common/TextQuestion";
import { isPositiveNumber } from "../../common/validators";
import {
  IndemniteLicenciementFormContent,
  WizardStepProps,
} from "../../common/type/WizardType";

function AncienneteStep({
  form,
}: WizardStepProps<IndemniteLicenciementFormContent>) {
  return (
    <>
      <TextQuestion
        name="anciennete"
        label={"Ancienneté"}
        inputType="number"
        validate={isPositiveNumber}
        validateOnChange
        placeholder="0"
      />
    </>
  );
}

export default AncienneteStep;
