import { Input, InputDate, theme } from "@socialgouv/cdtn-ui";
import React, { FunctionComponent, useEffect, useState } from "react";

import styled from "styled-components";
import Html from "../../common/Html";
import { Error } from "../common/ErrorField";
import { Question, Tooltip } from "../common/Question";
import { SmallText } from "../common/stepStyles";
import { SubLabel } from "./SelectQuestion";
import { xssWrapper } from "../../lib";

type Props = {
  onChange: (value: string) => void;
  error?: string;
  label: string;
  tooltip?: Tooltip;
  inputType?: "date" | "number" | "text";
  value: string | number | undefined;
  placeholder?: string;
  subLabel?: string;
  smallText?: string;
  title?: string;
  showRequired?: boolean;
  icon?: FunctionComponent;
  id: string;
  dataTestId?: string;
  text?: string;
  autoFocus?: boolean;
};

export default function TextQuestion({
  tooltip,
  inputType,
  label,
  error,
  value,
  placeholder,
  onChange,
  smallText,
  subLabel,
  title,
  showRequired,
  icon,
  id,
  dataTestId,
  text,
  autoFocus = false,
}: Props) {
  const InputComponent = inputType === "date" ? InputDate : Input;
  const [inputRef, setInputRef] = useState<HTMLInputElement>();
  useEffect(() => {
    if (inputRef && error) {
      inputRef?.focus();
    }
  }, [inputRef, error]);
  return (
    <Wrapper>
      <Question required={showRequired} tooltip={tooltip} htmlFor={id}>
        <Html as="span">{label}</Html>
      </Question>
      {smallText && <SmallText>{smallText}</SmallText>}
      {subLabel && <SubLabel>{subLabel}</SubLabel>}
      <QuestionWrapper
        ref={(elem) => {
          if (elem) {
            setInputRef(elem.children[0].children[0]);
          }
        }}
      >
        <InputComponent
          id={id}
          name={id}
          value={value}
          onChange={(e) => onChange(inputType === "date" ? e : e.target.value)}
          invalid={!!error}
          placeholder={placeholder}
          icon={icon}
          text={text}
          type={inputType === "date" ? "text" : inputType}
          updateOnScrollDisabled
          data-testid={dataTestId}
          autoFocus={autoFocus}
          title={title}
        />
      </QuestionWrapper>
      {error && (
        <Error>
          <span
            dangerouslySetInnerHTML={{
              __html: xssWrapper(error),
            }}
          />
        </Error>
      )}
    </Wrapper>
  );
}

const { spacings } = theme;

const Wrapper = styled.div`
  margin-bottom: ${spacings.base};
`;

const QuestionWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const ErrorWrapper = styled.div`
  display: flex;
`;
