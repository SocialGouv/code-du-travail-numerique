import { Input, InputDate, theme } from "@socialgouv/cdtn-ui";
import React from "react";

import styled from "styled-components";
import xss from "xss";
import { InlineError } from "../../common/ErrorField";
import { Question, Tooltip } from "../../common/Question";

type Props = {
  onChange: (value: string) => void;
  error?: string;
  label: string;
  tooltip?: Tooltip;
  inputType?: string;
  value: string | undefined;
  placeholder?: string;
};

export default function TextQuestion({
  tooltip,
  inputType,
  label,
  error,
  value,
  placeholder,
  onChange,
}: Props) {
  const InputComponent = inputType === "date" ? InputDate : Input;
  const randomId = Math.random().toString(36);
  return (
    <>
      <Question required tooltip={tooltip} htmlFor={randomId}>
        {label}
      </Question>
      <QuestionWrapper>
        <InputComponent
          id={randomId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          invalid={error}
          placeholder={placeholder}
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

const ErrorWrapper = styled.div`
  display: inline-block;
  margin-left: ${spacings.medium};
`;
