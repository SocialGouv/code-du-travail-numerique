import { Select, theme } from "@socialgouv/cdtn-ui";
import React, { SyntheticEvent } from "react";
import { Field } from "react-final-form";
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
    <Field
      name={name}
      validate={required}
      subscription={{ dirty: true, error: true, value: true }}
    >
      {({ input, meta: { error, dirty } }) => {
        return (
          <Wrapper>
            <Question required tooltip={tooltip} htmlFor={uid}>
              {label}
            </Question>
            {subLabel && <SubLabel>{subLabel}</SubLabel>}
            <StyledSelect
              {...input}
              id={uid}
              onChange={(val: SyntheticEvent) => {
                if (onChange) {
                  onChange(val);
                }
                input.onChange(val);
              }}
            >
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
