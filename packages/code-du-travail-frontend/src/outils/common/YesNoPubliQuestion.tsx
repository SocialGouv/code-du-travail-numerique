import { InputRadio, Fieldset } from "@socialgouv/cdtn-ui";
import React from "react";
import { Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";

import { ErrorField } from "./ErrorField";
import { Question, Tooltip } from "./Question";
import { RadioContainer } from "./stepStyles";
import { required } from "./validators";

type Props = {
  name: string;
  label: string | JSX.Element;
  tooltip?: Tooltip;
  onChange?: (values?: string) => void;
  autoFocus?: boolean;
};

const YesNoPubliQuestion = ({
  name,
  label,
  tooltip,
  onChange,
  autoFocus = false,
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
      <Fieldset>
        <Question tooltip={tooltip} required>
          {label}
        </Question>
        <RadioContainer>
          <Field type="radio" name={name} value="oui" validate={required}>
            {(props) => (
              <InputRadio
                label="Oui"
                id={`${props.input.name}-oui`}
                data-testid={`${props.input.name}-oui`}
                {...props.input}
                autoFocus={autoFocus}
                tabIndex={1}
              />
            )}
          </Field>
          <Field type="radio" name={name} value="non" validate={required}>
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
          <ErrorField name={name} />
          <OnChange name={name}>
            {(values) => {
              onChange?.(values);
            }}
          </OnChange>
        </RadioContainer>
      </Fieldset>
    </>
  );
};

export { YesNoPubliQuestion };
