import { Input, InputDate, theme } from "@socialgouv/cdtn-ui";
import React, { FunctionComponent, useEffect, useRef, useState } from "react";

import styled from "styled-components";
import xss from "xss";
import Html from "../../common/Html";
import { InlineError } from "../common/ErrorField";
import { Question, Tooltip } from "../common/Question";
import { SmallText } from "../common/stepStyles";
import { SubLabel } from "./SelectQuestion";

type Props = {
  onChange: (value: string | number) => void;
  error?: string;
  label: string;
  tooltip?: Tooltip;
  inputType?: "date" | "number" | "text";
  value: string | number | undefined;
  placeholder?: string;
  subLabel?: string;
  smallText?: string;
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
          tabIndex={1}
          autoFocus={autoFocus}
        />
      </QuestionWrapper>
      {error && (
        <ErrorWrapper>
          <InlineError>
            <div
              dangerouslySetInnerHTML={{
                __html: xss(error),
              }}
            />
          </InlineError>
        </ErrorWrapper>
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
