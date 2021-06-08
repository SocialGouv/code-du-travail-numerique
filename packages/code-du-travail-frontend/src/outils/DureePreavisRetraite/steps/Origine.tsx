import { InputRadio } from "@socialgouv/cdtn-ui";
import React, { useEffect } from "react";
import { Field } from "react-final-form";

import { ErrorField } from "../../common/ErrorField";
import { Question } from "../../common/Question";
import { RadioContainer } from "../../common/stepStyles";
import { WizardStepProps } from "../../common/type/WizardType";
import { required } from "../../common/validators";
import { usePublicodes } from "../../publicodes";
import { mapToPublicodesSituation } from "../../publicodes/Utils";

function OrigineStep({ form }: WizardStepProps): JSX.Element {
  const publicodesContext = usePublicodes();

  useEffect(() => {
    publicodesContext.setSituation(
      mapToPublicodesSituation(form.getState().values)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);

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
