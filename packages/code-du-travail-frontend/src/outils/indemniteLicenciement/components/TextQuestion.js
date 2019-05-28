import React from "react";
import { Field } from "react-final-form";
import { required } from "../validators";

import { Input, QuestionLabel } from "../stepStyles";
import { ErrorField } from "./ErrorField";
import { UID } from "react-uid";

function TextQuestion({ name, label, inputType = "text" }) {
  return (
    <UID>
      {id => (
        <>
          <QuestionLabel htmlFor={id}>{label}</QuestionLabel>
          <Field
            name={name}
            subscribe={{ touched: true, error: true }}
            validate={required}
            render={({ input }) => (
              <Input {...input} id={id} type={inputType} />
            )}
          />
          <ErrorField name={name} />
        </>
      )}
    </UID>
  );
}

export { TextQuestion };
