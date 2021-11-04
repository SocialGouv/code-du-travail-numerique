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
        name={name}
        value={true}
        validate={requiredBoolean}
        parse={(value) => value === "true"}
        component={({ input }) => (
          <InputRadio
            label="Oui"
            id={`${input.name}-oui`}
            name={input.name}
            value={input.value}
            onChange={input.onChange}
            onBlur={input.onBlur}
            checked={input.checked}
          />
        )}
      />
      <Field
        type="radio"
        name={name}
        value={false}
        validate={requiredBoolean}
        parse={(value) => value === "true"}
        component={({ input }) => (
          <InputRadio
            label="Non"
            id={`${input.name}-non`}
            name={input.name}
            value={input.value}
            onChange={input.onChange}
            onBlur={input.onBlur}
            checked={input.checked}
          />
        )}
      />
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
