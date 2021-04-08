import { InputRadio } from "@socialgouv/cdtn-ui";
import React from "react";
import { Field } from "react-final-form";

import { ErrorField } from "../../common/ErrorField";
import { Question } from "../../common/Question";
import { RadioContainer } from "../../common/stepStyles";
import { required } from "../../common/validators";

function OrigineStep() {
  return (
    <>
      <Question as="p" required>
        Qui est à l’origine du départ en retraite&nbsp;?
      </Question>
      <RadioContainer>
        <Field
          type="radio"
          name="contrat salarié - mise à la retraite"
          value="oui"
          validate={required}
        >
          {(props) => (
            <InputRadio
              label="L’employeur décide de lui-même de mettre à la retraite le salarié par une décision adressée à celui-ci."
              {...props.input}
            />
          )}
        </Field>
        <Field
          type="radio"
          name="contrat salarié - mise à la retraite"
          value="non"
          validate={required}
        >
          {(props) => (
            <InputRadio
              label="Le salarié décide de quitter volontairement l’entreprise pour prendre sa retraite."
              {...props.input}
            />
          )}
        </Field>
        <ErrorField name="contrat salarié - mise à la retraite" />
      </RadioContainer>
    </>
  );
}

export { OrigineStep };
