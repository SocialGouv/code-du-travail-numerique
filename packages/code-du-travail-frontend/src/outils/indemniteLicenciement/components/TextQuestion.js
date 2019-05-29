import React from "react";
import { Field } from "react-final-form";
import { required } from "../validators";

import { Input, QuestionLabel } from "../stepStyles";
import { UID } from "react-uid";
import { theme } from "@cdt/ui";
import styled from "styled-components";

function TextQuestion({ name, label, inputType = "text" }) {
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
                />
              )}
            />
            <Field
              name={name}
              subscribe={{ error: true, dirty: true, touched: true }}
              render={({ meta: { error, dirty, touched } }) =>
                (error && dirty) || (error && touched) ? (
                  <InlineError>{error}</InlineError>
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
const { spacing, colors } = theme;

const QuestionWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${spacing.interComponent};
`;

const InlineError = styled.span`
  margin-left: ${spacing.interComponent};
  color: ${colors.darkerGrey};
  font-weight: 600;
`;
