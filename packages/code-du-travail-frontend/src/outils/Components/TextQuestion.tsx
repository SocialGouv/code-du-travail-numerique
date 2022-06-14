import { Input, InputDate, theme } from "@socialgouv/cdtn-ui";
import React, { FunctionComponent } from "react";

import styled from "styled-components";
import xss from "xss";
import { InlineError } from "../common/ErrorField";
import { Tooltip, Question } from "../common/Question";
import { SmallText } from "../common/stepStyles";

type Props = {
  onChange: (value: string) => void;
  error?: string;
  label: string;
  tooltip?: Tooltip;
  inputType?: "date" | "number" | "text";
  value: string | undefined;
  placeholder?: string;
  smallText?: string;
  showRequired?: boolean;
  icon?: FunctionComponent;
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
  showRequired,
  icon,
}: Props) {
  const InputComponent = inputType === "date" ? InputDate : Input;
  const randomId = Math.random().toString(36);
  return (
    <>
      <Question required={showRequired} tooltip={tooltip} htmlFor={randomId}>
        {label}
      </Question>
      {smallText && <SmallText>{smallText}</SmallText>}
      <QuestionWrapper>
        <InputComponent
          id={randomId}
          value={value}
          onChange={(e) => onChange(inputType === "date" ? e : e.target.value)}
          invalid={error}
          placeholder={placeholder}
          icon={icon}
          type={inputType === "date" ? "text" : inputType}
          updateOnScrollDisabled
        />
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
      </QuestionWrapper>
    </>
  );
}

const { spacings } = theme;

const QuestionWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${spacings.base};
`;

export const ErrorWrapper = styled.div`
  display: inline-block;
  margin-left: ${spacings.medium};
`;
