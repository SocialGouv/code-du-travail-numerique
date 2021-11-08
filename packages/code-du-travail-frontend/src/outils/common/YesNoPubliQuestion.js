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
              {...props.input}
            />
          )}
        </Field>
        <Field type="radio" name={name} value="non" validate={required}>
          {(props) => (
            <InputRadio
              label="Non"
              id={`${props.input.name}-non`}
              {...props.input}
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
