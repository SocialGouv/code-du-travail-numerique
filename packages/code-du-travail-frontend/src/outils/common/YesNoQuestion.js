import { InputRadio } from "@socialgouv/cdtn-ui";
import PropTypes from "prop-types";
import React from "react";
import { Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";

import { ErrorField } from "./ErrorField";
import { Question } from "./Question";
import { RadioContainer } from "./stepStyles";
import { requiredBoolean } from "./validators";

function YesNoQuestion({
  name,
  label,
  required = true,
  onChange,
  ...otherProps
}) {
  return (
    <>
      <Question as="p" required={required}>
        {label}
      </Question>
      <RadioContainer {...otherProps}>
        <Field
          type="radio"
          parse={(value) => value === "true"}
          name={name}
          label="Oui"
          value={true}
          validate={requiredBoolean}
        >
          {(props) => (
            <InputRadio id={`${name}-yes`} label="Oui" {...props.input} />
          )}
        </Field>
        <Field
          type="radio"
          parse={(value) => value === "true"}
          name={name}
          value={false}
          validate={requiredBoolean}
        >
          {(props) => (
            <InputRadio id={`${name}-no`} label="Non" {...props.input} />
          )}
        </Field>
      </RadioContainer>
      <ErrorField name={name} />
      {onChange && (
        <OnChange name={name}>{(values) => onChange(values)}</OnChange>
      )}
    </>
  );
}
YesNoQuestion.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export { YesNoQuestion };
