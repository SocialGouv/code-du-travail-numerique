import React from "react";
import { Field } from "react-final-form";
import { UID } from "react-uid";
import { theme } from "@socialgouv/react-ui";
import styled from "styled-components";

import { InlineError } from "./ErrorField";
import { Question } from "./Question";
import { Input } from "./stepStyles";
import { required } from "./validators";

function TextQuestion({
  name,
  label,
  inputType = "text",
  size,
  validate,
  validateOnChange = false,
  ...props
}) {
  return (
    <UID>
      {id => (
        <>
          <Question required htmlFor={id}>
            {label}
          </Question>
          <QuestionWrapper>
            <Field
              name={name}
              validate={value => {
                return validate ? validate(value) : required(value);
              }}
              subscription={{
                value: true,
                error: true,
                touched: true,
                dirty: true,
                invalid: true,
                submitFailed: true
              }}
              render={({
                input,
                meta: { error, invalid, dirty, touched, submitFailed }
              }) => (
                <>
                  <Input
                    {...input}
                    {...props}
                    id={id}
                    type={inputType}
                    invalid={touched && invalid}
                    size={size}
                  />
                  {invalid &&
                    ((!validateOnChange && submitFailed) ||
                      (validateOnChange && dirty)) && (
                      <ErrorWrapper>
                        <InlineError>{error}</InlineError>
                      </ErrorWrapper>
                    )}
                </>
              )}
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
