import React from "react";
import { Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import { ErrorField } from "../../common/ErrorField";

import { Label, RadioContainer } from "../../common/stepStyles";
import { required } from "../../common/validators";
import { Question } from "../../common/Question";

function TypeRemuneration({ name, onChange }) {
  return (
    <>
      <Question as="p" required>
        Sélectionnez la manière dont vous souhaitez indiquer la
        rémunération&nbsp;?
      </Question>
      <RadioContainer>
        <Label>
          <Field
            component="input"
            type="radio"
            name={name}
            value="total"
            validate={required}
          />
          <span>
            En indiquant le <strong>montant total</strong> des rémunérations.
          </span>
        </Label>
        <Label>
          <Field
            component="input"
            type="radio"
            name={name}
            value="mensuel"
            validate={required}
          />
          <span>
            En indiquant le <strong>salaire mensuel</strong> pour chaque mois.
          </span>
        </Label>
        <ErrorField name={name} />
      </RadioContainer>
      {onChange && (
        <OnChange name={name}>{values => onChange(values)}</OnChange>
      )}
    </>
  );
}

export { TypeRemuneration };
