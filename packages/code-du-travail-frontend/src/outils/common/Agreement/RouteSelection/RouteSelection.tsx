import { AlertWithIcon, InputRadio, Text } from "@socialgouv/cdtn-ui";
import { FormApi } from "final-form";
import React from "react";
import { Field } from "react-final-form";

import { ErrorField } from "../../ErrorField";
import { Question } from "../../Question";
import { RadioContainer } from "../../stepStyles";
import { AgreementRoute, FormContent } from "../../type/WizardType";
import { required } from "../../validators";
import { ROUTE_NAME } from "../form-constants";
import ShowAlert from "./ShowAlert";

type Props = {
  form: FormApi<FormContent>;
};

const RouteSelection = ({ form }: Props): JSX.Element => {
  const values = form.getState().values;
  return (
    <>
      <Question htmlFor={ROUTE_NAME} required>
        Quel est le nom de la convention collective applicable ?
      </Question>
      <AlertWithIcon variant="secondary">
        Vous pouvez trouver le nom de votre convention collective sur votre{" "}
        <strong>bulletin de paie</strong>.
      </AlertWithIcon>
      <RadioContainer>
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
        <ErrorField name={ROUTE_NAME} />
        {values.ccn && <ShowAlert route={values.ccn.route} />}
      </RadioContainer>
    </>
  );
};

export default RouteSelection;
