import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Field } from "react-final-form";
import { theme } from "@cdt/ui";

import { Label, QuestionParagraphe } from "../common/stepStyles";
import { required } from "../common/validators";
import { ErrorField } from "../IndemniteLicenciement/components/ErrorField";

function RadioQuestion({ name, label, options }) {
  return (
    <>
      <Fieldset>
        <QuestionParagraphe as="legend">{label}</QuestionParagraphe>
        <Radios name={name} options={options} />
        <ErrorField name={name} />
      </Fieldset>
    </>
  );
}

RadioQuestion.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.object.isRequired
};

export { RadioQuestion };

function Radios({ name, options }) {
  return Object.entries(options).map(([key, label]) => (
    <RadioContainer key={`${name}-${key}`}>
      <Label>
        <Field
          component="input"
          type="radio"
          name={name}
          value={key}
          validate={required}
        />
        <span>{label}</span>
      </Label>
    </RadioContainer>
  ));
}

const { spacing } = theme;

const Fieldset = styled.fieldset`
  border: none;
  padding-left: 0;
  margin-left: 0;
`;
const RadioContainer = styled.div`
  margin-bottom: ${spacing.small};
`;
