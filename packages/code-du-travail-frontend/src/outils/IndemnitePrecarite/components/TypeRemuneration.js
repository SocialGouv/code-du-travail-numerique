import React from "react";
import { Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import { ErrorField } from "../../IndemniteLicenciement/components/ErrorField";

import {
  Label,
  RadioContainer,
  QuestionParagraphe
} from "../../common/stepStyles";
import { required } from "../../common/validators";

function TypeRemuneration({ name, onChange }) {
  return (
    <>
      <QuestionParagraphe>
        Sélectionnez la manière dont vous souhaitez indiquer votre
        rémunération&nbsp;?
      </QuestionParagraphe>
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
      </RadioContainer>
      <ErrorField name={name} />
      {onChange && (
        <OnChange name={name}>{values => onChange(values)}</OnChange>
      )}
    </>
  );
}

export { TypeRemuneration };
