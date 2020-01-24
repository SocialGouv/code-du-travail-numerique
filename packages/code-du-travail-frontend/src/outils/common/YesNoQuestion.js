import React from "react";
import PropTypes from "prop-types";
import { Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import { InputRadio } from "@socialgouv/react-ui";
import { RadioContainer } from "./stepStyles";
import { Question } from "./Question";
import { requiredBoolean } from "./validators";
import { ErrorField } from "./ErrorField";

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
          parse={value => value === "true"}
          name={name}
          label="Oui"
          value={true}
          validate={requiredBoolean}
        >
          {props => (
            <InputRadio id={`${name}-yes`} label="Oui" {...props.input} />
          )}
        </Field>
        <Field
          type="radio"
          parse={value => value === "true"}
          name={name}
          value={false}
          validate={requiredBoolean}
        >
          {props => (
            <InputRadio id={`${name}-no`} label="Non" {...props.input} />
          )}
        </Field>
      </RadioContainer>
      <ErrorField name={name} />
      {onChange && (
        <OnChange name={name}>{values => onChange(values)}</OnChange>
      )}
    </>
  );
}
YesNoQuestion.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

export { YesNoQuestion };
