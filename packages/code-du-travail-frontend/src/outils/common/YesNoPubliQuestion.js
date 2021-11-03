import { InputRadio } from "@socialgouv/cdtn-ui";
import PropTypes from "prop-types";
import React from "react";
import { Field } from "react-final-form";

import { ErrorField } from "./ErrorField";
import { Question } from "./Question";
import { RadioContainer } from "./stepStyles";
import { required } from "./validators";

function YesNoPubliQuestion({ name, label }) {
  return (
    <>
      <Question as="p" required>
        {label}
      </Question>
      <RadioContainer>
        <Field type="radio" name={name} value="oui" validate={required}>
          {(props) => (
            <InputRadio
              label="Oui"
              id={`${props.input.name}-oui`}
              name={props.input.name}
              value={props.input.value}
              onChange={props.input.onChange}
            />
          )}
        </Field>
        <Field type="radio" name={name} value="non" validate={required}>
          {(props) => (
            <InputRadio
              label="Non"
              id={`${props.input.name}-non`}
              name={props.input.name}
              value={props.input.value}
              onChange={props.input.onChange}
            />
          )}
        </Field>
        <ErrorField name={name} />
      </RadioContainer>
    </>
  );
}

YesNoPubliQuestion.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export { YesNoPubliQuestion };
