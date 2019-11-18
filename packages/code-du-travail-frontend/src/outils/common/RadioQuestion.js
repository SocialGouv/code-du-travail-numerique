import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Field } from "react-final-form";
import { theme } from "@socialgouv/react-ui";
import { OnChange } from "react-final-form-listeners";

import { Label } from "../common/stepStyles";
import { required } from "../common/validators";
import { ErrorField } from "./ErrorField";
import { Question } from "./Question";

function RadioQuestion({ name, label, options, onChange }) {
  return (
    <>
      <Fieldset>
        <Question as="legend">{label}</Question>
        <Radios name={name} options={options} />
        {onChange && (
          <OnChange name={name}>{values => onChange(values)}</OnChange>
        )}
      </Fieldset>
    </>
  );
}

RadioQuestion.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.object.isRequired,
  onChange: PropTypes.func
};

export { RadioQuestion };

function Radios({ name, options }) {
  return (
    <RadioContainer>
      {Object.entries(options).map(([key, label]) => (
        <Label key={`${name}-${key}`}>
          <Field
            component="input"
            type="radio"
            name={name}
            value={key}
            validate={required}
          />
          <span>{label}</span>
        </Label>
      ))}
      <ErrorField name={name} />
    </RadioContainer>
  );
}

const { spacings } = theme;

const Fieldset = styled.fieldset`
  margin-left: 0;
  padding-left: 0;
  border: none;
`;
const RadioContainer = styled.div`
  margin-bottom: ${spacings.small};
`;
