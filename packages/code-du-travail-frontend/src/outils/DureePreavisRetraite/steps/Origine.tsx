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
  }, [form, form.getState()]);

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
              id={`${props.input.name}-depart`}
              name={props.input.name}
              value={props.input.value}
              onChange={props.input.onChange}
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
              id={`${props.input.name}-mise`}
              name={props.input.name}
              value={props.input.value}
              onChange={props.input.onChange}
            />
          )}
        </Field>
        {form.getState().values &&
          form.getState().values["contrat salarié - mise à la retraite"] ===
            "oui" && (
            <StyledAlert variant="primary">
              <TitleAlert variant="primary" fontSize="hsmall" fontWeight="700">
                À noter
              </TitleAlert>
              <br />
              L&apos;employeur qui décide une mise à la retraite doit en avoir
              informé son salarié.
              <br />
              Plus d&apos;info&nbsp;:{" "}
              <a
                href="/fiche-service-public/lemployeur-peut-il-mettre-doffice-un-salarie-a-la-retraite"
                target="_blank"
              >
                L&apos;employeur peut-il mettre d&apos;office un salarié à la
                retraite ?
              </a>
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
  width: 100%;
`;

const TitleAlert = styled(Text)`
  margin-bottom: ${spacings.medium};
`;

export { OrigineStep };
