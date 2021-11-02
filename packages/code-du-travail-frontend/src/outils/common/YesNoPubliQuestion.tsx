import { InputRadio } from "@socialgouv/cdtn-ui";
import React from "react";
import { Field } from "react-final-form";

import { ErrorField } from "./ErrorField";
import { Question, Tooltip } from "./Question";
import { RadioContainer } from "./stepStyles";
import { required } from "./validators";

type Props = {
  name: string;
  label: string | JSX.Element;
  tooltip?: Tooltip;
};

const YesNoPubliQuestion = ({ name, label, tooltip }: Props): JSX.Element => {
  return (
    <>
      <Question as="p" tooltip={tooltip} required>
        {label}
      </Question>
      <RadioContainer>
        <Field type="radio" name={name} value="oui" validate={required}>
          {(props) => (
            <InputRadio
              label="Oui"
              id={`${props.input.name}-oui`}
              name={props.input.name}
              value={props.input.value}
              onChange={props.input.onChange}
            />
          )}
        </Field>
        <Field type="radio" name={name} value="non" validate={required}>
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
        <ErrorField name={name} />
      </RadioContainer>
    </>
  );
};

export { YesNoPubliQuestion };
