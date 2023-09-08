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
  autoFocus?: boolean;
};

const YesNoQuestion = ({
  name,
  label,
  tooltip,
  required = true,
  autoFocus = false,
  onChange,
  ...otherProps
}: Props): JSX.Element => {
  const [focused, setFocused] = React.useState(false);
  React.useEffect(() => {
    if (autoFocus && !focused) {
      const element = document.getElementById(`${name}-oui`);
      window.setTimeout(() => element?.focus(), 0);
      setFocused(true);
    }
  }, [autoFocus]);
  return (
    <>
      <Question required={required} tooltip={tooltip}>
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
              data-testid={`${props.input.name}-oui`}
              label="Oui"
              {...props.input}
              tabIndex={1}
              autoFocus={autoFocus}
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
              data-testid={`${props.input.name}-non`}
              {...props.input}
              tabIndex={1}
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
};

export { YesNoQuestion };
