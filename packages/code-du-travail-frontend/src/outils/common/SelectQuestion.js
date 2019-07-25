import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Field } from "react-final-form";
import { theme } from "@cdt/ui";
import { OnChange } from "react-final-form-listeners";

import { Label, InlineError } from "../common/stepStyles";
import { required } from "./validators";

function SelectQuestion({ name, label, options, onChange }) {
  const uid = `input-${name}`;
  return (
    <Field
      name={name}
      validate={required}
      subscribe={{ error: true, dirty: true }}
    >
      {({ input, meta: { error, dirty } }) => {
        return (
          <Wrapper>
            <Label htmlFor={uid}>{label}</Label>
            <Select {...input} id={uid}>
              <option disabled value="">
                ...
              </option>
              {Object.entries(options).map(([key, label]) => (
                <option value={key} key={key}>
                  {label}
                </option>
              ))}
            </Select>
            {error && dirty && <InlineError>{error}</InlineError>}
            {onChange && (
              <OnChange name={name}>{values => onChange(values)}</OnChange>
            )}
          </Wrapper>
        );
      }}
    </Field>
  );
}

SelectQuestion.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.object.isRequired,
  onChange: PropTypes.func
};

export { SelectQuestion };

const { spacing } = theme;

const Select = styled.select`
  margin-top: ${spacing.small};
  margin-right: ${spacing.interComponent};
  flex: 1 1 70%;
  min-width: 400px;
`;

const Wrapper = styled.div`
  margin: ${spacing.interComponent} 0;
`;
