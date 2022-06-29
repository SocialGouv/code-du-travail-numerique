import { InputRadio, Text } from "@socialgouv/cdtn-ui";
import { FormApi } from "final-form";
import React from "react";
import { Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";

import { ErrorField } from "../../ErrorField";
import { Question } from "../../Question";
import { RadioContainer } from "../../stepStyles";
import { AgreementRoute, FormContent } from "../../type/WizardType";
import { required } from "../../validators";
import { ROUTE_NAME } from "../form-constants";
import ShowAlert from "./ShowAlert";

type Props = {
  form: FormApi<FormContent>;
  canBeSkip: boolean;
  onChange: (AgreementRoute) => void;
};

const RouteSelection = ({
  form,
  onChange,
  canBeSkip = true,
}: Props): JSX.Element => {
  const values = form.getState().values;
  return (
    <>
      <Question
        htmlFor={ROUTE_NAME}
        required
        tooltip={{
          content: (
            <p>
              Vous pouvez trouver le nom de votre convention collective sur
              votre <strong>bulletin de paie</strong>.
            </p>
          ),
        }}
      >
        Quel est le nom de la convention collective applicable ?
      </Question>
      <RadioContainer>
        <Field<AgreementRoute>
          type="radio"
          name={ROUTE_NAME}
          value="agreement"
          validate={required}
        >
          {(props) => (
            <InputRadio
              label={
                <Text>
                  Je sais quelle est ma convention collective (je la saisis)
                </Text>
              }
              id={`agreement`}
              {...props.input}
            />
          )}
        </Field>
        <Field<AgreementRoute>
          type="radio"
          name={ROUTE_NAME}
          value="enterprise"
          validate={required}
        >
          {(props) => (
            <InputRadio
              label={
                <Text>
                  Je ne sais pas quelle est ma convention collective (je la
                  recherche)
                </Text>
              }
              id={`enterprise`}
              {...props.input}
            />
          )}
        </Field>
        {canBeSkip && (
          <Field<AgreementRoute>
            type="radio"
            name={ROUTE_NAME}
            value="not-selected"
            validate={required}
          >
            {(props) => (
              <InputRadio
                label={
                  <Text>
                    Je ne souhaite pas renseigner ma convention collective (je
                    passe l&apos;étape)
                  </Text>
                }
                id={`not-selected`}
                {...props.input}
              />
            )}
          </Field>
        )}
        <ErrorField name={ROUTE_NAME} />
        {values.ccn && <ShowAlert route={values.ccn.route} />}
        <OnChange name={ROUTE_NAME}>
          {(
            values: AgreementRoute | null | undefined,
            _previous: AgreementRoute | null | undefined
          ) => {
            if (values) {
              onChange(values);
            }
          }}
        </OnChange>
      </RadioContainer>
    </>
  );
};

export default RouteSelection;
