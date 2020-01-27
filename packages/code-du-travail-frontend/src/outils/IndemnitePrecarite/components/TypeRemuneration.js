import React from "react";
import { Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import { InputRadio } from "@socialgouv/react-ui";

import { ErrorField } from "../../common/ErrorField";
import { required } from "../../common/validators";
import { Question } from "../../common/Question";

function TypeRemuneration({ name, onChange }) {
  return (
    <>
      <Question as="p" required>
        Comment souhaitez-vous indiquer la rémunération perçue pendant le
        contrat de travail&nbsp;?
      </Question>

      <Field
        type="radio"
        name={name}
        value="total"
        id="total"
        validate={required}
      >
        {props => (
          <InputRadio
            id={`${name}-amount`}
            label={
              <span>
                En indiquant le
                <strong key="montant">&nbsp;montant total&nbsp;</strong>
                des rémunérations.
              </span>
            }
            {...props.input}
          />
        )}
      </Field>
      <Field
        type="radio"
        name={name}
        value="mensuel"
        id="mensuel"
        validate={required}
      >
        {props => (
          <InputRadio
            id={`${name}-pay`}
            label={
              <span>
                En indiquant le
                <strong key="salaire">&nbsp;salaire mensuel&nbsp;</strong> pour
                chaque mois.
              </span>
            }
            {...props.input}
          />
        )}
      </Field>
      <ErrorField name={name} />
      {onChange && (
        <OnChange name={name}>{values => onChange(values)}</OnChange>
      )}
    </>
  );
}

export { TypeRemuneration };
