import React from "react";
import PropTypes from "prop-types";
import { Label, RadioContainer, QuestionLabel } from "../stepStyles";
import { Field } from "react-final-form";
import { ErrorField } from "./ErrorField";
import { requiredBoolean } from "./validators";

function YesNoQuestion({ name, label }) {
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
      <ErrorField name={name} />
    </>
  );
}
YesNoQuestion.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

export { YesNoQuestion };
