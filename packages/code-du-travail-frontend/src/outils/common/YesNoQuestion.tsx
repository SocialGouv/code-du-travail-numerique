import { InputRadio } from "@socialgouv/cdtn-ui";
import React from "react";
import { Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";

import { ErrorField } from "./ErrorField";
import { Question, Tooltip } from "./Question";
import { RadioContainer } from "./stepStyles";
import { requiredBoolean } from "./validators";

type Props = {
  name: string;
  label: string | JSX.Element;
  tooltip?: Tooltip;
  required?: boolean;
  onChange?: (values: unknown) => void;
};

const YesNoQuestion = ({
  name,
  label,
  tooltip,
  required = true,
  onChange,
  ...otherProps
}: Props): JSX.Element => (
  <>
    <Question as="p" required={required} tooltip={tooltip}>
      {label}
    </Question>
    <RadioContainer {...otherProps}>
      <Field
        type="radio"
        parse={(value) => value === "true"}
        name={name}
        label="Oui"
        value={true}
        validate={requiredBoolean}
      >
        {(props) => (
          <InputRadio id={`${name}-yes`} label="Oui" {...props.input} />
        )}
      </Field>
      <Field
        type="radio"
        parse={(value) => value === "true"}
        name={name}
        value={false}
        label="Non"
        validate={requiredBoolean}
      >
        {({ input }) => <InputRadio id={`${name}-no`} label="Non" {...input} />}
      </Field>
    </RadioContainer>
    <ErrorField name={name} />
    {onChange && (
      <OnChange name={name}>{(values) => onChange(values)}</OnChange>
    )}
  </>
);

export { YesNoQuestion };
