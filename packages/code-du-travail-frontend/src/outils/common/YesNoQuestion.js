import React from "react";
import PropTypes from "prop-types";
import { Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import { Label, RadioContainer } from "./stepStyles";
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
        <Label>
          <Field
            parse={value => value === "true"}
            component="input"
            type="radio"
            name={name}
            value={true}
            validate={requiredBoolean}
          />
          <span>Oui</span>
        </Label>
        <Label>
          <Field
            parse={value => value === "true"}
            component="input"
            type="radio"
            name={name}
            value={false}
            validate={requiredBoolean}
          />
          <span>Non</span>
        </Label>
        <ErrorField name={name} />
      </RadioContainer>
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
