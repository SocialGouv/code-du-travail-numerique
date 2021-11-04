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
        <Field
          type="radio"
          name={name}
          value="oui"
          validate={required}
          component={({ input }) => (
            <InputRadio
              label="Oui"
              id={`${input.name}-oui`}
              name={input.name}
              value={input.value}
              onChange={input.onChange}
              onBlur={input.onBlur}
              checked={input.checked}
            />
          )}
        />
        <Field
          type="radio"
          name={name}
          value="non"
          validate={required}
          component={({ input }) => (
            <InputRadio
              label="Non"
              id={`${input.name}-non`}
              name={input.name}
              value={input.value}
              onChange={input.onChange}
              onBlur={input.onBlur}
              checked={input.checked}
            />
          )}
        />
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
