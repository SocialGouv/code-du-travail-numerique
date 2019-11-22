import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Field } from "react-final-form";
import { theme } from "@socialgouv/react-ui";
import { OnChange } from "react-final-form-listeners";

import { Question } from "./Question";
import { required } from "./validators";
import { Error } from "./ErrorField";

function SelectQuestion({ name, label, subLabel, options, onChange }) {
  const uid = `input-${name}`;
  if (!Array.isArray(options)) {
    options = Object.entries(options);
  }
  return (
    <Field
      name={name}
      validate={required}
      subscription={{ value: true, error: true, dirty: true }}
    >
      {({ input, meta: { error, dirty } }) => {
        return (
          <Wrapper>
            <Question htmlFor={uid}>{label}</Question>
            {subLabel && <SubLabel>{subLabel}</SubLabel>}
            <Select {...input} id={uid}>
              <option disabled value="">
                ...
              </option>
              {options.map(option => {
                let key, label;
                if (Array.isArray(option)) {
                  [key, label] = option;
                } else {
                  key = label = option;
                }

                return (
                  <option value={key} key={key}>
                    {label}
                  </option>
                );
              })}
            </Select>
            {error && dirty && <Error>{error}</Error>}
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
  subLabel: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  onChange: PropTypes.func
};

export { SelectQuestion };

const { spacings } = theme;

const SubLabel = styled.label`
  display: block;
  margin-bottom: ${theme.spacings.tiny};
  font-size: ${theme.fonts.sizes.default};
  cursor: ${props => (props.as ? "default" : "pointer")};
`;

const Select = styled.select`
  flex: 1 1 70%;
  min-width: 400px;
  max-width: 100%;
  margin-top: ${spacings.small};
  margin-right: ${spacings.medium};
`;

const Wrapper = styled.div`
  margin: ${spacings.medium} 0;
`;
