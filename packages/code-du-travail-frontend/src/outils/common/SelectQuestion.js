import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Field } from "react-final-form";
import { Select, theme } from "@socialgouv/react-ui";
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
            <StyledSelect {...input} id={uid}>
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
            </StyledSelect>
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

const { breakpoints, fonts, spacings } = theme;

const SubLabel = styled.label`
  display: block;
  margin-bottom: ${theme.spacings.tiny};
  font-size: ${fonts.sizes.default};
  cursor: ${props => (props.as ? "default" : "pointer")};
  @media (max-width: ${breakpoints.mobile}) {
    font-size: ${fonts.sizes.small};
  }
`;

const StyledSelect = styled(Select)`
  width: 40rem;
  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
  }
`;

const Wrapper = styled.div`
  margin: ${spacings.medium} 0;
`;
