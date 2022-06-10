import { InputRadio } from "@socialgouv/cdtn-ui";
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
};

const YesNoPubliQuestion = ({
  name,
  label,
  tooltip,
  onChange,
}: Props): JSX.Element => {
  return (
    <>
      <Question tooltip={tooltip} required>
        {label}
      </Question>
      <RadioContainer>
        <Field type="radio" name={name} value="oui" validate={required}>
          {(props) => (
            <InputRadio
              label="Oui"
              id={`${props.input.name}-oui`}
              {...props.input}
            />
          )}
        </Field>
        <Field type="radio" name={name} value="non" validate={required}>
          {(props) => (
            <InputRadio
              label="Non"
              id={`${props.input.name}-non`}
              {...props.input}
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
    </>
  );
};

export { YesNoPubliQuestion };
