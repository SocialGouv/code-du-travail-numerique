import { Select, theme } from "@socialgouv/cdtn-ui";
import React from "react";
import { Field } from "react-final-form";
import { OnChange, OnFocus } from "react-final-form-listeners";
import styled from "styled-components";

import { Error } from "./ErrorField";
import { Question, Tooltip } from "./Question";
import { required } from "./validators";

type Props = {
  name: string;
  label: string | JSX.Element;
  subLabel?: string;
  tooltip?: Tooltip;
  options: Record<string, string> | [string, string][];
  onChange?: (values: unknown) => void;
};

const SelectQuestion = ({
  name,
  label,
  subLabel,
  tooltip,
  options,
  onChange,
}: Props): JSX.Element => {
  const uid = `input-${name}`;
  let optionsArray: [string, string][];
  if (!Array.isArray(options)) {
    optionsArray = Object.entries(options);
  } else {
    optionsArray = options;
  }

  return (
    <>
      <Field
        name={name}
        validate={required}
        subscription={{ dirty: true, error: true, modified: true, value: true }}
      >
        {({ input, meta: { error, dirty } }) => {
          return (
            <Wrapper>
              <Question required tooltip={tooltip} htmlFor={uid}>
                {label}
              </Question>
              {subLabel && <SubLabel>{subLabel}</SubLabel>}
              <StyledSelect {...input} id={uid}>
                <option disabled value="">
                  ...
                </option>
                {optionsArray.map((option) => {
                  let key, label;
                  if (Array.isArray(option)) {
                    [key, label] = option;
                  } else {
                    key = label = option;
                  }

                  return (
                    <option value={key} key={key}>
                      {label}
                    </option>
                  );
                })}
              </StyledSelect>
              {error && dirty && <Error>{error}</Error>}
            </Wrapper>
          );
        }}
      </Field>
      <OnChange name={name}>
        {(values, _previous) => {
          onChange?.(values);
        }}
      </OnChange>
      <OnFocus name={name}>
        {(values, _previous) => {
          onChange?.(values);
        }}
      </OnFocus>
    </>
  );
};

export { SelectQuestion };

const { breakpoints, fonts, spacings } = theme;

const SubLabel = styled.label`
  display: block;
  margin-bottom: ${theme.spacings.tiny};
  font-size: ${fonts.sizes.default};
  cursor: ${(props) => (props.as ? "default" : "pointer")};
  @media (max-width: ${breakpoints.mobile}) {
    font-size: ${fonts.sizes.small};
  }
`;

const StyledSelect = styled(Select)`
  width: 40rem;
  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
  }
`;

const Wrapper = styled.div`
  margin-bottom: ${spacings.large};
`;
