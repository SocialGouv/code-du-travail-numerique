import React from "react";
import styled from "styled-components";
import { Field } from "react-final-form";
import { theme } from "@socialgouv/react-ui";
import { UID } from "react-uid";

import { isNumber } from "./validators";
import { InlineError } from "./ErrorField";
import { Question } from "./Question";
import { Input } from "../common/stepStyles";

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
      subscription={{ value: true, error: true, touched: true, invalid: true }}
    >
      {({ input, meta: { touched, error, invalid } }) => (
        <UID>
          {id => (
            <>
              {label && (
                <Question required={required} htmlFor={`currency-${id}`}>
                  {label}
                </Question>
              )}
              <CurrencyWrapper>
                <NumberInput
                  id={`currency-${id}`}
                  {...inputProps}
                  {...input}
                  type="number"
                  invalid={touched && invalid}
                />
                <Currency aria-hidden="true">€</Currency>
              </CurrencyWrapper>
              {children}
              {error && touched && invalid ? (
                <InlineError>{error}</InlineError>
              ) : null}
            </>
          )}
        </UID>
      )}
    </Field>
  );
}

export { CurrencyField };

const { colors, spacings } = theme;
const NumberInput = styled(Input)`
  padding-right: ${spacings.base};
  text-align: right;
`;

const CurrencyWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-right: ${spacings.base};
`;

const Currency = styled.span`
  position: absolute;
  top: 50%;
  right: 0.25rem;
  color: ${colors.altText};
  transform: translateY(-50%);
`;
