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
        value={true}
        validate={requiredBoolean}
      >
        {(props) => (
          <InputRadio
            id={`${props.input.name}-oui`}
            label="Oui"
            name={props.input.name}
            value={props.input.value}
            onChange={props.input.onChange}
          />
        )}
      </Field>
      <Field
        type="radio"
        parse={(value) => value === "true"}
        name={name}
        value={false}
        validate={requiredBoolean}
      >
        {(props) => (
          <InputRadio
            label="Non"
            id={`${props.input.name}-non`}
            name={props.input.name}
            value={props.input.value}
            onChange={props.input.onChange}
          />
        )}
      </Field>
    </RadioContainer>
    <ErrorField name={name} />
    {onChange && (
      <OnChange name={name}>
        {(values) => {
          onChange(values);
        }}
      </OnChange>
    )}
  </>
);

export { YesNoQuestion };
