import React from "react";
import { Field } from "react-final-form";
import { required } from "../../common/validators";

import { Input, QuestionLabel, InlineError } from "../../common/stepStyles";
import { UID } from "react-uid";
import { theme } from "@cdt/ui";
import styled from "styled-components";

function TextQuestion({
  name,
  label,
  inputType = "text",
  size,
  validate = () => true,
  ...props
}) {
  return (
    <UID>
      {id => (
        <>
          <QuestionLabel htmlFor={id}>{label}</QuestionLabel>
          <QuestionWrapper>
            <Field
              name={name}
              validate={value => {
                return validate(value) || required(value);
              }}
              subscribe={{ error: true, touched: true }}
              render={({ input, meta: { error, invalid, touched, dirty } }) => (
                <>
                  <Input
                    {...input}
                    {...props}
                    id={id}
                    type={inputType}
                    invalid={touched && invalid}
                    size={size}
                  />
                  {error && dirty && (
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
