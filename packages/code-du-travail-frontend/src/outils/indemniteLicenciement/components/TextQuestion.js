import React from "react";
import { Field } from "react-final-form";
import { required } from "../validators";

import { Input, QuestionLabel } from "../stepStyles";
import { ErrorField } from "./ErrorField";

function TextQuestion({ name, label, inputType = "text" }) {
  return (
    <>
      <QuestionLabel>{label}</QuestionLabel>

      <Field
        name={name}
        subscribe={{ touched: true, error: true }}
        validate={required}
        render={({ input }) => <Input {...input} type={inputType} />}
      />
      <ErrorField name={name} />
    </>
  );
}

export { TextQuestion };
