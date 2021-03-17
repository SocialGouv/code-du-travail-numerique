import { Input, InputDate, theme } from "@socialgouv/cdtn-ui";
import React from "react";
import { Field } from "react-final-form";
import { useUID } from "react-uid";
import styled from "styled-components";

import { InlineError } from "./ErrorField";
import { Question } from "./Question";
import { required } from "./validators";

function TextQuestion({
  name,
  label,
  inputType = "text",
  validate,
  validateOnChange = false,
  ...props
}) {
  const InputComponent = inputType === "date" ? InputDate : Input;
  const uid = useUID();
  return (
    <>
      <Question required htmlFor={uid}>
        {label}
      </Question>
      <QuestionWrapper>
        <Field
          name={name}
          validate={(value) => {
            return validate ? validate(value) : required(value);
          }}
          subscription={{
            dirty: true,
            error: true,
            invalid: true,
            submitFailed: true,
            touched: true,
            value: true,
          }}
          render={({
            input,
            meta: { error, invalid, dirty, touched, submitFailed },
          }) => (
            <>
              <InputComponent
                {...input}
                {...props}
                id={uid}
                invalid={touched && invalid}
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
  );
}

export { TextQuestion };
const { spacings } = theme;

const QuestionWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${spacings.medium};
`;
const ErrorWrapper = styled.div`
  display: inline-block;
  margin-left: ${spacings.medium};
`;
