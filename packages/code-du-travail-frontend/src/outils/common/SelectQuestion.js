import { Select, theme } from "@socialgouv/react-ui";
import PropTypes from "prop-types";
import React from "react";
import { Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import styled from "styled-components";

import { Error } from "./ErrorField";
import { Question } from "./Question";
import { required } from "./validators";

function SelectQuestion({ name, label, subLabel, options, onChange }) {
  const uid = `input-${name}`;
  if (!Array.isArray(options)) {
    options = Object.entries(options);
  }
  return (
    <Field
      name={name}
      validate={required}
      subscription={{ dirty: true, error: true, value: true }}
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
              {options.map((option) => {
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
              <OnChange name={name}>{(values) => onChange(values)}</OnChange>
            )}
          </Wrapper>
        );
      }}
    </Field>
  );
}

SelectQuestion.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  subLabel: PropTypes.string,
};

export { SelectQuestion };

const { breakpoints, fonts, spacings } = theme;

const SubLabel = styled.label`
  display: block;
  margin-bottom: ${theme.spacings.tiny};
  font-size: ${fonts.sizes.default};
  cursor: ${(props) => (props.as ? "default" : "pointer")};
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
  margin-bottom: ${spacings.large};
`;
