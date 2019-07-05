import React from "react";
import { Field } from "react-final-form";
import { required } from "../validators";

import { Input, QuestionLabel, InlineError } from "../stepStyles";
import { UID } from "react-uid";
import { theme } from "@cdt/ui";
import styled from "styled-components";

function TextQuestion({ name, label, inputType = "text", size }) {
  return (
    <UID>
      {id => (
        <>
          <QuestionLabel htmlFor={id}>{label}</QuestionLabel>
          <QuestionWrapper>
            <Field
              name={name}
              subscribe={{ touched: true, invalid: true }}
              validate={required}
              render={({ input, meta: { touched, invalid } }) => (
                <Input
                  {...input}
                  id={id}
                  type={inputType}
                  invalid={touched && invalid}
                  size={size}
                />
              )}
            />
            <Field
              name={name}
              subscribe={{ error: true, dirty: true, touched: true }}
              render={({ meta: { error, dirty, touched } }) =>
                (error && dirty) || (error && touched) ? (
                  <ErrorWrapper>
                    <InlineError>{error}</InlineError>
                  </ErrorWrapper>
                ) : null
              }
            />
          </QuestionWrapper>
        </>
      )}
    </UID>
  );
}

export { TextQuestion };
const { spacing } = theme;

const QuestionWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${spacing.interComponent};
`;
const ErrorWrapper = styled.div`
  display: inline-block;
  margin-left: ${spacing.interComponent};
`;
