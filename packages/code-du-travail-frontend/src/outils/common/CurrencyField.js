import { icons, Input, theme } from "@socialgouv/cdtn-ui";
import React from "react";
import { Field } from "react-final-form";
import { UID } from "react-uid";
import styled from "styled-components";

import { InlineError } from "./ErrorField";
import { Question } from "./Question";
import { isNumber } from "./validators";

function CurrencyField({
  name,
  label,
  required = true,
  children = null,
  ...inputProps
}) {
  return (
    <Field
      name={name}
      validate={isNumber}
      subscription={{ error: true, invalid: true, touched: true, value: true }}
    >
      {({ input, meta: { touched, error, invalid } }) => (
        <UID>
          {(id) => (
            <>
              {label && (
                <Question required={required} htmlFor={`currency-${id}`}>
                  {label}
                </Question>
              )}
              <StyledWrapperInput>
                <Input
                  id={`currency-${id}`}
                  {...inputProps}
                  {...input}
                  type="number"
                  invalid={touched && invalid}
                  text="€"
                />

                {error && touched && invalid ? (
                  <InlineError>{error}</InlineError>
                ) : null}
              </StyledWrapperInput>
              {children}
            </>
          )}
        </UID>
      )}
    </Field>
  );
}

const StyledWrapperInput = styled.div`
  flex: 1 1 auto;
  width: 100%;
  max-width: 40rem;
  @media (max-width: ${theme.breakpoints.mobile}) {
    display: flex;
    flex-direction: column;
  }
`;

export { CurrencyField };
