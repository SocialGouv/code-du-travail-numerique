import { Alert, InputRadio, Text, theme } from "@socialgouv/cdtn-ui";
import React, { useEffect } from "react";
import { Field } from "react-final-form";
import styled from "styled-components";

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
          value="non"
          validate={required}
        >
          {(props) => (
            <InputRadio
              label="Le salarié décide lui-même de partir à la retraite"
              {...props.input}
            />
          )}
        </Field>
        <Field
          type="radio"
          name="contrat salarié - mise à la retraite"
          value="oui"
          validate={required}
        >
          {(props) => (
            <InputRadio
              label="L'employeur décide de mettre le salarié à la retraite"
              {...props.input}
            />
          )}
        </Field>
        {form.getState().values &&
          form.getState().values["contrat salarié - mise à la retraite"] ===
            "oui" && (
            <StyledAlert variant="primary">
              <p>
                <Text variant="primary" fontSize="hsmall" fontWeight="700">
                  A noter
                </Text>
              </p>
              L&apos;employeur qui décide une mise à la retraite doit avoir
              informé le salarié de sa volonté de le mettre à la retraite.
            </StyledAlert>
          )}
        <ErrorField name="contrat salarié - mise à la retraite" />
      </RadioContainer>
    </>
  );
}

const { spacings } = theme;

const StyledAlert = styled(Alert)`
  margin-top: ${spacings.medium};
`;

export { OrigineStep };
