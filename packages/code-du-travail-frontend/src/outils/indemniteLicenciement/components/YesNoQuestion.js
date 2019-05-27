import React from "react";
import PropTypes from "prop-types";
import { Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import { Alert } from "@cdt/ui";
import { Label, RadioContainer, QuestionLabel } from "../stepStyles";
import { requiredBoolean } from "../validators";

function YesNoQuestion({ name, label, onChange }) {
  return (
    <>
      <QuestionLabel>{label}</QuestionLabel>
      <RadioContainer>
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
      </RadioContainer>
      <Field
        name={name}
        subscribe={{ error: true, visited: true }}
        render={({ meta: { visited, error } }) =>
          error && visited ? <Alert>{error}</Alert> : null
        }
      />
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
